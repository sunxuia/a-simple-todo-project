import Vue from 'vue'
import Vuex from 'vuex'
import EventBus from '../common/event-bus'
import createPersistedState from 'vuex-persistedstate'
// import remote from './remote'

Vue.use(Vuex)

const user = null

function getById(list, id) {
  for (let i of list) {
    if (i.id === id) {
      return i
    }
  }
}

function nextId(list) {
  let max = -1
  for (let i of list) {
    max = Math.max(max, i.id)
  }
  return max + 1
}

function addUncompletedCount(state, categoryId, change) {
  state.categories[0].uncompleteCount += change
  getById(state.categories, categoryId).uncompleteCount += change
}

const store = new Vuex.Store({
  plugins: [createPersistedState({
    key: 'todo-vuex'
  })],
  state: {
    user,
    categories: [],
    todoItems: [],
    categoryTodoItems: {}
  },
  getters: {
    user: state => state.user,
    categories: state => state.categories,
    todoList: state => categoryId =>
      categoryId === 0 ? state.todoItems : state.categoryTodoItems[categoryId]
  },
  mutations: {
    addCategory(state, newTitle) {
      let cat = {
        id: nextId(state.categories),
        title: newTitle,
        uncompleteCount: 0
      }
      state.categories.push(cat)
      state.categoryTodoItems[cat.id] = []
    },
    deleteCategory(state, id) {
      let cat = getById(state.categories, id)
      state.categories.splice(state.categories.indexOf(cat), 1)
      delete state.categoryTodoItems[id]
      for (let i = state.todoItems.length - 1; i >= 0; i--) {
        if (state.todoItems[i].category === id) {
          state.todoItems.splice(i, 1)
        }
      }
      EventBus.$emit('category-deleted', cat)
    },
    changeCompleteStatus(state, {
      id,
      completed
    }) {
      let item = getById(state.todoItems, id)
      if (completed) {
        addUncompletedCount(state, item.category, -1)
        item.endTime = new Date()
      } else {
        addUncompletedCount(state, item.category, 1)
        delete item.endTime
      }
      item.completed = completed
    },
    addTodoItem(state, {
      categoryId,
      title
    }) {
      let item = {
        id: nextId(state.todoItems),
        title,
        description: '',
        star: false,
        category: categoryId,
        time: new Date(),
        completed: false,
        children: []
      }
      state.todoItems.push(item)
      addUncompletedCount(state, categoryId, 1)
      state.categoryTodoItems[categoryId].push(item)
      EventBus.$emit('todo-item-added', item)
    },
    editTodoItem(state, newItem) {
      let item = getById(state.todoItems, newItem.id)
      Object.assign(item, newItem)
    },
    deleteTodoItem(state, id) {
      for (let i = 0; i < state.todoItems.length; i++) {
        let item = state.todoItems[i]
        if (item.id === id) {
          state.todoItems.splice(i, 1)
          addUncompletedCount(state, item.category, -1)
          EventBus.$emit('todo-item-deleted', item)
          return
        }
      }
    },
    recoverData(state) {
      function traversalList(list) {
        for (let item of list) {
          if (item.time) {
            item.time = new Date(item.time)
          }
          if (item.endTime) {
            item.endTime = new Date(item.endTime)
          }
        }
      }
      traversalList(state.todoItems)
      for (let key of Object.keys(state.categoryTodoItems)) {
        traversalList(state.categoryTodoItems[key])
      }
    }
  }
})

if (store.state.categories.length === 0) {
  // initial
  store.commit('addCategory', '全部')
} else {
  // process data saved by createPersistedState
  store.commit('recoverData')
}

export default store
