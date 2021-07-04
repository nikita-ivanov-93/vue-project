<template lang="pug">
  .about-page-component
    .page-content
      .container
        .header
          .title Блок "Обо мне"
          iconedButton(type="iconed" 
            v-if="emptyCatIsShown === false"
            @click  ="emptyCatIsShown = true" 
            title="Добавить группу"
          )
        ul.skills
          li.item(v-if="emptyCatIsShown")
            category(
              @remove="emptyCatIsShown = false"
              @approve="createCategory" 
              empty     
            )
          li.item(
            v-for="category in categories"
            :key="category.id"
          )
            category( 
              :title="category.category"
              :skills="category.skills"
              @approve="editCategory($event, category.id)" 
              @remove="deleteCategory(category.id)"
              @create-skill="createSkill($event, category.id)"
              @edit-skill="editSkill($event, category.id)"
              @remove-skill="removeSkill"
            )
</template>

<script>
import button from "../../components/button";
import category from "../../components/category";
import {mapActions, mapState} from 'vuex';

export default {
  components: {
    iconedButton: button,
    category,
  },
  data() {
    return {
      emptyCatIsShown: false
    }
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.data
    })
  },
  methods: {
    ...mapActions({
      createCategoriesAction: "categories/create",
      fetchCategoriesAction: "categories/fetch",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove",
      removeCategory: "categories/remove",
      editCategoryAction: "categories/edit"
    }),
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      };
      await this.addSkillAction(newSkill);
      skill.title = "";
      skill.percent = "";

    },
    removeSkill(skill) {
      this.removeSkillAction(skill)
    },
    async editSkill(skill) {
      await this.editSkillAction(skill)
      skill.editmode = false;
    },
    deleteCategory(categoryId) {
      this.removeCategory(categoryId);
    },
    async editCategory(categoryToEdit, categoryId) {
      const newCategoryName = {
        title: categoryToEdit.title,
        category: categoryId
      };
      await this.editCategoryAction(newCategoryName)
      categoryToEdit.editmode = false;
    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoriesAction(categoryTitle.title);
        this.emptyCatIsShown = false;
      } catch(error) {
        console.log(error.message)
      }
    }
  },
  created() {
    this.fetchCategoriesAction();
  }
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>