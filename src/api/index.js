const {remote} = require('electron');
const db = remote.getGlobal('db');
import {Decimal} from 'decimal.js';

export const api = {
    async save(id = null, data) {
        const template = ['order_id', 'name',
            'price', 'amount', 'soldAmount', 'soldPrice', 'soldTotal']

        let insert = {}
        await template.forEach(value => {
            insert[value] = data[value] ? data[value] : null
        })

        insert['soldAmount'] = await insert['soldAmount'] <= insert['amount'] ? insert['soldAmount'] : insert['amount']

        insert['total'] = await new Decimal(data['price']).mul(data['amount'])
        insert['soldTotal'] = await new Decimal(data['soldPrice']).mul(insert['soldAmount'])
        insert['profit'] = await insert['soldTotal'].minus(insert['total'])

        const toFixed = ['total', 'soldTotal', 'profit']
        await toFixed.forEach(value => {
            insert[value] = insert[value].toFixed(2)
        })

        insert['soldOut'] = await (insert['soldAmount'] === insert['amount'])

        if (id) {
            await db.update({_id: id}, insert).finally()
            return this.get(id)
        }

        let tmp = {}
        await db.insert(insert).then(r => {
            for(let k in r) {
                tmp[k] = r[k]
            }
        })

        return Promise.resolve(tmp)
    },

    async get_list(params = {}) {
        let query = {}
        const search = ['order_id', 'name']
        search.forEach(value => {
            query[value] = {$regex: new RegExp(params[value])}
        })
        let sort = {}
        sort[params['order_by']] = params['sort'] === 'asc' ? 1 : -1
        if (params['startDate'] && params['endDate']) {
            query['createdAt'] = {
                $gt: new Date(params['startDate']),
                $lt: new Date(new Date(params['endDate']).getTime() + 86400000)
            }
        }
        if ('soldOut' in params && params['soldOut'] < 2) {
            query['soldOut'] = Boolean(params['soldOut'])
        }
        console.log(query, sort)
        return db.find(query).sort(sort)
    },

    async getStatistics(params = {}) {
        const data = await this.get_list(params)
        let stat = {}
        let template = ['total', 'soldTotal', 'profit']
        template.forEach(i => {
            stat[i] = new Decimal(0)
            data.forEach(j => {
                stat[i] = new Decimal(stat[i]).add(j[i]).toFixed(2)
            })
        })
        stat['count'] = Object.keys(data).length
        console.log(stat)
        return stat
    },

    async get(id) {
        let tmp = {}

        await db.findOne({_id: id}).then(r => {
            for(let k in r) {
                tmp[k] = r[k]
            }
        })

        console.log(tmp)
        return Promise.resolve(tmp)
    },

    destroy(id) {
        return db.remove({_id: id}, {})
    }
}
