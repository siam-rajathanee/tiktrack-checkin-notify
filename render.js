const exceljs = require('exceljs')

const sheets = [
  {
    name: 'ระยะ 3 กิโลเมตร',
    filter: ({ distance }) => distance && distance <= 3
  },
  {
    name: 'ระยะมากกว่า 3 กิโลเมตร',
    filter: ({ distance }) => distance && distance > 3
  },
  {
    name: 'ไม่สามารถระบุตำแหน่ง',
    filter: ({ distance }) => !distance
  }
]

module.exports = (data) => {
  const workbook = new exceljs.Workbook()

  workbook.creator = 'Siam Rajathanee'
  workbook.lastModifiedBy = 'Siam Rajathanee'
  workbook.created = new Date()
  workbook.modified = new Date()

  sheets.forEach(({ name, filter }) => {
    const sheet = workbook.addWorksheet(name)

    sheet.columns = [
      { header: 'รหัสพนักงาน', key: 'employee_id' },
      { header: 'ชื่อ', key: 'firstname' },
      { header: 'นามสกุล', key: 'lastname' },
      { header: 'เวลาเข้างาน', key: 'check_in' },
      { header: 'ระยะทาง (ก.ม.)', key: 'distance' },
    ]

    data.members.filter(filter).forEach((member) => sheet.addRow(member))
  })

  return workbook.xlsx.writeBuffer()
}
