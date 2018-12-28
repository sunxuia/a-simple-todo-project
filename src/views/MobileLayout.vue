<template>
  <v-app>
    <v-toolbar app dark color="primary" :class="$style.toolbar" flat>
      <v-toolbar-side-icon @click="showLeftSide = !showLeftSide"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">simple todo list</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn slot="activator" color="primary" dark icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile :style="{cursor:'pointer'}" @click="switchLayout">
            <v-list-tile-title>切换为电脑版</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content :class="$style.container">
      <left-side ref="leftSide" :mobile="true" :show="showLeftSide"/>
      <main-content ref="mainContent" v-show="!showLeftSide" :class="$style.mainContent"/>
    </v-content>

    <v-dialog v-if="editingItem" v-model="showEditDialog" fullscreen hide-overlay>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="editingItem = null">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>设置项目</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="modifyTodoItem">保存</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container>
          <edit-detail ref="editingDetail" :todoItem="editingItem"/>
        </v-container>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import MainContent from '../components/maincontent/MainContent'
import EditDetail from '../components/maincontent/EditDetail'
import LeftSide from '../components/leftside/LeftSide'
import EventBus from '../common/event-bus'

export default {
  name: 'App',
  components: {
    MainContent,
    LeftSide,
    EditDetail
  },
  data() {
    return {
      showEditDialog: true,
      showLeftSide: true,
      editingItem: null
    }
  },
  methods: {
    editItem(item) {
      this.editingItem = item
    },
    modifyTodoItem() {
      let res = this.$refs.editingDetail.submit()
      if (res) {
        this.editingItem = null
      }
      return res
    },
    switchLayout() {
      this.$router.push({ name: 'pc' })
    },
    viewCategory(categoryId) {
      this.showLeftSide = false
    }
  },
  created() {
    EventBus.$on('edit-todo-item', this.editItem)
    EventBus.$on('view-category', this.viewCategory)
  }
}
</script>

<style lang="scss" module>
html {
  overflow-y: hidden;
}

body {
  min-width: 300px;
}

.toolbar {
  z-index: 100;
}

.container > :global(.v-content__wrap > .container) {
  padding: 0px 0px 0px 0px;
  margin-bottom: 0px;
  height: 100%;
  // display: flex;
  border: 1px #e0e0e0 solid;
  border-top: none;
}

.main-content {
  height: 100%;
  flex-grow: 1;
  overflow: auto;
}
</style>
