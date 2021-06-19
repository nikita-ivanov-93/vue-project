<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="currentCategory.editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="currentCategory.editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorMessage="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')" ></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';


export default {
  mixin: [ValidatorMixin],
  validators: {
    "title": value => {
      return Validator.value(value).required("Fill the field!");
    },
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    blocked: Boolean,
    editModeByDefault: Boolean,
  },
  data() {
    return {
      currentCategory: {
        editmode: this.editModeByDefault,
        title: this.value,
      }
    };
  },
  methods: {
    onApprove() {
      if (this.value.trim() === "") {
        this.errorText= "fill the field!"
        return false
      };
      if (this.currentCategory.title.trim() === this.value.trim()) {
        this.currentCategory.editmode = false;
      } else {
        this.currentCategory.title = this.value;
        this.$emit("approve", this.currentCategory);
      }
    },
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input"),

  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>