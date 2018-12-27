<template>
    <div>
        <v-list dense>
            <v-list-tile v-for="(child, i) in item.children" :key="i" :class="$style.childList">
                <v-list-tile-action>
                    <v-checkbox v-model="child.completed"/>
                </v-list-tile-action>
                <v-list-tile-content>{{child.title}}</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    height() {
      return 20 + this.item.children.length * 40
    }
  },
  watch: {
    height(newHeight, oldHeight) {
      if (newHeight !== oldHeight) {
        this.$emit('heightChanged', newHeight, oldHeight)
      }
    }
  },
  created() {
    this.$emit('heightChanged', this.height)
  }
}
</script>

<style lang="scss" module>
.child-list {
  margin-left: 0;
  margin-right: 0;
}
</style>
