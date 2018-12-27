<template>
    <v-btn fab dark outline :color="color" @click="onClick($event)">
        <v-icon dark>{{icon}}</v-icon>
    </v-btn>
</template>

<script>
export default {
  props: {
    color: String,
    icon: String
  },
  methods: {
    onClick(e) {
      e.stopPropagation()
      this.$emit('click', e)
    }
  }
}
</script>
