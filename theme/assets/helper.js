const md = require('markdown-it')()
const iso = require('iso-3166-1')
const moment = require('moment')

const mdToHtml = (string) => string ? md.render(string) : ''

const calcDate = (date) => {
  return date ? beautifyDate(date) : null
}

const calcDateRange = (start, end) => {
  const array = []

  const startDate = calcDate(start)
  const endDate = calcDate(end)

  if (startDate && endDate) {
    array.push(startDate, endDate)
  } else if (startDate) {
    array.push(startDate, 'Present')
  } else if (endDate) {
    array.push(endDate)
  } else {
    return null
  }

  return array.join(' – ')
}

const beautifyDate = (date) => moment(date).format('MMM YYYY')

const beautifyArray = (separator, array) => array.filter(x => x).join(separator)

const arrayToPhrase = (array) => {
  let str = ''
  const a = array.filter(x => x)

  if (a.length === 1) {
    str = a[0]
  } else if (a.length === 2) {
    str = a.join(' and ')
  } else if (a.length > 2) {
    str = a.slice(0, -1).join(', ') + ' and ' + a.slice(-1)
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

const beautifyLink = (string) => {
  let s = string.trim().replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
  s = s.endsWith('/') ? s.slice(0, -1) : s
  s = s.split('/')
  s[0] = `<strong>${s[0]}</strong>`
  return s.join('/')
}

const validArray = (array) => array !== undefined && array.length > 0

module.exports = {
  mdToHtml,
  calcDate,
  calcDateRange,
  beautifyDate,
  beautifyArray,
  arrayToPhrase,
  beautifyLink,
  validArray
}
