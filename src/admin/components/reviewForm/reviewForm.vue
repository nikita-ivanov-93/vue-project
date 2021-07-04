<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Добавление отзыва"  v-if="emptyCatIsShown">
        <div class="form-container" slot="content">
          <div class="form-cols">
            <div class="form-col form-col-avatar">
              <label class="avatar"
                :style="{backgroundImage: `url(${newReview.preview})`}"
                :class="[ 'uploader', {active: newReview.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
              </label>
              <div class="uploader-btn">
                <app-button typeAttr="file" @change="handleChange" title="Добавить фото"></app-button>
              </div>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input class="input" v-model="newReview.author" title="Имя автора" />
                <app-input class="input" v-model="newReview.occ" title="Титул автора" />
              </div>
              <div class="form-row">
                <app-input class="textarea" v-model="newReview.text" field-type="textarea" title="Отзыв" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" plain @click="$emit('closeEmptyCat')"></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" :type="submit"></app-button>
            </div>
          </div>
        </div>
      </card>
      <card title="Изменение отзыва"  v-if="canEditReview">
        <div class="form-container" slot="content">{{this.reviewToEdit}}
          <div class="form-cols">
            <div class="form-col form-col-avatar">
              <label 
                :style="{backgroundImage: `url(${this.edittedReview.preview})`}"
                :class="[ 'uploader', {active: edittedReview.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
              </label>
              <div class="uploader-btn ">
                <app-button typeAttr="file" @change="handleChange" title="Изменить фото"></app-button>
              </div>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input :value="reviewToEdit.author" v-model="edittedReview.author" title="Имя автора" />
                <app-input :value="reviewToEdit.occ" v-model="edittedReview.occ" title="Титул автора" />
              </div>
              <div class="form-row">
                <app-input :value="reviewToEdit.text" v-model="edittedReview.text" field-type="textarea" title="Описание" />
              </div>
            </div>
          </div>
          <div class="form-btns">
            <div class="btn">
              <app-button title="Отмена" plain @click="$emit('closeEmptyCat')"></app-button>
            </div>
            <div class="btn">
              <app-button title="Сохранить" :type="submit"></app-button>
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>

<script>
import card from "../card";
import avatar from "../avatar";
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import { mapActions, mapState} from "vuex";

export default {
  components: { card, appButton, appInput, tagsAdder, avatar },
  props: {
    reviewToEdit: Object,
    emptyCatIsShown: Boolean,
    editReviewEnable: Boolean,
  },
  data() {
    return {
      hovered: false,
      canEditReview: this.editReviewEnable,
      showEmptyCat: this.emptyCatIsShown,
      newReview: {
        author: "",
        occ: "",
        text: "",
        photo: {},
        preview: '../../../images/content/User-unknown.jpg',
      },
      edittedReview: {
        id: this.reviewToEdit.id,
        author: this.reviewToEdit.author,
        occ: this.reviewToEdit.occ,
        text: this.reviewToEdit.text,
        photo: this.reviewToEdit.photo,
        preview: this.reviewToEdit.preview,
      },
    };
  },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
    
  },
  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
      editReview: "reviews/edit",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (this.emptyCatIsShown) {
        await this.addNewReview(this.newReview);
        this.newReview = {
          author: "",
          occ: "",
          text: "",
          photo: {},
          preview: "",
        },
        this.emptyCatIsShown = false;
      }
      if (this.editReviewEnable) {
        console.log(this.edittedReview);
        // const edittedReview = {
        //   id: this.edittedWork.id, 
        //   title: this.edittedWork.title,
        //   link: this.edittedWork.link,
        //   description: this.edittedWork.description,
        //   techs: this.edittedWork.techs,
        //   photo: this.edittedWork.photo,
        // };
        await this.editReview(this.edittedReview);
        this.canEditReview = false;
      }
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];

      if (this.emptyCatIsShown) {
        this.newReview.photo = file;
      }
      if (this.canEditReview) {
        this.edittedReview.photo = file;
      }
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      if (this.emptyCatIsShown) {
        reader.onloadend = () => {
          this.newReview.preview = reader.result;
        };
      }
      if (this.canEditReview) {
        reader.onloadend = () => {
          this.edittedReview.preview = reader.result;
        };
      }

    },
  },
};
</script>

<style src="./reviewForm.pcss" lang="postcss" scoped></style>
