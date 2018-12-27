<template>
  <v-dialog v-model="visible" :max-width="maxWidth">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>
        <slot/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn v-if="showCancel" color="red darken-1" flat="flat" @click="click('cancel')">取消</v-btn>
        <v-btn color="green darken-1" flat="flat" @click="click('confirm')">{{confirmText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '确认'
    },
    maxWidth: {
      type: Number,
      default: 600
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '好'
    }
  },
  methods: {
    click (msg) {
      this.$emit(msg)
    }
  }
}
</script>
