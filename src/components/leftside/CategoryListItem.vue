<template>
    <v-list-tile
        :class="[highlight ? 'elevation-1' : '', active ? $style.active : '']"
        @click="clickCategory"
        @mouseenter="!mobile && (highlight = true)"
        @mouseleave="!mobile && (highlight = false)"
    >
        <v-list-tile-action>
            <v-icon v-if="category.icon">{{ category.icon }}</v-icon>
            <v-list-tile-title v-else :style="{ textAlign: show ? 'left' : 'center' }">
                <p style="font-size: 24px">{{ category.title.substring(0, 1) }}</p>
            </v-list-tile-title>
        </v-list-tile-action>

        <v-list-tile-content>
            <v-list-tile-title>{{ category.title }}</v-list-tile-title>
        </v-list-tile-content>

        <div v-show="!highlight && category.uncompleteCount > 0" v-text="category.uncompleteCount"/>

        <small-button
            v-if="!isPreserved"
            color="red lighten-1"
            icon="delete"
            :class="[$style.categoryButton]"
            :style="displayStyle"
            @click="deleteCategory"
        />
        <small-button
            v-if="!isPreserved"
            color="orange lighten-1"
            icon="edit"
            :class="[$style.categoryButton]"
            :style="displayStyle"
            @click="(showRename = true) && (renameText = category.title)"
        />
        <small-button
            v-if="!isPreserved && index > 1"
            color="cyan lighten-1"
            icon="arrow_upward"
            :class="[$style.categoryButton]"
            :style="displayStyle"
            @click="move(-1)"
        />
        <small-button
            v-if="!isPreserved && index < categories.length - 1"
            color="cyan lighten-1"
            icon="arrow_downward"
            :class="[$style.categoryButton]"
            :style="displayStyle"
            @click="move(1)"
        />
        <small-button
            v-if="mobile"
            color="blue lighten-1"
            icon="arrow_forward"
            :class="[$style.categoryButton]"
            :style="displayStyle"
            @click="viewCategory"
        />

        <confirm-dialog
            title="重命名"
            :visible="showRename"
            @confirm="renameCategory"
            @cancel="showRename = false"
        >
            <v-text-field
                ref="rename"
                v-model="renameText"
                :rules="[
                  n => !n || !!StringUtils.trim(n) || '请输入名称',
                  n => categories.filter(c => c !== category && c.title.toLowerCase() === StringUtils.trim(n).toLowerCase()).length === 0 || '名称重复',
                  n => StringUtils.trim(n).length <= 15 || '不要超过15 个字'
                ]"
                maxlength="15"
                label="重命名"
                required
                clearable
                outline
                single-line
                @keypress="$event.keyCode === 13 && renameCategory()"
            />
        </confirm-dialog>
    </v-list-tile>
</template>

<script>
import SmallButton from '../common/SmallButton'
import ConfirmDialog from '../common/ConfirmDialog'
import EventBus from '../../common/event-bus'
import * as StringUtils from '../../common/string-utils'

export default {
  props: {
    mobile: Boolean,
    show: Boolean,
    category: Object,
    index: Number
  },
  components: {
    SmallButton,
    ConfirmDialog
  },
  data() {
    return {
      StringUtils,
      highlight: false,
      active: false,
      showRename: false,
      renameText: '',
      categories: this.$store.getters.categories
    }
  },
  computed: {
    displayStyle() {
      return { display: this.show && this.highlight ? 'block' : 'none' }
    },
    isPreserved() {
      return this.category.id === 0
    }
  },
  watch: {
    show: function() {
      if (!this.show) {
        this.highlight = false
      }
    }
  },
  methods: {
    clickCategory() {
      if (this.mobile) {
        if (!this.highlight) {
          this.highlight = true
          this.traversalPeers(p => p.highlight && (p.highlight = false))
        }
      } else {
        this.viewCategory()
      }
    },
    deleteCategory() {
      this.$showConfirmDialog({
        title: '删除分类',
        confirmText: '是',
        content: <p>确定要删除这个分类吗?</p>,
        confirmHandler: () => {
          this.$store.commit('deleteCategory', this.category.id)
          return true
        }
      })
    },
    renameCategory() {
      let valid = this.$refs.rename.valid
      if (valid) {
        if (this.renameText !== this.category.title) {
          this.category.title = this.renameText
        }
      }
      this.showRename = !valid
    },
    viewCategory() {
      EventBus.$emit('view-category', this.category.id)
    },
    onViewCategory(id) {
      if (this.category.id === id) {
        this.active = true
        this.traversalPeers(p => p.active && (p.active = false))
      }
    },
    traversalPeers(action) {
      for (let child of this.$parent.$children) {
        if (child !== this) {
          action(child)
        }
      }
    },
    move(step) {
      let cat = this.categories[this.index]
      this.$set(this.categories, this.index, this.categories[this.index + step])
      this.$set(this.categories, this.index + step, cat)
    }
  },
  created() {
    EventBus.$on('view-category', this.onViewCategory)
  }
}
</script>

<style lang="scss" module>
.category-button {
  height: 25px;
  width: 25px;
  margin-left: 2px;
  margin-right: 2px;
  display: none;
}

.active {
  background: #bdbdbd;
  color: white;
}
</style>
