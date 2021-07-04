export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_REVIEW(state, newReview) {
      state.data.push(newReview);
    },
    SET_REVIEWS(state, reviews) {
      state.data = reviews
    },
    REMOVE_REVIEW: (state, reviewIdToRemove) => {
      state.data = state.data.filter(review => review.id !== reviewIdToRemove);
      return state.data;
    },
    EDIT_REVIEW: (state, reviewToEdit) => {
      state.data = state.data.map(review => {
        if (review.id === reviewToEdit.id) {
          review = reviewToEdit;
        }
        return review;
      });
    },

  },
  actions: {
    async add({ commit }, newReview) {
      const formData = new FormData();
      
      Object.keys(newReview).forEach(item => {
        formData.append(item, newReview[item]);
      })

      try {
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REVIEW", data);
      } catch (error) {
        console.log("error");
      }
    },

    async fetch({commit}) {
      try {
        const { data } = await this.$axios.get("/reviews/464");
        commit("SET_REVIEWS", data);
      } catch (error) {
        console.log("error");
      }
    },
    async remove({commit}, reviewId) {
      try {
        const response = await this.$axios.delete(`/reviews/${reviewId}`);
        commit("REMOVE_REVIEW", reviewId)
      } catch (error) {
        console.log(error);
      }
    },
    async edit({commit}, reviewToEdit) {
      try {
        const { data } = await this.$axios.post(`/reviews/${reviewToEdit.id}`, reviewToEdit);
        commit("EDIT_REVIEW", data.review)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    }
  },
};
