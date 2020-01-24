<template>
  <div class="staff">
    <!-- <el-form-item label="所任职位"> -->
    <treeselect
      v-model="optionId"
      :multiple="true"
      :options="newarr"
      :disable-branch-nodes="true"
      search-nested
      placeholder="Select your favourite(s)..."
      @input="getPositionID"
    />
    <p class="result">{{ optionId }}</p>
    <!-- </el-form-item> -->
  </div>
</template>

<script>
import * as searchApi from '@/api/search'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AppoinLimited',
  components: {
    Treeselect
  },
  props: {
    userInfoData: {
      type: Object,
      default() {
        return {}
      }
    },
    row: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tab: '',
      isShow: false,
      listPersonal: '',
      value: '',
      Treevalue: [],
      optionId: [],
      zNode: [],
      newarr: [],
      channelId: '',
      readonly: true,
      AllChannelData: [],
      Userform: {
        username: '',
        password: '',
        name: '',
        mobile: '',
        positions: '',
        status: '',
        channelId: ''
      }
    }
  },
  computed: {
    // ...mapState({
    //   AddOptionSelect: state => state.AddOptionSelect.all
    // })
  },
  watch: {
    data() {
      // 数据更新后重新渲染
      // this.transfromData()
    }
  },
  created() {
    // console.log(this.userInfo, 'ceshi')
  },
  beforecreated() {
  },
  mounted() {
    this.AddPositions()
    this.getAllChannel()
    // this.optionId = this.AddOptionSelect.positions
    console.log(this.$parent.row, 'vuex获取')
    // this.userInfo.positions.map((item, index) => {
    // })
  },
  // eslint-disable-next-line no-dupe-keys
  methods: {
    getPositionID() {
      this.$emit('PositionID', this.optionId)
    },
    listToTreeWithLevel(list, parentId, level) {
      var out = []
      for (var node of list) {
        if (node.parentId == parentId) {
          node.level = level
          node.id = node.departmentId
          node.label = node.departmentName
          var children = this.listToTreeWithLevel(list, node.departmentId, level + 1)
          node.children = children
          if (node.positions.length) {
            node.positions.map(item => {
              node.children.push({
                ...item,
                departmentId: item.positionId,
                departmentName: item.positionName,
                id: item.positionId,
                label: item.positionName,
                level: level + 1,
                levels: level + 1,
                parentId: node.departmentId
              })
            })
            delete node.positions
          }
          out.push(node)
        }
      }
      return out
    },
    goback() {
      // eslint-disable-next-line no-sequences
      this.isShow = false,
      this.$emit('gohome', { li: '返回成功' })
    },
    changeID(val) {
      this.optionsId = val
      console.log(`部门ID: ${val}`)
    },
    // 渠道
    getAllChannel() {
      searchApi.AllChannel()
        .then(res => {
          this.AllChannelData = res.data
        }).catch(error => {
          console.log(error)
        })
    },
    // 所任职位下拉框
    AddPositions() {
      searchApi.AllPosition()
        .then(res => {
          this.l = res.data
          // console.log(res.data, '%%%%%^^^^&&')
          // const data = this.toEleTreeData(res.data)
          this.newarr = this.listToTreeWithLevel(res.data, 0, 1)
          // console.log(this.newarr, '999')
        }).catch(error => {
          console.log(error)
        })
    },

    toTab(index) {
      debugger
      this.tab = index
      this.isShow = !this.isShow
      console.log(this.tab)
    }

  }
}
</script>
<style lang="scss" scoped>
.staff {
  // width: 98%;
  // border: 1px solid #b6e0d8;
  // height:630px;
  border-radius: 5px;
  // padding-bottom:20px;
}
>>> .vue-treeselect__control {
    // width: 64%;
}
</style>
