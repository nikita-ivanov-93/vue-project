export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_WORK(state, newWork) {
      state.data.push(newWork);
    },
    SET_WORKS(state, works) {
      state.data = works
    },
    REMOVE_WORK: (state, workIdToRemove) => {
      state.data = state.data.filter(work => work.id !== workIdToRemove);
      return state.data;
    },
    EDIT_WORK: (state, workToEdit) => {
      state.data = state.data.map(work => {
        if (work.id === workToEdit.id) {
          work = workToEdit;
        }
        return work;
      });
    },

  },
  actions: {
    async add({ commit }, newWork) {
      const formData = new FormData();
      
      Object.keys(newWork).forEach(item => {
        formData.append(item, newWork[item]);
      })

      try {
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        console.log("error");
      }
    },

    async fetch({commit}) {
      try {
        const { data } = await this.$axios.get("/works/464");
        commit("SET_WORKS", data);
      } catch (error) {
        console.log("error");
      }
    },
    async remove({commit}, workId) {
      try {
        const response = await this.$axios.delete(`/works/${workId}`);
        commit("REMOVE_WORK", workId)
      } catch (error) {
        console.log(error);
      }
    },
    async edit({commit}, workToEdit) {
      try {
        const { data } = await this.$axios.post(`/works/${workToEdit.id}`, workToEdit);
        commit("EDIT_WORK", data.work)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    }
  },
};
