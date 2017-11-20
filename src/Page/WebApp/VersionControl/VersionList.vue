<template>
    <div>
        <mobile-full-list v-show="!IsShow" :class="{emptyStyle:EmptyStyle}" :DataSource="DataSource" :DataRule="DataRule" :LinkTo="LinkTo" v-text="EmptyValue">
        </mobile-full-list>
        <MobileLoading v-show="IsShow" :word="DataF"></MobileLoading>
    </div>
</template>
<script scoped>
import MobileFullList from "@/components/Share/WebApp/MobileFullList";
import MobileLoading from "@/components/Share/MobileLoading";
import api from "@/fetch/api";
export default {
  name: "VersionList",
  components: {
    MobileFullList,
    MobileLoading
  },
  data: function() {
    return {
      DataSource: [],
      DataRule: {
        title: "AlteredDisplayNum",
        timeTS: "CreateTS",
        id: "VersionNum",
        param: "DisplayNum"
      },
      LinkTo: process.env.ROUTER_PATH + "/mobile/VersionDetail",
      EmptyValue: "",
      EmptyStyle: false,
      IsShow: true,
      DataF: "正在加载…"
    };
  },
  methods: {
    getdata: function() {
      var content =
        '{     "sc": "001cfe2fe7044aa691d4e6eff9bfb56c",     "sv": "b9b8e7a0c64f431fb55bb69ac5ec00c1",     "SchemaIosUrl": "' +
        this.$store.state.Version.SCHEMAIOS_URL +
        '" }';
      api.GetVersionList(content).then(
        res => {
          if (res.Result != 1) {
            alert(res.ReturnValue);
            this.EmptyValue = "暂无版本更新内容";
            this.EmptyStyle = true;
          } else {
            this.DataSource = res.ReturnValue.sort(function(a, b) {
              return b.VersionNum - a.VersionNum;
            });
          }
          this.IsShow = false;
          this.AlterData();
        },
        error => {
          alert(error);
          this.VerContent = "暂无版本更新内容";
          this.IsShow = false;
        }
      );
    },
    AlterData: function() {
      for (var Value of this.DataSource) {
        Value.AlteredDisplayNum = Value.DisplayNum + " 更新内容";
      }
    }
  },
  activated: function() {
    this.$emit("GetTitle", "版本介绍");
  },
  mounted: function() {
    this.getdata();
  }
};
</script>
<style scoped>
.emptyStyle {
  margin: 5px;
}
</style>
