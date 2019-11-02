import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import receipt from './receipt'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user: user,
        receipt: receipt

    }
})
