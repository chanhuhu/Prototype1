import Vue from 'vue';

const state = {
    receipts: {},
    activities: {}
};

const mutations = {
    updateReceipt: function (state, payload) {
        Object.assign(state.receipts[payload.ReceiptId], payload.ReceiptName)
    },
    addReceipt: function (state, payload) {
        Vue.set(state.receipts, payload.ReceiptId, payload.ReceiptName)
    },
    addActivity: function (state, payload) {
        Vue.set(state.activities, payload.ActivityId, payload.ActivityName)
        console.log(state.activities)
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
    },
    updateReceipt: function ({commit}, payload) {
        // put receipt's status_id
    },
    createActivity: function ({commit}, payload) {
        axios.post('http://localhost:8000/api/activity/create', payload)
            .then(res => {
                let activityDetails = res.data.data;
                commit('addActivity', {
                    ActivityId: activityDetails.id,
                    ActivityName: activityDetails.name
                });
            }).catch(err => {
                console.log(err)
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
