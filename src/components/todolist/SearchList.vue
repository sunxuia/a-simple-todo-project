<template>
    <div>
        <div :class="$style.search">
            <v-text-field
                ref="renameInput"
                v-model="filterText"
                single-line
                color="primary"
                label="搜索"
                prepend-icon="search"
            ></v-text-field>

            <div :class="$style.order">
                <v-btn
                    fab
                    color="indigo"
                    small
                    outline
                    @click="((filterCompleted = !filterCompleted) ||true) && refresh()"
                >
                    <v-icon dark>{{ filterCompleted ? 'visibility_off' : 'visibility' }}</v-icon>
                </v-btn>
                <v-btn
                    fab
                    :outline="orderBy !== 'title'"
                    color="indigo"
                    @click="changeOrder('title')"
                >
                    <v-icon
                        dark
                    >{{ orderBy === 'title' && !ascend ? 'text_rotation_down' : 'text_rotate_up' }}</v-icon>
                </v-btn>
                <v-btn
                    fab
                    dark
                    color="indigo"
                    :outline="orderBy !== 'time'"
                    @click="changeOrder('time')"
                >
                    <v-icon
                        dark
                    >{{ orderBy === 'time' && !ascend ? 'trending_down' : 'trending_up' }}</v-icon>
                </v-btn>
            </div>
        </div>

        <div :class="$style.result">
            <transition-group name="list">
                <item
                    v-for="i in data"
                    :key="i.id"
                    :item="i"
                    @completeChanged="completeChanged($event, i)"
                />
            </transition-group>
        </div>
    </div>
</template>

<script>
import Item from './ListItem'

export default {
  props: {
    source: Array
  },
  data() {
    return {
      data: [],
      filterText: '',
      orderBy: 'time',
      ascend: false,
      filterCompleted: false
    }
  },
  components: {
    Item
  },
  watch: {
    filterText() {
      this.refresh()
    }
  },
  methods: {
    changeOrder(orderBy) {
      if (this.orderBy === orderBy) {
        this.ascend = !this.ascend
      } else {
        this.orderBy = orderBy
        this.ascend = true
      }
      this.data.sort(this.compareItem)
    },
    compareItem(a, b) {
      let ac = this.orderBy === 'title' ? a.title.toUpperCase() : a.time
      let bc = this.orderBy === 'title' ? b.title.toUpperCase() : b.time
      return ac === bc ? 0 : (this.ascend && ac > bc) || (!this.ascend && ac < bc) ? 1 : -1
    },
    filterItem(c) {
      return c == null
        ? true
        : !(this.filterCompleted && c.completed) && c.title.toUpperCase().indexOf(this.filterText.toUpperCase()) !== -1
    },
    completeChanged(e, item) {
      this.$store.commit('changeCompleteStatus', {
        id: item.id,
        completed: e.value
      })
    },
    refresh() {
      this.data = this.source.filter(this.filterItem).sort(this.compareItem)
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>

<style lang="scss" module>
.search {
  margin-left: 10px;
  padding-left: 30px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
}
.search :global(.v-text-field__details) {
  display: none;
}

.order {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;

  button {
    border-radius: 10%;
    margin: 4px;
    height: 25px !important;
    width: 25px !important;
  }
}

.result {
  margin-left: 10px;
  margin-right: 10px;
  & > *:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
}
</style>
