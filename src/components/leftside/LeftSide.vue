<template>
    <v-navigation-drawer
        v-if="!mobile || show"
        :mini-variant="!mobile && !show"
        :mobile-break-point="-1"
        :class="[$style.drawer, mobile ? show ? $style.maxWidth : $style.hide : undefined]"
        :style="{minWidth: show ? '300px' : '80px'}"
    >
        <!-- todo: 添加用户操作 -->
        <v-list class="pa-1">
            <v-list-tile avatar tag="div">
                <v-list-tile-avatar>
                    <img :src="user == null ? Logo : user.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{user == null ? '' : user.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-divider light></v-divider>
        <v-list class="pt-0" ref="categoryList" :class="$style.categoryList">
            <transition-group name="list">
                <category-list-item
                    v-for="(item, i) in items"
                    :key="item.title"
                    :mobile="mobile"
                    :show="show"
                    :category="item"
                    :items="items"
                    :index="i"
                />
            </transition-group>
        </v-list>

        <v-divider light></v-divider>
        <add-category-item v-show="mobile || show" :items="items" @addNewCategory="addNewCategory"/>
    </v-navigation-drawer>
</template>

<script>
import CategoryListItem from './CategoryListItem'
import AddCategoryItem from './AddCategoryItem'
import Logo from '../../assets/logo.svg'

export default {
  props: {
    show: Boolean,
    mobile: Boolean
  },
  data() {
    let user = this.$store.getters.user
    let items = this.$store.getters.categories
    return {
      user,
      items,
      Logo
    }
  },
  components: {
    CategoryListItem,
    AddCategoryItem
  },
  methods: {
    addNewCategory(newName) {
      this.$store.commit('addCategory', newName)
    }
  }
}
</script>

<style lang="scss" module>
.drawer {
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;

  &.max-width {
    width: 100% !important;
  }

  &.hide {
    display: none;
  }
}

.category-list {
  flex: 1 1 auto;
  height: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
