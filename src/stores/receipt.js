import axios from 'axios'
import Vue from 'vue'
import _ from 'lodash'
import router from "../router";

const state = {
    receipt: {},
    receipts: {},
    activities: {},
    images: {},
    massage: {}
};

const mutations = {
    setReceipts: function (state, payload) {
        _.forEach(payload, function (res) {
            Vue.set(state.receipts, res.id, res)
        });
    },
    setReceipt: function (state, payload) {
        state.receipt = payload;
    },
    deleteReceipt: function (state, payload) {
        Vue.delete(state.receipts, payload.receipt_id);
    },
    setActivities: function (state, payload) {
        state.activities = payload;
    },
    setImages: function (state, payload) {
        state.images = payload;
    },
    setMassage: function (state, payload) {
        state.massage = payload
    }
};

const actions = {
    sendReceipt: async function ({commit}, payload) {
        await axios.post('http://localhost:8000/api/receipt/upload', payload)
            .then(async res => {
                let dialog = res.data.data;
                if (!res.data.data) {
                    let dialog = res.data.error;
                    await commit('setMassage', dialog);
                }
                await commit('setMassage', dialog);
            }).catch(err => console.log(err));
    },
    updateReceipt: function ({commit}, payload) {
        axios.put('http://localhost:8000/api/receipt/' + payload.receipt_id, payload.updates)
            .then(res => {
                let receiptDetails = res.data.data;
                commit('deleteReceipt', {
                    receipt_id: receiptDetails.id
                });
                router.replace('/receipt')
            }).catch(err => console.log(err));
    },
    getLastCost: function ({commit}) {
        axios.get('http://localhost:8000/api/receipt/getAll')
            .then(res => {
                let lastCost = res.data.data;
                commit('setReceipt', lastCost);
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
                let receiptActivityDetails = res.data.data;
                commit('setReceipts', receiptActivityDetails);
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
                console.log(activityDetails)
            }).catch(err => console.log(err));

    },
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
        let receiptsFilter = {};
        Object.keys(state.receipts).forEach(key => {
            if (key !== state.receipts.id) {
                receiptsFilter[key] = state.receipts[key];
            }
        });
        return receiptsFilter;
    },
    receipt: state => {
        let receiptsFilter = [];
        Object.keys(state.receipt).forEach(key => {
            if (key !== state.receipt.id) {
                receiptsFilter[key] = state.receipt[key];
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
