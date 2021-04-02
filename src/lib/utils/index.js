import moment from 'moment'

export default {
    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        Vue.prototype.extend = (target, source) => {
            for (let obj in source) {
                target[obj] = source[obj]
            }
            return target
        }

        Vue.prototype.exportReducer = (previousValue, currentValue) => {
            let arr = []

            for (let p in currentValue) {
                if (p === "createdAt" || p === "updatedAt") {
                    arr.push(moment(currentValue[p]).format("yyyy-MM-DD HH:mm:ss"))
                } else if (p === "soldOut") {
                    const mask = {
                        false: '有库存',
                        true: '全部卖出'
                    }
                    arr.push(mask[currentValue[p]])
                } else if (p === "price" || p === "total"
                    || p === "soldPrice" || p === "soldTotal"
                    || p === "profit") {
                    arr.push(parseFloat(currentValue[p]))
                } else if (p !== "_id") {
                    arr.push(currentValue[p])
                }
            }
            previousValue.push(arr)
            return previousValue
        }
    }
}
