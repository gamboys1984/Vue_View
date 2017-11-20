<template>
  <mt-button type="primary">
    primary</mt-button>
</template>
<script>
import MtButton from '@/components/Mint/button'

export default {
  components: {
    MtButton
  },
  methods: {
    onValuesChange: function () {

    }
  },
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    };
  }
}
</script>
