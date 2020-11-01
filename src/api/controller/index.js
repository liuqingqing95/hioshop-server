const Base = require('./base.js');
// const view = require('think-view');
const moment = require('moment');
const Jushuitan = require('jushuitan');
const rp = require('request-promise');
const http = require("http");
const { post } = require('request-promise');
const { Console } = require('console');
const { resolve } = require('path')
const fs = require('fs');
const uuid = require('uuid');

module.exports = class extends Base {
    async indexAction() {
        //auto render template file index_index.html
        // return this.display();
        if (this.isPost) {
            // 根据token值获取用户id
            think.token = this.ctx.header['x-nideshop-token'] || '';
            const tokenSerivce = think.service('token', 'admin');
            think.userId = await tokenSerivce.getUserId();

            // 只允许登录操作
            if (this.ctx.controller !== 'auth') {
                if (think.userId <= 0) {
                    return this.fail(401, '请先登录');
                }
            }

            const file = this.file('file');
            if (!file) {
                return this.fail("空数据")
            }
            const data = fs.readFileSync(file.path)
            if (data) {

            }
            // console.log(data.toString())
            console.log(think.ROOT_PATH)
            if (!fs.existsSync(think.ROOT_PATH + '/storage')) {
                fs.mkdirSync(think.ROOT_PATH + '/storage')
            }
            if (!fs.existsSync(think.ROOT_PATH + '/storage/resource')) {
                fs.mkdirSync(think.ROOT_PATH + '/storage/resource')
            }
            const filename = uuid.v1() + '_' + file.name
            const fileurl = '/resource/' + filename
            fs.writeFileSync(think.ROOT_PATH + '/storage' + fileurl, data)
            const resource = this.model('resource')
            await resource.add({
                // token: filetoken,
                url: fileurl, //临时存储
                status: 0, //临时存储
            })
            console.log("storage resource in " + think.ROOT_PATH + '/resource/' + filename)
            const host = think.config()['host']
            const port = think.config()['port']
            return this.success('http://'+host+':'+port+fileurl)
        }
    }

    async appInfoAction() {
        // async indexAction() {
        let currentTime = parseInt(new Date().getTime() / 1000);
        const banner = await this.model('ad').where({
            enabled: 1,
            is_delete: 0
        }).order('sort_order asc').select();
        const notice = await this.model('notice').where({
            is_delete: 0
        }).select();
        const channel = await this.model('category').where({
            is_channel: 1,
            parent_id: 0,
        }).order({
            sort_order: 'asc'
        }).select();
        const categoryList = await this.model('category').where({
            parent_id: 0,
            is_show: 1
        }).order({
            sort_order: 'asc'
        }).select();
        const newCategoryList = [];
        for (const categoryItem of categoryList) {
            const categoryGoods = await this.model('goods').where({
                category_id: categoryItem.id,
                goods_number: ['>=', 0],
                is_on_sale: 1,
                is_index: 1,
                is_delete: 0
            }).order({
                sort_order: 'asc'
            }).select();
            newCategoryList.push({
                id: categoryItem.id,
                name: categoryItem.name,
                goodsList: categoryGoods,
                banner: categoryItem.img_url,
                height: categoryItem.p_height
            });
        }
        return this.success({
            channel: channel,
            banner: banner,
            notice: notice,
            categoryList: newCategoryList,
        });
    }

    processPost(post) {
        console.log(post)
    }
};