<template>
    <v-list-tile :class="$style.root">
        <v-list-tile-content :class="$style.content">
            <v-list-tile-title>
                <v-text-field
                    ref="input"
                    v-model="newName"
                    :rules="[
                      n => !n || !!StringUtils.trim(n) || '请输入名称'
                    ]"
                    maxlength="25"
                    label="添加事项"
                    required
                    clearable
                    prepend-icon="add"
                    outline
                    single-line
                    :error-messages="errorMessage"
                    @keypress="onPress($event)"
                />
            </v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
import * as StringUtils from '../../common/string-utils'

export default {
  data() {
    return {
      StringUtils,
      newName: '',
      errorMessage: ''
    }
  },
  methods: {
    onPress(e) {
      if (e.keyCode === 13) {
        this.addNew()
      } else {
        this.errorMessage = ''
      }
    },
    addNew() {
      let newName = StringUtils.trim(this.newName)
      if (this.$refs.input.valid) {
        if (newName === '') {
          this.errorMessage = '请输入名称'
          return
        }
        this.$emit('addNewItem', newName)
        this.newName = ''
      }
    }
  }
}
</script>

<style lang="scss" module>
.root {
  height: 90px;
  border-top: 1px solid #757575;

  & :global(.v-list__tile) {
    height: 90px;
    padding-right: 8px;
    padding-left: 8px;
  }
}

.action {
  height: 70px;
}

.content {
  height: 84px;
  padding-top: 5px;

  & :global(.v-list__tile__title) {
    height: 84px;
  }
}
</style>
