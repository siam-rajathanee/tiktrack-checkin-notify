'use strict';

const query = require('./query')
const sendMail = require('./sendmail')
const render = require('./render')

module.exports.notify = async (event) => {
  const data = await query()

  for (let i = 0; i < data.length; i++) {
    const dept = data[i]
    const buffer = await render(dept)
    try {
      await sendMail(dept.name, buffer)
    } catch (e) {
      console.error(e.message)
    }
  }
};
