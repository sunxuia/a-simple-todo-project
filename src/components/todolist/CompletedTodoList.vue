<template>
    <div :class="$style.root">
        <sub-title
            :show="todayItems.length > 0"
            :class="$style.subTitle"
            color="#ffffff"
            backColor="#1976d2"
            icon="today"
            title="今天"
        />
        <div :class="$style.subList">
            <item
                v-for="i in todayItems"
                :key="i.id"
                :item="i"
                @completeChanged="removeFromList($event, i)"
            />
        </div>

        <sub-title
            :show="beforeItems.length > 0"
            :class="$style.subTitle"
            color="#ffffff"
            backColor="#1976d2"
            icon="info"
            title="以前"
        />
        <div :class="$style.subList">
            <item
                v-for="i in beforeItems"
                :key="'1-' + i.id"
                :item="i"
                @completeChanged="removeFromList($event, i)"
            />
        </div>

        <sub-title
            :show="!todayItems.length && !beforeItems.length"
            :class="$style.subTitle"
            color="#B3E5FC"
            icon="info"
            title="没有事项"
        />
    </div>
</template>

<script>
import Item from './ListItem'
import SubTitle from './ListSubTitle'
import * as DateUtils from '../../common/date-utils'

export default {
  props: {
    items: Array
  },
  components: {
    Item,
    SubTitle
  },
  computed: {
    todayItems() {
      let today = DateUtils.today(new Date())
      return this.filter(i => i.endTime >= today)
    },
    beforeItems() {
      let today = DateUtils.today(new Date())
      return this.filter(i => i.endTime < today)
    }
  },
  methods: {
    filter(condition) {
      return this.items.filter(condition).sort((a, b) => b.endTime.getTime() - a.endTime.getTime())
    },
    removeFromList(e, item) {
      e.target.fadeOut().then(() => {
        this.$store.commit('changeCompleteStatus', {
          id: item.id,
          completed: e.value
        })
      })
    }
  }
}
</script>

<style lang="scss" module>
.root {
  height: 100%;
  padding: 10px;
}

.sub-title {
  background: lightgray;
}

.sub-list {
  margin-left: 10px;
  & > *:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
}
</style>
