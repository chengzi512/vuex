import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        title: '',
        num:0,
        count: 0
    },
    getters: {
        evenOrOdd: state => state.count % 2 === 0 ? '偶数' : '基数'
    },
    actions: {
        increment: ({commit}) => commit('increment'),
        decrement: ({commit}) => commit('decrement'),
        incrementIfOdd({commit, state}) {
            if ((state.count + 1) % 2 === 0) {
                commit('increment')
            }
        },
        incrementAsync({commit}) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('increment')
                    resolve()
                }, 1000)
            })
        },
        setTitle({commit},val) {
            commit('title',val)
        }
    },
    mutations: {
        increment(state) {
            state.count++;
            state.num++;
        },
        decrement(state) {
            state.count--;
            state.num++;
        },
        title(state, data) {
            state.title = data;
        }
    }
})
