<template>
    <transition name="fade" mode="out-in">
        <div :class="$style.root" v-if="show" :style="{color, backgroundColor: backColor}">
            <v-icon v-if="icon" :color="color">{{icon}}</v-icon>
            <h4>{{title}}</h4>
        </div>
    </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    icon: String,
    title: String,
    color: {
      type: String,
      default: 'black'
    },
    backColor: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<style lang="scss" module>
.root {
  height: 40px;
  font-size: 23px;

  & > * {
    display: inline-block;
    vertical-align: middle;
    margin: 3px;
  }
}
</style>
