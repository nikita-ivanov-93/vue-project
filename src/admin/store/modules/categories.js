export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      })
    },
    REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map(category => {
        if (category.id === skillToRemove.category) {
          category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id)
        }
        return category;
      })
    },
    EDIT_SKILL: (state, skillToEdit) => {
      const editSkill = category => {
        category.skills = category.skills.map(skill => {
          if (skill.id === skillToEdit.id) {
            skill = skillToEdit;
          }
          return skill;
        })  
      }
      const findCategory = category => {
        if (category.id === skillToEdit.category) {
          editSkill(category);
        };
        return category;
      }
      state.data = state.data.map(findCategory);
    },
    EDIT_CATEGORY: (state, categoryToEdit) => {
      const editSkill = category => {
        category.skills = category.skills.map(skill => {
          if (skill.id === skillToEdit.id) {
            skill = skillToEdit;
          }
          return skill;
        })  
      }
      const findCategory = category => {
        if (category.id === skillToEdit.category) {
          editSkill(category);
        };
        return category;
      }
      state.data = state.data.map(findCategory);
    },
    REMOVE_CATEGORY: (state, categoryIdToRemove) => {
      state.data = state.data.filter(category => category.id !== categoryIdToRemove);
      return state.data;
    }
  },
  actions: {
    async create({commit}, title) {
      try {
        const response = await this.$axios.post('/categories',{title});
        commit("ADD_CATEGORY", response.data)
      } catch (error) {
        throw new Error("Failure!!!")
      }
    },
    async fetch({commit}) {
      try {
        const response = await this.$axios.get('/categories/464');
        commit("SET_CATEGORIES", response.data)
      } catch (error) {
        console.log(error);
      }
    },
    async remove({commit}, categoryId) {
      try {
        const response = await this.$axios.delete(`/categories/${categoryId}`);
        commit("REMOVE_CATEGORY", categoryId)
      } catch (error) {
        console.log(error);
      }
    }
  }
}