<template>
    <div :class="[$style.root, inRenaming ? $style.renaming : '']">
        <big-checkbox :class="$style.left" v-model="completed"/>
        <div :class="$style.container">
            <div :class="$style.title">
                <div :class="[$style.titleText, completed ? $style.completed : '']">
                    <div :class="$style.mainTitle">{{item.title}}</div>
                    <div :class="$style.subTitle">{{item.description}}</div>
                </div>
                <div :class="$style.btns">
                    <v-btn
                        icon
                        :style="{ visibility: item.children.length ? 'visible' : 'hidden' }"
                        @click="expandPanel ? withdraw() : expand()"
                    >
                        <v-icon ref="expandIcon">expand_more</v-icon>
                    </v-btn>
                    <small-button
                        :color="item.star ? 'red lighten-1' : 'grey lighten-1'"
                        :icon="item.star ? 'star' : 'star_border'"
                        @click="starItem"
                    />
                    <small-button color="orange lighten-1" icon="edit" @click="renameItem"/>
                    <small-button color="grey lighten-1" icon="delete" @click="deleteItem"/>
                    <small-button color="primary lighten-1" icon="chevron_right" @click="editItem"/>
                </div>
            </div>
            <div
                ref="detail"
                :style="{
                  height: 0,
                  borderTop: expandPanel ? '1px lightgray dashed' : 'none'
                }"
                v-show="item.children.length"
            >
                <item-detail
                    ref="itemDetail"
                    v-show="expandPanel"
                    :item="item"
                    @heightChanged="detailHeightChanged"
                />
            </div>
        </div>
        <div v-if="inRenaming" :class="$style.renaming">
            <v-text-field
                ref="renameInput"
                v-model="newName"
                :rules="[n => !!StringUtils.trim(n) || '请输入内容']"
                maxlength="25"
                required
                outline
                single-line
                color="orange lighten-1"
                @keypress="onRenamePress($event)"
            >
                <v-icon slot="prepend">edit</v-icon>
                <small-button
                    slot="append"
                    color="green lighten-1"
                    icon="check"
                    @click="doRenameItem"
                    :class="$style.renamingOperation"
                />
                <small-button
                    slot="append"
                    color="red lighten-1"
                    icon="close"
                    @click="inRenaming = false"
                    :class="$style.renamingOperation"
                />
            </v-text-field>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import BigCheckbox from '../common/BigCheckbox'
import SmallButton from '../common/SmallButton'
import ItemDetail from './ItemDetail'
import { setTimeout } from 'timers'
import EventBus from '../../common/event-bus'
import * as StringUtils from '../../common/string-utils'

export default {
  props: {
    item: Object
  },
  components: {
    ItemDetail,
    BigCheckbox,
    SmallButton
  },
  data() {
    return {
      StringUtils,
      completed: this.item.completed,
      expandPanel: false,
      inRenaming: false,
      newName: ''
    }
  },
  watch: {
    'item.completed': function() {
      this.completed = this.item.completed
    },
    completed() {
      this.$emit('completeChanged', {
        target: this,
        value: this.completed
      })
    }
  },
  methods: {
    expand() {
      let detail = this.$refs.detail
      let time = this.item.children.length * 100
      detail.style.transition = 'height ' + time + 'ms'
      detail.style.height = this.$refs.itemDetail.height + 'px'

      let icon = this.$refs.expandIcon.$el
      icon.style.transition = time + 'ms'
      icon.className += ' ' + this.$style.rotate
      setTimeout(() => (this.expandPanel = true), time)
    },
    withdraw() {
      let detail = this.$refs.detail
      let time = this.item.children.length * 100
      detail.style.transition = 'height ' + time + 'ms'
      detail.style.height = 0

      let icon = this.$refs.expandIcon.$el
      icon.style.transition = time + 'ms'
      icon.className = icon.className.replace(' ' + this.$style.rotate, '')

      this.expandPanel = false
    },
    detailHeightChanged(newHeight, oldHeight) {
      if (this.expandPanel) {
        this.$refs.detail.style.height = newHeight + 'px'
      }
    },
    starItem() {
      this.item.star = !this.item.star
    },
    renameItem() {
      this.newName = this.item.title
      this.inRenaming = true
      Vue.nextTick(() => {
        this.$refs.renameInput.$el.querySelector('input').select()
      })
    },
    onRenamePress(e) {
      if (e.keyCode === 13) {
        this.doRenameItem()
      }
    },
    doRenameItem() {
      if (this.$refs.renameInput.valid) {
        this.item.title = this.newName
        this.inRenaming = false
      }
    },
    deleteItem() {
      this.$showConfirmDialog({
        title: '删除',
        confirmText: '是',
        content: <p>确定要删除这个事项吗?</p>,
        confirmHandler: () => {
          this.$store.commit('deleteTodoItem', this.item.id)
          return true
        }
      })
    },
    fadeOut() {
      return new Promise((resolve, reject) => {
        let timeout = 1000
        let style = this.$el.style
        style.transition = `opacity ${timeout}ms`
        style.opacity = 0
        setTimeout(() => {
          resolve()
        }, timeout)
      })
    },
    editItem() {
      EventBus.$emit('edit-todo-item', this.item)
    }
  }
}
</script>

<style lang="scss" module>
.root {
  display: flex;

  &.renaming {
    height: 96px;
  }

  & > .renaming {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: white;
    margin: 10px 10px auto 10px;

    :global(.v-input__append-inner) {
      margin-top: 0px !important;
    }

    .renaming-operation {
      width: 40px;
      height: 40px;
    }
  }
}

.left {
  margin: 10px 0px 10px 0px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.title {
  display: flex;
  justify-content: space-between;
  height: 72px;
  width: 100%;
  padding-left: 10px;

  .title-text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .main-title {
      font-size: 20px;
      color: #1976d2;
    }

    .sub-title {
      font-size: 14px;
      color: #9e9e9e;
    }

    &.completed > .main-title,
    &.completed > .sub-title {
      color: #9e9e9e;
    }
  }
}

.btns {
  display: flex;
  align-items: center;

  & > * {
    height: 36px;
    width: 36px;
    margin: auto 2px auto 2px;
    i {
      /* fix position abnormal on firefox */
      height: 24px !important;
    }
  }
}

.detail {
  border-top: 1px solid lightgray;
  height: 200px;
}

.rotate {
  transform: rotate(-180deg);
}
</style>
