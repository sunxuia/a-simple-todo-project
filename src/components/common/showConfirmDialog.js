import Vue from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'

const DialogConstructor = Vue.extend({
  props: {
    dialogProps: Object,
    confirmHandler: {
      type: Function,
      default: () => true
    },
    content: Object
  },
  component: {
    ConfirmDialog
  },
  methods: {
    onConfirm() {
      if (this.confirmHandler()) {
        this.$destroy()
      }
    },
    onCancel() {
      this.$destroy()
    }
  },
  render(h) {
    return h(ConfirmDialog, {
      props: this.dialogProps,
      on: {
        confirm: this.onConfirm,
        cancel: this.onCancel
      }
    }, [
      this.content
    ])
  },
  destroyed() {
    document.body.removeChild(this.$el)
  }
})

export default Vue => {
  Vue.prototype.$showConfirmDialog = function ({
    content,
    confirmHandler,
    ...dialogProps
  }) {
    let ele = new DialogConstructor({
      propsData: {
        content,
        confirmHandler,
        dialogProps
      }
    })
    ele.$mount()
    document.body.appendChild(ele.$el)
  }
}
