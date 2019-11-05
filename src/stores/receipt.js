import Vue from 'vue';

const state = {
    receipts: {},
    activities: {}
};

const mutations = {
    updateReceipt: function (state, payload) {
        Object.assign(state.receipts[payload.ReceiptId], payload.ReceiptName);
    },
    addReceipt: function (state, payload) {
        Vue.set(state.receipts, payload.ReceiptId, payload.ReceiptName);
    },
    setActivities: function (state, payload) {
        state.activities = payload;
    },
    addActivity: function (state, payload) {
        Vue.set(state.activities, payload.id, payload);
    }
};

const actions = {
    sendReceipt: async function ({commit}, payload) {
        // for (let pair of payload.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }
        await axios.post('http://localhost:8000/api/receipt/upload', payload)
            .then(res => {
                console.log(res.data.data)
            }).catch(err => console.log(err));
    },
    getUserActivities: function ({commit}, payload) {
        axios.get('http://localhost:8000/api/activity/user/' + payload.userId)
            .then(res => {
                let activities = res.data.data;
                console.log(activities);
                // commit('setActivities', activities);
            }).catch(err => console.log(err));
    },
    updateReceipt: function ({commit}, payload) {
        // put receipt's status_id
    },
    createActivity: function ({commit}, payload) {
        axios.post('http://localhost:8000/api/activity/create', payload)
            .then(res => {
                let activityDetails = res.data.data;
                commit('addActivity', {
                    id: activityDetails.id,
                    name: activityDetails.name
                });
            }).catch(err => console.log(err));
    }
};

const getters = {
    activities: state => {
        let activities_name = [];
        Object.keys(state.activities).forEach(key => {
            activities_name[key] = state.activities[key]
            console.log(activities_name[key])
        });
        return activities_name
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
