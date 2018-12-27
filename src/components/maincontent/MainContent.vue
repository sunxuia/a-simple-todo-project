<template>
  <div>
    <v-tabs
      v-model="active"
      color="primary"
      dark
      slider-color="white"
      :class="'MainContent_tabRoot_1234'"
      :icons-and-text="bigIcon"
    >
      <v-tab>待办
        <v-icon>check</v-icon>
      </v-tab>
      <v-tab>已完成
        <v-icon>check_circle_outline</v-icon>
      </v-tab>
      <v-tab>搜索
        <v-icon>search</v-icon>
      </v-tab>
      <v-tab>日程
        <v-icon>schedule</v-icon>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <active-todo-list :items="todoItems.filter(i => !i.completed)"/>
        </v-card>
        <add-todo-item v-show="categoryId !== 0" @addNewItem="addNewItem"/>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <completed-todo-list :items="todoItems.filter(i => i.completed)"/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <search-list ref="searchList" :source="todoItems"/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <timeline :items="todoItems.filter(i => !i.completed)"/>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ActiveTodoList from '../todolist/ActiveTodoList'
import CompletedTodoList from '../todolist/CompletedTodoList'
import SearchList from '../todolist/SearchList'
import AddTodoItem from '../todolist/AddTodoItem'
import Timeline from '../todolist/Timeline'
import EventBus from '../../common/event-bus'

export default {
  components: {
    ActiveTodoList,
    CompletedTodoList,
    SearchList,
    Timeline,
    AddTodoItem
  },
  data () {
    return {
      active: 0,
      categoryId: 0,
      todoItems: [],
      bigIcon: true
    }
  },
  watch: {
    active (newValue, oldValue) {
      if (newValue === 2 && this.$refs.searchList) {
        this.$refs.searchList.refresh()
      }
    }
  },
  methods: {
    addNewItem (title) {
      this.$store.commit('addTodoItem', { categoryId: this.categoryId, title })
    },
    viewCategory (categoryId) {
      this.categoryId = categoryId
      this.todoItems = this.$store.getters.todoList(categoryId)
    },
    addTodoItem (item) {
      let index = this.todoItems.indexOf(item)
      if (index === -1) {
        this.todoItems.push(item)
      }
    },
    deleteTodoItem (item) {
      let index = this.todoItems.indexOf(item)
      if (index > -1) {
        this.todoItems.splice(index, 1)
      }
    },
    onResize () {
      this.bigIcon = this.$el.offsetWidth > 600
    }
  },
  created () {
    EventBus.$on('view-category', this.viewCategory)
    EventBus.$on('todo-item-added', this.addTodoItem)
    EventBus.$on('todo-item-deleted', this.deleteTodoItem)
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }
}
</script>

<style lang="scss">
.MainContent_tabRoot_1234 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .v-tabs__container {
    height: 64px;
  }

  .v-window {
    flex: 1 1 auto;
    height: 0;
    overflow-x: hidden;
    overflow-y: auto;

    .v-window__container {
      height: 100%;

      .v-window-item {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: hidden;

        .v-card {
          flex: 1 1 auto;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
