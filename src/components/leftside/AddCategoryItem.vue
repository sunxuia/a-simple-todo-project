<template>
    <v-list-tile :class="$style.root">
        <v-list-tile-content :class="$style.content">
            <v-list-tile-title>
                <v-text-field
                    ref="input"
                    v-model="newName"
                    :rules="nameRules"
                    maxlength="15"
                    label="添加分类"
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
    let items = this.$store.getters.categories
    return {
      nameRules: [
        n => !n || !!StringUtils.trim(n) || '请输入名称',
        n => items.filter(c => c.title.toLowerCase() === StringUtils.trim(n).toLowerCase()).length === 0 || '名称重复',
        n => StringUtils.trim(n).length <= 15 || '不要超过15 个字'
      ],
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
        this.$emit('addNewCategory', newName)
        this.newName = ''
      }
    }
  }
}
</script>

<style lang="scss" module>
.root {
  height: 90px;
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
