import * as types from './mutation-types'

export const login = ({commit}, data) => {
  commit(types.USER_LOGIN, data)
};

export const logout = ({commit}) => {
  commit(types.LOG_OUT)
};

export const update_user = ({commit}, data) => {
  commit(types.UPDATE_USER, data)
};

export const shouldLogin =  ({commit}, data) => {
  commit(types.SHOULD_LOGIN, data)
};
