import { createStore } from "vuex";
import * as knightService from "../services/knightService";
const initialState = {
  knights: [],
  heroes: [],
  loading: false,
};
export default createStore({
  state: initialState,
  getters: {
    knights: (state) => state.knights,
    heroes: (state) => state.heroes,
    loading: (state) => state.loading,
  },
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setHeroes(state, payload) {
      state.heroes = payload;
    },
    setKnights(state, payload) {
      state.knights = payload;
    },
  },
  actions: {
    async init({ commit }) {
      commit("setLoading", true);
      const heroPromise = knightService
        .getHeroes()
        .then((heroes) => commit("setHeroes", heroes));
      const KnightPromise = knightService
        .getKnights()
        .then((knights) => commit("setKnights", knights));
      await Promise.all([heroPromise, KnightPromise]);
      commit("setLoading", false);
    },
    async createKnight({ commit, dispatch }, body) {
      commit("setLoading", true);
      try {
        await knightService.createKnight(body);
        dispatch('init');
      } catch (err: any) {
        if (err.code == 422) {
          console.log(err);
          alert("Dados em formato inválido");
        }
      }
      commit("setLoading", false);
    },
    async updateKnight({ commit, dispatch }, payload) {
      commit("setLoading", true);
      try {
        await knightService.updateKnight(payload.id, payload.body);
        dispatch('init')
      } catch (err: any) {
        if (err.code == 422) {
          console.log(err);
          alert("Dados em formato inválido");
        }
      }
      commit("setLoading", false);
    },
    async deleteKnight({ commit, dispatch }, id) {
      commit("setLoading", true);
      try {
        await knightService.deleteKnight(id);
        dispatch('init')
      } catch (err) {
        console.log(err);
        alert("Infelizmente nao conseguimos completar a deleção");
      }
      commit("setLoading", false);
    },
    async getKnight({ commit }, id) {
      let knight;
      try {
        knight = await knightService.getKnight(id);
      } catch (err: any) {
          console.log(err);
          alert("Não achamos esse documento");
      }
      return knight;
    },
  },
  modules: {},
});
