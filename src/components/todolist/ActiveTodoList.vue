<template>
    <div :class="$style.root">
        <sub-title
            :show="previousItems.length > 0"
            :class="$style.subTitle"
            color="#ffffff"
            backColor="#B3E5FC"
            icon="warning"
            title="之前"
        />
        <div :class="$style.subList">
            <item
                v-for="i in previousItems"
                :key="i.id"
                :item="i"
                @completeChanged="removeFromList($event, i)"
            />
        </div>

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
                :key="'1-' + i.id"
                :item="i"
                @completeChanged="removeFromList($event, i)"
            />
        </div>

        <sub-title
            :show="futureItems.length > 0"
            :class="$style.subTitle"
            color="#ffffff"
            backColor="#42A5F5"
            icon="notification_important"
            title="将来"
        />
        <div :class="$style.subList">
            <item
                v-for="i in futureItems"
                :key="'2-' + i.id"
                :item="i"
                @completeChanged="removeFromList($event, i)"
            />
        </div>

        <sub-title
            :show="!(previousItems.length + todayItems.length + futureItems.length)"
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
    previousItems() {
      let today = DateUtils.today(new Date())
      return this.filter(i => i.time < today)
    },
    todayItems() {
      let today = DateUtils.today(new Date())
      let tomorrow = DateUtils.tomorrow(today)
      return this.filter(i => i.time < tomorrow && i.time >= today)
    },
    futureItems() {
      let tomorrow = DateUtils.tomorrow(new Date())
      return this.filter(i => i.time >= tomorrow)
    }
  },
  methods: {
    filter(condition) {
      return this.items.filter(condition).sort((a, b) => a.time.getTime() - b.time.getTime())
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
