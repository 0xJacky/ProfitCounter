// 引入 api 接口
import * as types from './mutation-types'

export default {
    // 用户登录
    [types.USER_LOGIN](state, payload) {
        const auth = {
            access_token: payload.access_token,
            refresh_token: payload.refresh_token,
            expires_in: payload.expires_in
        }
        localStorage.setItem('AUTH', JSON.stringify(auth))
        state.auth = auth
    },
    // 用户注销
    [types.LOG_OUT](state) {
        localStorage.removeItem('USER')
        localStorage.removeItem('AUTH')
        state.user = null
        state.auth = null
    },
    // 更新用户
    [types.UPDATE_USER](state, payload) {

        if (!state.user) {
            state.user = payload
        } else {
            for (const index in payload) {
                state.user[index] = payload[index]
            }
        }

        localStorage.setItem('USER', JSON.stringify(state.user))
    },
    // 提示登录
    [types.SHOULD_LOGIN](state, payload) {
        state.shouldLogin = payload.shouldLogin
        state.loginTips = payload.loginTips
    }
}
