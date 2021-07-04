<template>
  <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">
            Блок "Отзывы"
          </div>
        </div>
        <div class="form">
          <app-form
            v-if="emptyCatIsShown === true || editReviewEnable === true"
            @closeEmptyCat="emptyCatIsShown = false, editReviewEnable = false"
            :reviewToEdit = reviewToEdit
            :emptyCatIsShown = emptyCatIsShown
            :editReviewEnable = editReviewEnable
          />
        </div> 
        <ul class="cards">
          <li class="item">
            <div class="addItem">
              <iconedButton class="btn" type="square" 
                @click  ="emptyCatIsShown = true, editReviewEnable = false" 
                title="Добавить отзыв">
              </iconedButton>
            </div>
          </li>
          <li class="item" v-for="review in reviews" :key="review.id">
            <review-card
              @approve="editReview(review)" 
              @remove="deleteReview(review.id)"
              :review="review"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appForm from "../../components/reviewForm";
import reviewCard from "../../components/reviewCard";
import iconedButton from "../../components/button";
import { mapState, mapActions } from "vuex";

export default {
  components: { 
    iconedButton,
    appForm,
    reviewCard
  },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  data() {
    return {
      emptyCatIsShown: false,
      editReviewEnable: false,
      reviewToEdit: {}
    }
  },
  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch",
      removeReview: "reviews/remove"
    }),
    deleteReview(reviewId) {
      this.removeReview(reviewId);
    },
    editReview(reviewToEdit) {
      this.reviewToEdit = {
        ...reviewToEdit,
      };
      this.emptyCatIsShown = false;
      this.editReviewEnable = true;
    },
  },
  mounted() {
    this.fetchReviews();
  }
};
</script>

<style scoped lang="postcss" src="./reviews.pcss"></style>
