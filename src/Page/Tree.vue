<template>
  <!-- <tree :data="quespaths" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"></tree> -->
</template>
<script>

export default {
  data(){
      return {
          quespaths: [
        {
          value: 'bianji',
          label: '日记本管理',
          children: [
            {
              value: 'tianjia',
              label: '日记本添加',
              children: [
                {
                  value: 'shibai',
                  label: '添加失败'
                },
                {
                  value: 'wuxiao',
                  label: '添加无效'
                }
              ]
            },
            {
              value: 'shanchu',
              label: '日记本删除',
              children: [
                {
                  value: 'shibai',
                  label: '删除失败'
                }
              ]
            },
            {
              value: 'bianji',
              label: '日记本编辑'
            }]
        },
        {
          value: 'mamishuo',
          label: '妈咪说'
        },
        {
          value: 'quanzipengyou',
          label: '圈子朋友'
        }
      ]

      }
  }
}
</script>
