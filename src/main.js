const moment = require('moment')
const sleep = require('sleep');

const stock = require('./api/stock')
const db = require('./db')
const logger = require('./logger')
const { BuySell } = db.models

const pullAllData = async() => {
  // get stocks by index
  const indexs = [
    {code: 'sh000001', total: 1486},
    {code: 'sz399001', total: 2161}
  ]

  let limit = 30;
  let offset = 0;
  for (const index of indexs) {
    // logger.debug(index);
    for (offset = 0; offset < index.total; offset += 30) {
      const list = await stock.getList(index.code, offset, limit);
      // logger.debug(list);

      if (list.rank_list) {
        for (const item of list.rank_list) {
          sleep.sleep(3);
          const sbList = await stock.getSBPoint(item.code);
          // logger.debug(sbList);

          if (sbList.operating_lines) {
            for(let op of sbList.operating_lines) {
              op.code = item.code
              await BuySell.create(op);
            }
          }
        }
      }
    }
  }
}

const run = async() => {
  await pullAllData();
  process.exit();
}

const test = async() => {
  // get stocks by index
  const list = await stock.getList('sh000001', 0, 30);
  logger.debug(list);

  // get b/s point
  let weekOfday = moment().format('E'); //计算今天是这周第几天
  const last_monday = moment().subtract(weekOfday+7-1, 'days').format('YYYY-MM-DD');
  const last_sunday = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD');

  const code = 'sh603922';
  // get weekly
  const sbList = await stock.getSBPoint(code, last_monday, last_sunday);
  console.log(`sbList:${JSON.stringify(sbList)}`);
}

module.exports = {
  run,
}

run();
