const stock = require('./api/stock')
const moment = require('moment')

const run = async() => {

  // get stocks by index
  const list = await stock.getList('sh000001', 0, 30);
  console.log(`list:${JSON.stringify(list)}`);

  // get b/s point
  let weekOfday = moment().format('E'); //计算今天是这周第几天
  const last_monday = moment().subtract(weekOfday+7-1, 'days').format('YYYY-MM-DD');
  const last_sunday = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD');

  const sbList = await stock.getSBPoint('sh603922', last_monday, last_sunday);
  console.log(`sbList:${JSON.stringify(sbList)}`);

  process.exit();
}

module.exports = {
  run,
}

run();
