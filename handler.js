'use strict';

const query = require('./query')
const sendMail = require('./sendmail')
const render = require('./render')

const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

module.exports.notify = async (event) => {
  const data = await query()

  for (let i = 0; i < data.length; i++) {
    const dept = data[i]
    const buffer = await render(dept)
    await sendMail('maetad.s@siamraj.com', dept.name, buffer)
  }
};
