<template>
  <div class="form-component">
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Добавление работы"  v-if="emptyCatIsShown">
        <div class="form-container" slot="content">{{newWork}}
          <div class="form-cols">
            <div class="form-col">
              <label
                :style="{backgroundImage: `url(${newWork.preview})`}"
                :class="[ 'uploader', {active: newWork.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-title">Перетащите или загрузите картинку</div>
                <div class="uploader-btn">
                  <app-button typeAttr="file" @change="handleChange" title="ЗАГРУЗИТЬ"></app-button>
                </div>
              </label>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input v-model="newWork.title" title="Название" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.link" title="Ссылка" />
              </div>
              <div class="form-row">
                <app-input v-model="newWork.description" field-type="textarea" title="Описание" />
              </div>
              <div class="form-row">
                <tags-adder v-model="newWork.techs" :tags = newWork.techs />
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
      <card title="Изменение работы"  v-if="editWorkEnable">
        <div class="form-container" slot="content">{{this.workToEdit}}
          <div class="form-cols">
            <div class="form-col col-preview">
              <label 
                :style="{backgroundImage: `url(${this.edittedWork.preview})`}"
                :class="[ 'uploader', {active: edittedWork.preview}, {
                  hovered: hovered
                }]"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="uploader-title">Перетащите или загрузите картинку</div>
              </label>
              <div class="uploader-btn ">
                <app-button typeAttr="file" @change="handleChange" title="Изменить превью"></app-button>
              </div>
            </div>
            <div class="form-col">
              <div class="form-row">
                <app-input :value="workToEdit.title" v-model="edittedWork.title" title="Название" />
              </div>
              <div class="form-row">
                <app-input :value="workToEdit.link" v-model="edittedWork.link" title="Ссылка" />
              </div>
              <div class="form-row">
                <app-input :value="workToEdit.description" v-model="edittedWork.description" field-type="textarea" title="Описание" />
              </div>
              <div class="form-row">
                <tags-adder :tags = workToEdit.techs v-model="edittedWork.techs"/>
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
import appButton from "../button";
import appInput from "../input";
import tagsAdder from "../tagsAdder";
import { mapActions, mapState} from "vuex";

export default {
  components: { card, appButton, appInput, tagsAdder },
  props: {
    workToEdit: Object,
    emptyCatIsShown: Boolean,
    editWorkEnable: Boolean,
  },
  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      },
      edittedWork: {
        id: this.workToEdit.id,
        title: this.workToEdit.title,
        link: this.workToEdit.link,
        description: this.workToEdit.description,
        techs: this.workToEdit.techs,
        photo: this.workToEdit.photo,
        preview: this.workToEdit.preview,
      },
    };
  },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
    
  },
  methods: {
    ...mapActions({
      addNewWork: "works/add",
      editWork: "works/edit",
    }),
    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async handleSubmit() {
      if (this.emptyCatIsShown) {
        await this.addNewWork(this.newWork);
        this.newWork = {
          title: "",
          link: "",
          description: "",
          techs: "",
          photo: {},
          preview: "",
        };
        this.emptyCatIsShown = false;
      }
      if (this.editWorkEnable) {
        console.log(this.edittedWork);
        const editWork = {
          id: this.edittedWork.id, 
          title: this.edittedWork.title,
          link: this.edittedWork.link,
          description: this.edittedWork.description,
          techs: this.edittedWork.techs,
          photo: this.edittedWork.photo,
        };
        await this.editWork(editWork);
        this.editWorkEnable = false;
      }
    },
    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];

      if (this.emptyCatIsShown) {
        this.newWork.photo = file;
      }
      if (this.editWorkEnable) {
        this.edittedWork.photo = file;
      }
      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      if (this.emptyCatIsShown) {
        reader.onloadend = () => {
          this.newWork.preview = reader.result;
        };
      }
      if (this.editWorkEnable) {
        reader.onloadend = () => {
          this.edittedWork.preview = reader.result;
        };
      }

    },
  },
};
</script>

<style src="./form.pcss" lang="postcss" scoped></style>
