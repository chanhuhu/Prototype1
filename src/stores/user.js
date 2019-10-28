import axios from 'axios'
import _ from 'lodash';

const state = {
    user: {}
};
const getters = {};

const mutations = {
    setUser: function ({ state }, payload) {
        console.log('payload: ',payload);
        state.user = payload
    }
};

const actions = {
    loginUser: function ({ commit }, payload) {
        console.log(payload);
        axios.post('http://localhost:8000/api/user/login', payload)
            .then(res => {
                console.log(res.data);
                commit('setUser', res.data);
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
