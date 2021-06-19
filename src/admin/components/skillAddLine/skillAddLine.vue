<template>
  <div 
    :class="['skill-add-line-component', {blocked: blocked}]"
  >
    <div class="title">
      <app-input :errorMessage="validation.firstError('skill.title')" placeholder="Новый навык" v-model="skill.title"/>
    </div>
    <div class="percent">
      <app-input :errorMessage="validation.firstError('skill.percent')" type="number" min="0" max="100" maxlength="3" v-model="skill.percent"/>
    </div>
    <div class="button">
      <round-button type="round" @click="handleClick"/>
    </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';


export default {
  mixin: [ValidatorMixin],
  validators: {
    "skill.title": value => {
      return Validator.value(value).required("Fill the field!");
    },
    "skill.percent": value => {
      return Validator.value(value)
      .integer("Should be a number!")
      .between(0,100,"Fill a correct number!")
      .required("Fill the field!")
    },
  },
  props: {
    blocked: Boolean
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  data() {
    return {
      skill: {
        title: "", 
        percent: "", 
      }
    }
  },
  methods: {
    async handleClick() {
      if (await this.$validate() === false)return;
      this.$emit('approve', this.skill)
    }
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>
