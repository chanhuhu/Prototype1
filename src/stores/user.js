import axios from 'axios'
import _ from 'lodash';

const state = {
    user: {}
};
const getters = {};

const mutations = {
    setUser: function ({ state }, payload) {
        Object.assign(state.user, payload)
    }
};

const actions = {
    loginUser: function ({ commit }, payload) {
        axios.post('http://localhost:8000/api/user/login', payload)
            .then(res => {
                commit('setUser', res.data.data);
            }).catch(err => {
                console.log(err);
        })
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
