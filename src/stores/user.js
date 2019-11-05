import Vue from 'vue'
import router from '../router'

const state = {
    user: {},
    users: {}
};

const getters = {
    users: state => {
        let userFiltered = {};
        if (null === !!state.activities) {
            return
        }
        Object.keys(state.users).forEach(key => {
            if (key !== state.user.id) {
                userFiltered[key] = state.users[key]
            }
        });
        return userFiltered
    }
};

const mutations = {
    setUser: function (state, payload) {
        if (!localStorage.getItem('user')) {
            payload.status_id = 1;
            const parsed = JSON.stringify(payload);
            localStorage.setItem('user', parsed);
        } else if (null === !!localStorage.getItem('user')) {
            localStorage.removeItem('user');
        }
        state.user = payload;
    },
    addUser: function (state, payload) {
        Vue.set(state.users, payload.id, payload)
    },
    updateUser: function (state, payload) {
        Object.assign(state.users[payload.id], payload)
    },
    setUsers: function (state, payload) {
        state.users = payload;
    }
};

const actions = {
    loginUser: function ({commit, dispatch}, payload) {
        axios.post('http://localhost:8000/api/user/login', payload)
            .then(res => {
                const userDetails = res.data.data;
                dispatch('updateUser', {
                    userId: userDetails.id,
                    updates: {
                        status_id: 1
                    }
                });
                commit('setUser', userDetails);
                if (userDetails.role_id === 1) {
                    router.push('/client')
                } else if (userDetails.role_id === 2) {
                    router.push('/admin')
                }

            }).catch(err => {
            console.log(err);
        });
    },
    logoutUser: function ({commit, dispatch, state}) {
        dispatch('updateUser', {
            userId: state.user.id,
            updates: {
                status_id: 2
            }
        });
        commit('setUser', {});
        localStorage.removeItem('user');
        router.replace('/')
    },
    registerUser: function ({commit}, payload) {
        axios.post('http://localhost:8000/api/user/register', payload)
            .then(res => {
                const userDetails = res.data.data;
                commit('addUser', userDetails);
            }).catch(err => {
            console.log(err);
        })
    },
    updateUser: function ({commit}, payload) {
        axios.put('http://localhost:8000/api/user/' + payload.userId, payload.updates)
            .then(res => {
                let userDetails = res.data.data;
                // console.log(userDetails);
                // commit('updateUser', userDetails);
            }).catch(err => {
            console.log(err);
        });
    },
    getAllUser: function ({commit}) {
        axios.get('http://localhost:8000/api/user/getAll')
            .then(res => {
                let payload = res.data.data;
                commit('setUsers', payload);
            }).catch(err => {
            console.log(err);
        });
    },
    getUerId: function ({commit}, payload) {
        axios.get('http://localhost:8000/api/user/' + payload.userId)
            .then(res => {
                let user = res.data.data;
                console.log(user);
            }).catch(err => {
            console.log(err);
        });
    },
    loggedIn: function ({dispatch, commit}) {
        let userDetails = JSON.parse(localStorage.getItem('user'));
        if (userDetails) {
            dispatch('updateUser', {
                userId: userDetails.id,
                updates: {
                    status_id: 1
                }
            });
            commit('setUser', userDetails);
            if (userDetails.role_id === 1) {
                router.push('/client')
            } else if (userDetails.role_id === 2) {
                router.push('/admin')
            }
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
