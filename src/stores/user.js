import axios from 'axios'
import router from '../router';


const state = {
    user: {},
    users: {},
    roles: {}
};

const getters = {
    roles: state => {
        let rolesFilter = [];
        Object.keys(state.roles).forEach(key => {
            if (key !== state.roles.id) {
                rolesFilter[key] = state.roles[key];
            }
        });
        return rolesFilter;
    },
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
        Vue.set(state.users, payload.id, payload);
    },
    updateUser: function (state, payload) {
        Object.assign(state.users[payload.id], payload);
    },
    setUsers: function (state, payload) {
        state.users = payload;
    },
    setRoles: function (state, payload) {
        state.roles = payload;
    }
};

const actions = {
    loginUser: function ({commit, dispatch}, payload) {
        axios.post('http://localhost:8000/api/user/login', payload)
            .then(async res => {
                const userDetails = res.data.data;
                await dispatch('updateUser', {
                    user_id: userDetails.id,
                    updates: {
                        status_id: 1
                    }
                });
                await commit('setUser', userDetails);
                if (userDetails.role_id === 1) {
                    await router.push('/client')
                } else if (userDetails.role_id === 2) {
                    await router.push('/receipt')
                }

            }).catch(err => {
            console.log(err);
        });
    },
    logoutUser: async function ({commit, dispatch, state}) {
        await dispatch('updateUser', {
            user_id: state.user.id,
            updates: {
                status_id: 2
            }
        });
        await commit('setUser', {});
        await localStorage.removeItem('user');
        await router.replace('/')
    },
    registerUser: async function ({commit}, payload) {
        await axios.post('http://localhost:8000/api/user/register', payload)
            .then(res => {
                const userDetails = res.data.data;
                console.log(userDetails);
            }).catch(err => {
                console.log(err);
            })
    },
    updateUser: function ({commit}, payload) {
        axios.put('http://localhost:8000/api/user/' + payload.user_id, payload.updates)
            .then(res => {
                let userDetails = res.data.data;
                console.log(userDetails)
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
        axios.get('http://localhost:8000/api/user/' + payload.user_id)
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
                user_id: userDetails.id,
                updates: {
                    status_id: 1
                }
            });
            commit('setUser', userDetails);
            if (userDetails.role_id === 1) {
                router.push('/client')
            } else if (userDetails.role_id === 2) {
                router.push('/receipt')
            }
        }
    },
    getRole: function ({commit}) {
        axios.get('http://localhost:8000/api/role/getAll')
            .then(res => {
                let roles = res.data.data;
                commit('setRoles', roles);
            }).catch(err => {
            console.log(err)
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
