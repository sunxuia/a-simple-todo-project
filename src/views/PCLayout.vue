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
            <v-list-tile-title>切换为手机版</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content :class="$style.container">
      <v-container>
        <left-side ref="leftSide" :mobile="false" :show="showLeftSide"/>
        <main-content ref="mainContent" :class="$style.mainContent"/>
      </v-container>
    </v-content>
    <footer class="pa-2" :class="$style.footer">
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </footer>

    <confirm-dialog
      v-if="editingItem"
      title="修改"
      @confirm="modifyTodoItem"
      @cancel="editingItem = null"
    >
      <edit-detail ref="editingDetail" :todoItem="editingItem"/>
    </confirm-dialog>
  </v-app>
</template>

<script>
import MainContent from '../components/maincontent/MainContent'
import EditDetail from '../components/maincontent/EditDetail'
import LeftSide from '../components/leftside/LeftSide'
import ConfirmDialog from '../components/common/ConfirmDialog'
import EventBus from '../common/event-bus'

export default {
  name: 'App',
  components: {
    MainContent,
    LeftSide,
    ConfirmDialog,
    EditDetail
  },
  data () {
    return {
      showLeftSide: false,
      editingItem: null,
      categoryId: 0
    }
  },
  methods: {
    editItem (item) {
      this.editingItem = item
    },
    modifyTodoItem () {
      let res = this.$refs.editingDetail.submit()
      if (res) {
        this.editingItem = null
      }
      return res
    },
    switchLayout () {
      this.$router.push({ name: 'mobile' })
    },
    categoryDeleted (cat) {
      if (this.categoryId === cat.id) {
        EventBus.$emit('view-category', 0)
      }
    },
    viewCategory (categoryId) {
      this.categoryId = categoryId
    }
  },
  created () {
    EventBus.$on('edit-todo-item', this.editItem)
    EventBus.$on('view-category', this.viewCategory)
    EventBus.$on('category-deleted', this.categoryDeleted)
  },
  mounted () {
    EventBus.$emit('view-category', 0)
  }
}
</script>

<style lang="scss" module>
html {
  overflow-y: hidden;
}

@import '../styles/container-layout';

body {
  min-width: $xs;
}

.toolbar {
  z-index: 100;

  & > :global(.v-toolbar__content) {
    @include container-width();
  }
}

.container > :global(.v-content__wrap > .container) {
  padding: 0px 0px 0px 0px;
  margin-bottom: 0px;
  height: 100%;
  display: flex;
  border: 1px #e0e0e0 solid;
  border-top: none;
}

.main-content {
  height: 100%;
  flex-grow: 1;
  overflow: auto;
}

.footer {
  background-color: #f5f5f5;
  & > div {
    text-align: right;
    @include container-width();
  }
}
</style>
