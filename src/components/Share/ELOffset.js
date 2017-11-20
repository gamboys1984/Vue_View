import Vue from 'vue'

Vue.directive('offset', {
  inserted: function (el, binding) {
    setOffset(el, binding)
  },
  update: function (el, binding) {
    setOffset(el, binding)
  }
})

function setOffset (el, binding) {
  binding.value.width = el.offsetWidth
  binding.value.height = el.offsetHeight
}
