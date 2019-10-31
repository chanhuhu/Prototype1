import axios from 'axios';
import _ from 'lodash';
import { log } from 'util';

const state = {
    user: {}
};
const getters = {};

const mutations = {
<<<<<<< HEAD
    setUser: function({ state }, payload) {
        console.log('payload: ', payload);
        // state.user = payload
=======
    setUser: function ({ state }, payload) {
        Object.assign(state.user, payload)
>>>>>>> fbb03fd1ba594dccb204fe55d3f0dbdba53d295a
    }
};

const actions = {
<<<<<<< HEAD
    loginUser: function({ commit }, payload) {
        console.log(payload);
=======
    loginUser: function ({ commit }, payload) {
>>>>>>> fbb03fd1ba594dccb204fe55d3f0dbdba53d295a
        axios.post('http://localhost:8000/api/user/login', payload)
            .then(res => {
                commit('setUser', res.data.data);
            }).catch(err => {
                console.log(err);
            })
    },
    registerUser: function({ commit }, payload) {
        axios.post('http://localhost:8000/api/user/register', payload)
            .then(res => {
                console.log(res.data.data);
            }).catch(err => {
                console.log(err);

            })
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};