import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state() {
        return {
            username: '',
            id: ''
        }
    },
    mutations: {
        setInfo: (state, { username, id }) => {
            state.username = username,
                state.id = id
        }
    }
})
export default store