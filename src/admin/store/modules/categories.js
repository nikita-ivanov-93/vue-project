export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
  },
  actions: {
    async create({commit}, title) {
      try {
        const response = await this.$axios.post('/categories',{title});
        commit("ADD_CATEGORY", response.data)
        console.log(response);
      } catch (error) {
        throw new Error("Failure!!!")
      }
    },
    async fetch({commit}) {
      try {
        const response = await this.$axios.get('/categories/9347');
        console.log(response);
        commit("SET_CATEGORIES", response.data)
      } catch (error) {
        console.log(error);

      }
    }
  }
}