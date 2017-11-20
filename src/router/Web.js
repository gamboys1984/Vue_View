import ueDemo from '@/Page/ueDemo'
import Detail from '@/Page/Help&FAQ/Detail'
import maintain from '../Page/Help&FAQ/maintain.vue'
import add from '../Page/Help&FAQ/add.vue'
import edit from '../Page/Help&FAQ/edit.vue'
import FAQList from '../Page/Help&FAQ/FAQList.vue'
import WebPage from '@/components/Share/WebPage'
import ComputeTools from '../Page/Tools/ComputeTools.vue'
import ExpectedSettings from '../Page/Tools/ExpectedSettings.vue'
import SetProblemPaths from '../Page/Help&FAQ/SetProblemPaths.vue'

import StickerLabel from '../Page/PhotoVideoEdit/StickerLabel.vue'
import SetStickerLabel from '../Page/PhotoVideoEdit/SetStickerLabel.vue'
import StickerPicture from '../Page/PhotoVideoEdit/StickerPicture.vue'
import SetStickerPicture from '../Page/PhotoVideoEdit/SetStickerPicture.vue'
import PictureFrame from '../Page/PhotoVideoEdit/PictureFrame.vue'
import SetPictureFrame from '../Page/PhotoVideoEdit/SetPictureFrame.vue'
import GrowUpBabyList from '../Page/Tools/GrowUpBabyList.vue'
import AddGrowUpBaby from '../Page/Tools/AddGrowUpBaby.vue'
import UpdateGrowUpBaby from '../Page/Tools/UpdateGrowUpBaby.vue'
import QingGongList from '../Page/Tools/QingGongList.vue'

export default [{
  path: process.env.ROUTER_PATH + '/static',
  component: WebPage,
  children: [{
    path: '/',
    name: 'ue',
    component: ueDemo
  },
  {
    path: 'FAQList',
    name: 'FAQList',
    component: FAQList
  },
  {
    path: 'Detail',
    name: 'Detail',
    component: Detail
  },
  // #后台维护
  {
    path: 'maintain',
    name: 'maintain',
    component: maintain
  },
  {
    path: 'add',
    name: 'add',
    component: add
  },
  {
    path: 'edit',
    name: 'edit',
    component: edit
  },
  {
    path: 'SetProblemPaths',
    name: 'SetProblemPaths',
    component: SetProblemPaths
  },
  // #后台维护

  // #预产期计算
  {
    path: 'ComputeTools',
    name: 'ComputeTools',
    component: ComputeTools
  },
  {
    path: 'AddES',
    name: 'AddES',
    component: ExpectedSettings
  },
  {
    path: 'EditES/:id',
    name: 'EditES',
    component: ExpectedSettings
  },
  // #预产期计算
//宝宝发育指标
  {
    path: 'GrowUpBabyList',
    name: 'GrowUpBabyList',
    component: GrowUpBabyList
  },
  {
    path: 'AddGrowUpBaby',
    name: 'AddGrowUpBaby',
    component: AddGrowUpBaby
  },
  {
    path: 'UpdateGrowUpBaby',
    name: 'UpdateGrowUpBaby',
    component: UpdateGrowUpBaby
  },
//宝宝发育指标
//清宫表
  {
    path: 'QingGongList',
    name: 'QingGongList',
    component: QingGongList
  },
//清宫表
  {
    path: 'StickerLabel',
    name: 'StickerLabel',
    component: StickerLabel
  },
  {
    path: 'AddSL',
    component: SetStickerLabel
  },
  {
    path: 'EditSL/:id',
    component: SetStickerLabel
  },
  {
    path: 'StickerPicture',
    name: 'StickerPicture',
    component: StickerPicture
  },
  {
    path: 'AddSP',
    name: 'AddSP',
    component: SetStickerPicture
  },
  {
    path: 'EditSP/:id',
    name: 'EditSP',
    component: SetStickerPicture
  },
  {
    path: 'PictureFrame',
    name: 'PictureFrame',
    component: PictureFrame
  },
  {
    path: 'AddPF',
    name: 'AddPF',
    component: SetPictureFrame
  },
  {
    path: 'EditPF/:id',
    name: 'EditPF',
    component: SetPictureFrame
  }]

}]
