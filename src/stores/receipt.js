import Vue from 'vue';

const state = {
    receipts: {},
    activities: {}
};

const mutations = {
    updateReceipt: function (state, payload) {
        Object.assign(state.receipts[payload.ReceiptId], payload.ReceiptDetails)
    },
    addReceipt: function (state, payload) {
        Vue.set(state.receipts, payload.ReceiptId, payload.ReceiptDetails)
    },
    addActivity: function (state, payload) {
        Vue.set(state.activities, payload.activityId, payload.activityName)
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
    },
    getActivities: function ({commit}) {
        axios.get('http://localhost:8000/api/activity/getAll')
            .then(res => {
                let activities = res.data.data;

            })
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
