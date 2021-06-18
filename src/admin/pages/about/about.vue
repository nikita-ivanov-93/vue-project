<template lang="pug">
  .about-page-component
    .page-content
      .container
        .header
          .title Блок "Обо мне"
          iconed-button(type="iconed" 
            v-if="emptyCatIsShown === false"
            @click  ="emptyCatIsShown = true" 
            title="Добавить группу"
          )
        ul.skills
          li.item(v-if="emptyCatIsShown")
            category(@remove="emptyCatIsShown = false"
              empty 
            )
          li.item(
            v-for="category in categories"
            :key="category.id"
          )
            category( 
              :title="category.category"
              :skills="category.skills"
            )
</template>

<script>
import button from "../../components/button";
import category from "../../components/category";

export default {
  components: {
    iconedButton: button,
    category,
  },
  data() {
    return {
      categories: [],
      emptyCatIsShown: false
    }
  },
  created() {
    this.categories = require("../../data/categories.json");
  }
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>