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
            let arr = [];

            for (let p in currentValue) {
                if (p === "createdAt" || p === "updatedAt" ) {
                    arr.push(new Date(currentValue[p]).toLocaleString())
                }
                else if (p !== "_id") {
                    arr.push(currentValue[p]);
                }
            }
            previousValue.push(arr);
            return previousValue;
        }
    }
}
