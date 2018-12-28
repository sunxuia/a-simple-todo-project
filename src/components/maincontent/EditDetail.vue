<template>
  <v-form ref="form" v-model="valid" lazy-validation :class="'EditDetail_root_1234'">
    <v-text-field
      v-model="item.title"
      :rules="[notEmptyRule, notLongRule]"
      :counter="25"
      label="事项"
      required
    ></v-text-field>
    <v-text-field v-model="item.description" maxlength="25" :counter="25" label="备注" required></v-text-field>
    <v-input :class="'EditDetail_timeSelector_1234'">
      <v-label>
        <v-icon>timer</v-icon>
      </v-label>
      <datetime type="datetime" v-model="time" format="yyyy-MM-dd HH:mm"></datetime>
    </v-input>
    <v-checkbox v-model="item.star" label="重要" required></v-checkbox>

    <v-label>步骤</v-label>
    <v-list>
      <transition-group name="list">
        <v-list-tile v-for="(child, i) in children" :key="child.id">
          <v-list-tile-content>
            <v-text-field
              v-model="child.title"
              :rules="[notEmptyRule]"
              maxlength="25"
              :counter="25"
              :label="`步骤 ${i + 1}`"
            >
              <span slot="append" class="EditDetail_clickable" @click="move(i, -1)" v-if="i > 0">
                <v-icon>arrow_upward</v-icon>
              </span>
              <span
                slot="append"
                class="EditDetail_clickable"
                @click="move(i, 1)"
                v-if="i < children.length - 1"
              >
                <v-icon>arrow_downward</v-icon>
              </span>
              <span slot="append" class="EditDetail_clickable" @click="deleteChildren(child)">
                <v-icon>delete</v-icon>
              </span>
            </v-text-field>
          </v-list-tile-content>
        </v-list-tile>
      </transition-group>
      <v-list-tile>
        <v-list-tile-content>
          <v-text-field
            ref="newChildInput"
            v-model="newChildTitle"
            :counter="25"
            maxlength="25"
            label="新增步骤"
            prepend-icon="add"
            :error-messages="newChildErrorMesage"
            @keypress="enterNewChildTitle($event)"
          ></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-form>
</template>

<script>
import 'vue-datetime/dist/vue-datetime.css'
import { Datetime } from 'vue-datetime'
import * as StringUtils from '../../common/string-utils'

export default {
  props: {
    todoItem: Object
  },
  components: {
    Datetime
  },
  watch: {
    todoItem: {
      handler () {
        if (this.todoItem) {
          this.item = { ...this.todoItem }
          this.children = []
          for (let child of this.item.children) {
            this.children.push({
              id: this.childrenId++,
              ...child
            })
          }
          this.time = this.item.time.toISOString()
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      valid: true,
      notEmptyRule: v => !!StringUtils.trim(v) || '请填写内容',
      notLongRule: v => !v || v.length <= 25 || '请勿超过25个字',
      newChildTitle: '',
      newChildErrorMesage: undefined,
      item: {},
      children: [],
      childrenId: 0,
      time: new Date().toISOString()
    }
  },
  methods: {
    trim (str) {
      return str == null ? '' : str.replace(/^\s+/, '').replace(/\s+$/, '')
    },
    enterNewChildTitle (e) {
      if (e.keyCode === 13) {
        this.addNew()
      } else {
        this.newChildErrorMesage = ''
      }
    },
    addNew () {
      let title = StringUtils.trim(this.newChildTitle)
      if (this.$refs.newChildInput.valid) {
        if (title === '') {
          this.newChildErrorMesage = '请输入名称'
          return
        }
        this.children.push({
          id: this.childrenId++,
          title: this.newChildTitle,
          completed: false
        })
        this.newChildTitle = ''
      }
    },
    deleteChildren (item) {
      this.children.splice(this.children.indexOf(item), 1)
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.item.time = new Date(this.time)
        this.item.children = []
        for (let i = 0; i < this.children.length; i++) {
          let c = { ...this.children[i] }
          delete c.id
          this.item.children.push(c)
        }

        this.$store.commit('editTodoItem', this.item)
        return true
      }
      return false
    },
    move (index, step) {
      let child = this.children[index]
      this.$set(this.children, index, this.children[index + step])
      this.$set(this.children, index + step, child)
    }
  }
}
</script>

<style lang="scss">
.EditDetail_root_1234 {
  .EditDetail_timeSelector_1234 {
    margin-top: 10px;

    .vdatetime {
      font-size: 20px;
      border-bottom: 1px solid #949494;
      margin: 4px;
      margin-right: 0px;
      width: 100%;

      input {
        width: 100%;
      }
    }
  }

  .v-list__tile {
    height: 80px;

    .v-input {
      width: 100%;
    }
  }
}

.EditDetail_clickable:hover {
  cursor: pointer;
}
</style>
