import Vue from 'vue';
import Vuex from 'vuex';
import LoginUser from '@/models/LoginModel';
import * as ls from 'local-storage';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false as boolean,
    token: null as string | null,
    user: null as string | null,
  },
  getters: {
    isLoading: state => state.isLoading,
    token: state => state.token,
    isLoggedIn: state => !!state.token,
    user: (state, getters) => {
      if (getters.isLoggedIn) {
        return state.user;
      } else {
        return null;
      }
    },
  },
  mutations: {
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    setToken(state, jwt: string) {
      state.token = jwt;
    },
    setUser(state, user: string) {
      state.user = user;
    },
  },
  actions: {
    async restore({ commit }) {
      //Get token from session storage
      const ssSession = sessionStorage.getItem('session');
      if (ssSession) {
        //Get User From token through server
        const [token, username] = ssSession.split('_');
        commit('setToken', token);
        commit('setUser', username);
        return;
      } else {
        //If not in session storage, try retrieving from local storage
        const lsSession = ls.get<string>('session');
        if (lsSession) {
          //Get User From token through server
          const [token, username] = lsSession.split('_');
          commit('setToken', token);
          commit('setUser', username);
          return;
        } else {
          return;
        }
      }
    },
    login({ commit }, loginUser: LoginUser) {
      commit('setToken', loginUser.jwt);
      ls.set<string>('session', loginUser.jwt);
      commit('setUser', loginUser.username);
    },
    sessionStorageLogin({ commit }, loginUser: LoginUser) {
      commit('setToken', loginUser.jwt);
      sessionStorage.setItem('session', loginUser.jwt);
      commit('setUser', loginUser.username);
    },
    logout({ commit }) {
      commit('setToken', null);
      ls.set<null>('session', null);
      sessionStorage.removeItem('session');
      router.push({ name: 'Home' });
      commit('setUser', null);
    },
  },
  modules: {},
});
