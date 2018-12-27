<template>
    <input type="checkbox" :checked="value" @input="onInput($event)" :class="$style.checkbox">
</template>

<script>
export default {
  props: ['value'],
  methods: {
    onInput(e) {
      e.stopPropagation()
      this.$emit('input', e.target.checked)
    }
  }
}
</script>

<style lang="scss" module>
.checkbox {
  text-align: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  transition: 0.2s;

  &:after {
    content: url('../../assets/round.svg');
  }

  &:checked:after {
    content: url('../../assets/check.svg');
  }

  &:active {
    transform: scale(1.2, 1.2);
    opacity: 1;
    transition: 0.2s;
    background-color: #82b1ff;

    &:checked {
      background-color: #9b9b9b;
    }
  }
}
</style>
