export default {
    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        Vue.prototype.extend = (target, source) => {
            for (let obj in source) {
                target[obj] = source[obj]
            }
            return target
        }
    }
}
