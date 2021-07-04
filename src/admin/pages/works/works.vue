<template>
  <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <div class="page-title">
            Блок "Работы"
          </div>
        </div>
        <div class="form">
          <app-form
            v-if="emptyCatIsShown === true || editWorkEnable === true"
            @closeEmptyCat="emptyCatIsShown = false, editWorkEnable = false"
            :workToEdit = workToEdit
            :emptyCatIsShown = emptyCatIsShown
            :editWorkEnable = editWorkEnable
          />
        </div> 
        <ul class="cards">
          <li class="item">
            <div class="addItem">
              <iconedButton class="btn" type="square" 
                @click  ="emptyCatIsShown = true, editWorkEnable = false" 
                title="Добавить группу">
              </iconedButton>
            </div>
          </li>
          <li class="item" v-for="work in works" :key="work.id">
            <work-card
              @approve="editWork(work)" 
              @remove="deleteWork(work.id)"
              :work="work"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appForm from "../../components/form";
import workCard from "../../components/workCard";
import button from "../../components/button";
import { mapState, mapActions } from "vuex";

export default {
  components: { 
    iconedButton: button,
    appForm,
    workCard
  },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
  },
  data() {
    return {
      emptyCatIsShown: false,
      editWorkEnable: false,
      workToEdit: {}
    }
  },
  methods: {
    ...mapActions({
      fetchWorks: "works/fetch",
      removeWork: "works/remove"
    }),
    deleteWork(workId) {
      this.removeWork(workId);
    },
    editWork(workToEdit) {
      this.workToEdit = {
        ...workToEdit,
      };
      this.emptyCatIsShown = false;
      this.editWorkEnable = true;
    },
  },
  mounted() {
    this.fetchWorks();
  }
};
</script>

<style scoped lang="postcss" src="./works.pcss"></style>
