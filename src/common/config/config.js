import fs from 'fs';
import https from 'https';

const options = {
  key: fs.readFileSync(think.ROOT_PATH + '/2_yangzheng.ink.key'), // TODO [yz] 需要用户配置
  cert: fs.readFileSync(think.ROOT_PATH + '/1_yangzheng.ink_bundle.crt') // TODO [yz] 需要用户配置
};

const app = (callback, port, host, think) => {
  console.log("[yz] https://172.21.0.5:8080") // TODO [yz] 需要用户配置
  let server = https.createServer(options, callback);
  server.listen(8080, '172.21.0.5'); // TODO [yz] 需要用户配置
  return server;
}

// default config
module.exports = {
    //host: '172.21.0.5',
    host_public: '58.87.124.121', // TODO [yz] 需要用户配置
    port: 8080, // TODO [yz] 需要用户配置
    default_module: 'api',
    createServer: app,
    weixin: {
        appid: 'wx0914f9c4ce38f7ff', // 小程序 appid
        secret: '3934fff3fa0ab1fae644b8fc10b456eb', // 小程序密钥
        mch_id: '15988888888', // 商户帐号ID
        partner_key: 'asdasdasdasdasdasdasd', // 微信支付密钥
        notify_url: 'https://www.您的域名.com/api/pay/notify' // 微信支付异步通知
    },
    express: {
        // 已废弃，之后考虑改回来，做成和阿里云的物流查询可以切换，方便大家的使用
        // 免费的，但是顺丰的话，要配合快递鸟的电子面单
        // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/ 
        appid: '12312312', // 对应快递鸟用户后台 用户ID
        appkey: '123123123123123123123123', // 对应快递鸟用户后台 API key
        request_url: 'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx'
    },
   mianexpress:{
        appid: '123123', // 对应快递鸟用户后台 用户ID
        appkey: '123123-4e61236-94cb5297309a', // 对应快递鸟用户后台 API key
        request_url: 'http://testapi.kdniao.com:8081/api/EOrderService',
        print_url: 'http://sandboxapi.kdniao.com:8080/kdniaosandbox/gateway/exterfaceInvoke.json',
        ip_server_url:'http://www.kdniao.com/External/GetIp.aspx'
    },
    qiniu: {
        access_key: 'asdlakjsdlajlajsdlas',      // 在七牛密钥管理中获取
        secret_key: 'alskdjalksjdlasjdlajsd',    // 在七牛密钥管理中获取
        bucket: 'bucketname',                    // 请填自己的bucket的名称
        domain: 'domain/'                         // 请填自己的domain域名
    },
    // 在七牛新建一个https的空间，这个是用来存储分享图片的https图片，对应的是goods表中的https_pic_url
    qiniuHttps: {
        access_key: 'asdlakjsdlajlajsdlasasdla', // 在七牛密钥管理中获取
        secret_key: 'aaaaaaaaaaasdasdasdasd', // 在七牛密钥管理中获取
        bucket: 'bucketname', // 自己设置的
        domain: 'domain/', // 自己设置，例如：'http://img.你的域名.com/',别忘了这个”/“
        // https://developer.qiniu.com/kodo/manual/1671/region-endpoint
        zoneNum: 0  // 这个自己根据地区设置：华东 0；华北 1；华南 2； 北美 3；东南亚 4
    },
    aliexpress:{
        // https://market.aliyun.com/products/56928004/cmapi021863.html?spm=5176.730005.productlist.d_cmapi021863.6ba73524uQjLqE&innerSource=search_%E5%85%A8%E5%9B%BD%E5%BF%AB%E9%80%92%E7%89%A9%E6%B5%81%E6%9F%A5%E8%AF%A2-%E5%BF%AB%E9%80%92%E6%9F%A5%E8%AF%A2%E6%8E%A5%E5%8F%A3#sku=yuncode1586300000
        url:'http://wuliu.market.alicloudapi.com/kdi', //阿里云的物流查询api，收费的
        appcode: 'asldjalsjdlasjdla' ,// 阿里云后台获取,
		sfLastNo:'0580', // 顺丰寄件人后四位，这个根据自己的寄件人手机设置，如果寄件人是不固定的，那么需要在order_express自己写代码了。
    },
	templateId:{
		// deliveryTemplate:
	}
};
