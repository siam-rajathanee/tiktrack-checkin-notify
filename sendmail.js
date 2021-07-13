const nodemailer = require('nodemailer')
const dayjs = require('dayjs')

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    ciphers: 'SSLv3'
  }
})

module.exports = async (to, department, attachment) => (
  new Promise((resolve, reject) => {

    const today = dayjs().format('D MMM YYYY')
    const mailOptions = {
      from: 'maetad.s@siamraj.com',
      to,
      subject: `รายงานการลงเวลาเข้างาน แผนก ${department}`,
      html: `รายงานการลงเวลาเข้างาน แผนก ${department} ประจำวันที่ ${today}`,
      attachments: [
        {
          filename: `report-${today}.xlsx`,
          content: attachment,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      ],
    }

    console.log(`sending email to: ${to}`)
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return reject(err)
      }
      console.log(`sent email to: ${to}`)
      return resolve()
    })
  })
)
