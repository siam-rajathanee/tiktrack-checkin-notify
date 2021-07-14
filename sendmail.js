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

const managers = [
  {
    dept: 'AC',
    emails: [
      'orachon.b@siamraj.com',
      'waraporn.y@siamraj.com',
      'kamonrod.p@siamraj.com',
      'yuvadee.a@siamraj.com'
    ]
  },
  {
    dept: 'BL',
    emails: [
      'Waraporn.d@siamraj.com',
      'Prakaikaew.k@siamraj.com'
    ]
  },
  {
    dept: 'DSI (CI)',
    emails: [
      'Potcharin.s@siamraj.com',
    ]
  },
  {
    dept: 'CR',
    emails: [
      'Sasitron.c@siamraj.com',
      'sudarat.s@siamraj.com',
    ]
  },
  {
    dept: 'DS',
    emails: [
      'Supachai.s@siamraj.com',
      'Phornyapat.n@siamraj.com',
      'Phitinan.s@siamraj.com',
      'Sirapat.y@siamraj.com',
    ]
  },
  {
    dept: 'HR',
    emails: [
      'Tichaya.p@siamraj.com',
    ]
  },
  {
    dept: 'IT',
    emails: [
      'praewpan.h@siamraj.com',
      'prakit.o@siamraj.com',
      'Rutcharin.b@siamraj.com',
      'maetad.s@siamraj.com',
    ]
  },
  {
    dept: 'LBM',
    emails: [
      'Kanthima.j@siamraj.com',
      'krongjitra.b@siamraj.com',
      'Vassana.n@siamraj.com'
    ]
  },
  {
    dept: 'LM',
    emails: [
      'seksan.a@siamraj.com',
    ]
  },
  {
    dept: 'OPL',
    emails: [
      'komsan.s@siamraj.com',
      'supajai.s@siamraj.com',
      'kornkanok.n@siamraj.com',
    ]
  },
  {
    dept: 'PE',
    emails: [
      'Puttachat.a@siamraj.com',
      'Wichen.p@siamraj.com',
    ]
  },
  {
    dept: 'PR',
    emails: [
      'Pornpen.c@siamraj.com',
      'Kannapa.s@siamraj.com',
      'Saiyud.j@siamraj.com',
    ]
  },
  {
    dept: 'RM',
    emails: [
      'tuanta.s@siamraj.com',
      'songsak.b@siamraj.com',
      'attaphon.t@siamraj.com',
    ]
  },
  {
    dept: 'SQ',
    emails: [
      'tuanta.s@siamraj.com',
      'phunsa.k@siamraj.com',
      'Sirirat.j@siamraj.com',
    ]
  }
]

module.exports = async (department, attachment) => (
  new Promise((resolve, reject) => {

    const to = managers.find(({ dept }) => dept === department)?.emails || []

    if (to.length === 0) {
      return reject(new Error(`${department} has no email`))
    }

    const today = dayjs().format('D MMM YYYY')
    const mailOptions = {
      from: 'maetad.s@siamraj.com',
      to,
      subject: `รายงานการลงเวลาเข้างาน แผนก ${department}`,
      html: `
        <p>รายงานการลงเวลาเข้างาน แผนก ${department} ประจำวันที่ ${today}</p>
        <p>หากต้องการเปลี่ยนผู้รับ Email กรุณา Reply แจ้งกลับที่ Email นี้</p>
        <p>
          เมธัส​ ศุกรสุต (ป่าน)<br />
          Maetad Sukarasud<br />
          <i>Program manager</i><br />
          <b>Siamrajathanee Public Company Limited</b><br />
          <br />
          <a href="tel:+66840840846">+66840840846</a><br />
          <a href="tel:+6623639300">+6623639300-15</a>  Ext. 8705<br />
          maetad.s@siamraj.com
        </p>
      `,
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
