const haversine = require('haversine-distance')

const siamrajCoord = {
  latitude: 13.659439,
  longitude: 100.591848
}

module.exports = async () => {
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  })

  const subquery = knex('tat_data').whereRaw('date(checkin_time_server) = curdate()')

  const rawData = await knex('users')
    .select(
      'users.employee_id',
      'users.firstname',
      'users.lastname',
      'users.dep_id as dept_id',
      'department.dep_name as dept_name',
      'tat_data.checkin_time_server as check_in',
      'tat_data.checkout_time_server as check_out',
      'tat_data.in_lat_device as latitude',
      'tat_data.in_long_device as longitude'
    )
    .leftJoin(subquery.as('tat_data'), 'users.employee_id', 'tat_data.employee_id')
    .leftJoin('department', 'department.dep_id', 'users.dep_id')
    .where('users.company_id', 1)
    .where('users.site_id', 9)
    .where('users.userStatus', 1)

  return rawData.reduce((carry, item) => {
    let dept = carry.find(({ id }) => id === item.dept_id)
    if (!dept) {
      dept = {
        id: item.dept_id,
        name: item.dept_name,
        members: [],
      }

      carry.push(dept)
    }

    const { latitude, longitude } = item

    dept.members.push({
      ...item,
      distance: !latitude || !longitude ? null : haversine(siamrajCoord, { latitude, longitude }) / 1000
    })
    return carry
  }, [])
}
