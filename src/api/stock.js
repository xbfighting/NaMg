const axios = require('axios')
const config = require('config')
const logger = require('../logger')
// const request = require('../utils/request')

class Stock {
  constructor() {}

   async getList(code, offset, limit) {
    code = code || 'sh000001'

    // return request.service({
    //   url: `/indexrank?code=${code}&os=android&field=1&offset=${offset}&limit=${limit}&version=2600&order=0&iid=46643182541&device_id=58253248053&ac=wifi&channel=gdt_ang_gp_yyb1&aid=1182&app_name=stock&version_code=2600&version_name=2.6.0&device_platform=android&ssmix=a&device_type=ONEPLUS+A3000&device_brand=OnePlus&language=zh&os_api=26&os_version=8.0.0&openudid=e7858fd448e5ff8c&manifest_version_code=2600&resolution=1080*1920&dpi=420&update_version_code=2600&_rticket=1539867113999&stock_app_version=1`,
    //   method: 'get'
    // })

    return axios.get(`${config.BASE_API}/indexrank?code=${code}&os=android&field=1&offset=${offset}&limit=${limit}&version=2600&order=0&iid=46643182541&device_id=58253248053&ac=wifi&channel=gdt_ang_gp_yyb1&aid=1182&app_name=stock&version_code=2600&version_name=2.6.0&device_platform=android&ssmix=a&device_type=ONEPLUS+A3000&device_brand=OnePlus&language=zh&os_api=26&os_version=8.0.0&openudid=e7858fd448e5ff8c&manifest_version_code=2600&resolution=1080*1920&dpi=420&update_version_code=2600&_rticket=1539867113999&stock_app_version=1`)
      .then(function (response) {
        // console.log(response);
        // TODO: handle response
        if (response && response.status === 200 && response.data && response.data.data) {
          return response.data.data;
        } else {
          logger.trace(response);
          return null
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async getSBPoint(code, start, end) {
    code = code || 'sz000002'
    start = start || '2010-01-01'
    end = end || '2018-10-18'
    return axios.get(`${config.BASE_API}/keykline?code=${code}&os=android&start=${start}&end=${end}&version=2600&iid=46643182541&device_id=58253248053&ac=wifi&channel=gdt_ang_gp_yyb1&aid=1182&app_name=stock&version_code=2600&version_name=2.6.0&device_platform=android&ssmix=a&device_type=ONEPLUS+A3000&device_brand=OnePlus&language=zh&os_api=26&os_version=8.0.0&openudid=e7858fd448e5ff8c&manifest_version_code=2600&resolution=1080*1920&dpi=420&update_version_code=2600&_rticket=1539865537833&stock_app_version=1`)
      .then(function (response) {
        // console.log(response);
        // TODO: handle response
        if (response && response.status === 200 && response.data && response.data.data) {
          return response.data.data;
        } else {
          logger.trace(response);
          return null
        }
      })
      .catch(function (error) {
        logger.error(error);
      });
  }
}

const stock = new Stock()

module.exports = stock
