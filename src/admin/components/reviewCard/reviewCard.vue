<template>
  <card simple>
    <div class="reviews-wrapper">
      <div class="pic">
        <avatar class="image" :src="cover" :size="5"/>
        <div class="user-info">
          <div class="name">{{review.author}}</div>
          <div class="occ">{{review.occ}}</div>
        </div>
      </div>
      <div class="data">
        <div class="text">
          <p>{{review.text}}</p>
        </div>
        <div class="btns">
          <icon symbol="pencil" title="Править" @click="$emit('approve')"></icon>
          <icon symbol="trash" title="Удалить" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../card";
import icon from "../icon";
import avatar from "../avatar";

export default {
  components: { card, icon, avatar },
  props: {
    review: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    }
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>
