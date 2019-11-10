import Vue from 'vue';

const state = {
    receipts: {},
    activities: {},
    images: {}
};

const mutations = {
    setReceipts: function (state, payload) {
        state.receipts = payload;
    },
    setActivities: function (state, payload) {
        state.activities = payload;
    },
    setImages: function (state, payload) {
        state.images = payload;
    },
};

const actions = {
    sendReceipt: async function ({commit}, payload) {
        await axios.post('http://localhost:8000/api/receipt/upload', payload)
            .then(res => {
                console.log(res.data.data)
            }).catch(err => console.log(err));
    },
    getActivities: function ({commit}) {
        axios.get('http://localhost:8000/api/activity/getAll')
            .then(res => {
                let activities = res.data.data;
                commit('setActivities', activities);
            }).catch(err => console.log(err));
    },
    getReceipt: function ({commit}, payload) {
        axios.get('http://localhost:8000/api/receipt/user/' + payload.user_id)
            .then(res => {
                let receiptDetails = res.data.data;
                commit('setReceipt', receiptDetails);
            }).catch(err => console.log(err));
    },
    getReceipts: function ({commit}) {
        axios.get('http://localhost:8000/api/activity/receipt/getAll')
            .then(res => {
                let receiptAndActivityDetails = res.data.data;
                commit('setReceipts', receiptAndActivityDetails);
            }).catch(err => console.log(err));
    },
    getImages: function ({commit}, payload) {
        axios.get('http://localhost:8000/api/image/receipt/' + payload.receipt_id)
            .then(res => {
                let imageDetails = res.data.data;
                commit('setImages', imageDetails);
            }).catch(err => console.log(err));
    },
    getUserActivities: function ({commit}, payload) {
        axios.get('http://localhost:8000/api/activity/user/' + payload.user_id)
            .then(res => {
                let activities = res.data.data;
                commit('setActivities', activities);
            }).catch(err => console.log(err));
    },
    createActivity: async function ({commit}, payload) {
        await axios.post('http://localhost:8000/api/activity/create', payload)
            .then(async (res) => {
                let activityDetails = res.data.data;
            }).catch(err => console.log(err));

    }
};

const getters = {
    activities: state => {
        let activitiesFilter = [];
        Object.keys(state.activities).forEach(key => {
            if (key !== state.activities.id) {
                activitiesFilter[key] = state.activities[key];
            }
        });
        return activitiesFilter;
    },
    receipts: state => {
        let receiptsFilter = [];
        Object.keys(state.receipts).forEach(key => {
            if (key !== state.receipts.id) {
                receiptsFilter[key] = state.receipts[key];
            }
        });
        return receiptsFilter;
    },
    images: state => {
        let imagesFilter = [];
        Object.keys(state.images).forEach(key => {
            if (key !== state.images.id) {
                imagesFilter[key] = state.images[key];
            }
        });
        return imagesFilter;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
