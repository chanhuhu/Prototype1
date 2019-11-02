import axios from 'axios';
import _ from 'lodash';

const state = {
    receipt: []
};

const mutations = {
    addReceipt: function (state, payload) {

    }
};

const actions = {
    uploadReceipt: function ({commit}, payload) {
        axios.post('http://localhost:8000/api/upload', payload)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });
    }
};

const getters = {};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
