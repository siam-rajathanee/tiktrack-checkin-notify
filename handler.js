'use strict';

const query = require('./query')
const sendMail = require('./sendmail')
const render = require('./render')

const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports.notify = async (event) => {
  const data = await query()

  data.forEach(async (dept, index) => {
    await wait(1500 * index)
    const buffer = await render(dept)
    sendMail('maetad.s@siamraj.com', dept.name, buffer)
  })
};
