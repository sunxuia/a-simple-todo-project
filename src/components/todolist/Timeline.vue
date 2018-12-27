<template>
    <v-timeline clipped :class="$style.root">
        <v-timeline-item
            v-for="(item, i) in todayItems"
            :key="'1-' + item.id"
            class="mb-3"
            color="randomTodayColor(item, i)"
            :icon-color="randomTodayColor(item, i)"
            small
        >
            <span slot="opposite">
                <strong>{{`${DateUtils.format(item.time, 'HH:mm')}`}}</strong>
            </span>
            <v-card :color="randomTodayColor(item, i)" dark>
                <v-card-title class="title">{{item.title}}</v-card-title>
                <v-card-text v-if="item.description" class="white text--primary">
                    <p v-if="item.description">{{item.description}}</p>
                </v-card-text>
            </v-card>
        </v-timeline-item>

        <v-timeline-item
            v-for="(item, i) in futureItems"
            :key="'2-' + item.id"
            class="mb-3"
            color="randomFutureColor(item, i)"
            :icon-color="randomFutureColor(item, i)"
            small
        >
            <span slot="opposite">
                <strong>{{`${DateUtils.format(item.time, 'MM-dd')}`}}</strong>
            </span>
            <v-card :color="randomFutureColor(item, i)" dark>
                <v-card-title class="title">{{item.title}}</v-card-title>
                <v-card-text v-if="item.description" class="white text--primary">
                    <p v-if="item.description">{{item.description}}</p>
                </v-card-text>
            </v-card>
        </v-timeline-item>
    </v-timeline>
</template>

<script>
import * as DateUtils from '../../common/date-utils'

export default {
  props: {
    items: Array
  },
  data() {
    return {
      color: String,
      DateUtils
    }
  },
  computed: {
    todayItems() {
      let tomorrow = DateUtils.tomorrow(new Date())
      return this.filter(i => i.time < tomorrow)
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
    randomTodayColor(item, i) {
      return `orange lighten-${i % 3}`
    },
    randomFutureColor(item, i) {
      return `blue lighten-${i % 3}`
    }
  }
}
</script>

<style lang="scss" module>
.root {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
