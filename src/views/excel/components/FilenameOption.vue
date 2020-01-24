<template>
  <div v-show="isShow" class="staff">
    <div class="title">
      <span class="export">职员添加</span>
      <span class="right">
        <a href="#" @click="goback">职员列表</a> /<a href="#">职员添加</a>
      </span>
      <!-- @click="listPersonal='mergeHeader'" -->
    </div>
    <div class="mainexcle">
      <el-form ref="Userform" :model="Userform" label-width="80px" class="form select">
        <el-form-item label="用户">
          <el-input v-model="Userform.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="Userform.password" />
        </el-form-item>
        <el-form-item label="职员姓名">
          <el-input v-model="Userform.name" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="Userform.mobile" />
        </el-form-item>
        <el-form-item label="所任职位">
          <!-- <el-input id="citySel" auto-complete="off" :disabled="true" /> -->
          <!-- <ul id="treeDemo" class="ztree" /> -->
          <!-- <div id="checkTree">
            <div class="tree-box">
              <div class="zTreeDemoBackground left">
                <ul id="treeDemo" class="ztree" />
              </div>
            </div>
          </div> -->
          <treeselect
            v-model="Treevalue"
            :multiple="true"
            :options="newarr"
            :disable-branch-nodes="true"
            search-nested
            placeholder="Select your favourite(s)..."
          />

          <!-- <treeselect-value :value="value" /> -->
          <p class="result">{{ Treevalue }}</p>
        </el-form-item>
        <div style="">
          <el-form-item label="所属部门">
            <depart @sonChange="changeID" />
          </el-form-item>
        </div>
        <el-form-item label="在职状态">
          <el-select v-model="value" placeholder="请选择" @focus="setMinWidthEmpty">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              style=" min-width: 515.388px !important"
            />
          </el-select>
        </el-form-item>
        <!-- <div v-for="obj in l" v-if="obj.level == 1" :key="obj" class="level-one"><a>{{ obj.departmentName }}</a></div> -->

        <el-form-item label="渠道来源">
          <el-select v-model="channelId" placeholder="请选择" @focus="setMinWidthEmpty">
            <el-option
              v-for="item in AllChannelData"
              :key="item.channelId"
              :label="item.channelName"
              :value="item.channelId"
              style=" min-width: 515.388px !important"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="Userform.remarks"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
    </div>

    <div class="truebuton2">
      <div class="truebuton">
        <el-button type="primary" @click="gohome">确认提交</el-button>
      </div>
    </div>
    <!-- <component :is="listPersonal" /> -->
    <!-- <div>
      <keep-alive>
        <mergeHeader v-if="tab===1" />
        <!-- <FilenameOption v-if="tab===2" /> -->
    <!-- </keep-alive>
    </div> -->
  </div>
  </div></template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import * as searchApi from '@/api/search'
import depart from '../staffInformation/depart'
export default {
  name: 'FilenameOption',
  components: {
    depart,
    Treeselect
  },
  data() {
    return {
      tab: '',
      isShow: false,
      listPersonal: '',
      value: '',
      Treevalue: [],
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
      },
      b: [
        {
          id: 7,
          label: '中鹏教育',
          levels: 1,
          parentId: 0,
          level: 1,
          children: [
            {
              id: 10,
              label: 'java开发组1',
              parentId: 7,
              positions: [],
              level: 2,
              children: [
                {
                  id: 13,
                  label: 'java开发1',
                  levels: 3,
                  parentId: 10,
                  children: []
                }
              ]
            },
            {
              id: 11,
              label: '前端开发组1',
              parentId: 7,
              positions: [],
              level: 2,
              children: [
                {
                  id: 16,
                  label: 'web前端',
                  levels: 3,
                  parentId: 10,
                  children: []
                }
              ]
            },
            {
              id: 14,
              label: '架构师',
              parentId: 7,
              positions: [],
              level: 2,
              children: []
            }
          ]
        }
      ],
      options: [{
        value: '0',
        label: '在职'
      }, {
        value: '2',
        label: '离职'
      }, {
        value: '1',
        label: '转岗'
      }, {
        value: '3',
        label: '休假'
      }],
      // zNode: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      setting: {
        check: {
          enable: true, // 使用简单的json数据
          nocheckInherit: false
        },
        	// 数据格式的设置
        data: {
          simpleData: {
            enable: true
          }
        },
        view: {// 展开内容
          dblClickExpand: false
        },
        callback: { // 点击函数
          beforeClick: this.beforeClick,
          onCheck: this.onCheck
        }
      }
    }
  },
  watch: {
    data() {
      // 数据更新后重新渲染
      // this.transfromData()
    }
  },
  created() {

  },
  beforecreated() {
  },
  mounted() {
    this.AddPositions()
    this.getAllChannel()
  },
  // eslint-disable-next-line no-dupe-keys
  methods: {
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
    toEleTreeData(data) {
      // debugger
      // 删除 所有 children,以防止数据出现异常（看情况可以不要这步）
      // data.forEach(function(item) {
      //   delete item.positions
      // })
      // 将数据存储为以 id 为 KEY 的 map 索引数据列
      var map = {}
      data.forEach(function(item) {
        // item.positions = [] // 看情况加这一步
        map[item.departmentId] = item
      })
      console.log(map)
      var DataInfo = []
      data.forEach(function(item) {
        // 如果需要对特定字段进行处理，那么这里做对应处理，会存在一定数据冗余
        // item.label = item.name;
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentId]
        var positions = map[item.positions]
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          DataInfo.push(item)
        }
      })
      return DataInfo
    },
    // console.log(toEleTreeData(data))

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
          // const data = this.toEleTreeData(res.data)
          this.newarr = this.listToTreeWithLevel(res.data, 0, 1)
          // console.log(data, '%%%%%^^^^&&')
          // this.zNode = that.getTree(data)
          // that.getTree(data)
          // console.log(child, '3334445%%%%%@@@@')

          // const result = []
          // const obj = {}
          // obj.label = '作为顶级部门'
          // obj.id = 0
          // obj.children = child

          // result.push(obj)
          // this.zNode = result
        }).catch(error => {
          console.log(error)
        })
    },
    getTree(tree = []) {
      const arr = []
      if (tree.length !== 0) {
        tree.forEach(item => {
          // console.log(JSON.stringify(tree), '++++++++++++++++++++')
          console.log(tree, '测试')
          const obj = {}
          obj.label = item.departmentName
          obj.id = item.departmentId
          if (item.children != null) {
            obj.children = this.getTree(item.children)
            // console.log(item.children, '++++++++++++++++++++')
            for (var i = 0; i < item.children.length; i++) {
              // 1.把options变成children 2.然后添加进去obj
              const obj2 = item.children[i].positions
              // const _ = 'lodash'
              obj2.forEach(item => {
                const obj3 = {}
                obj3.label = item.positionName
                obj3.id = item.positionId
                obj.children.children = Object.assign([], obj3)
              })
            }
          }
          console.log(arr, '@@@@####$8888')
          arr.push(obj)
        })
      }
      return arr
    },
    gohome() {
      this.isShow = false
      // 添加用户
      // getUserAdd() {
      // positions: JSON.stringify(this.Treevalue),
      const form2 = {
        'user': {
          username: this.Userform.username,
          password: this.Userform.password,
          name: this.Userform.name,
          mobile: this.Userform.mobile,
          status: this.value,
          channelId: this.channelId,
          departmentId: this.optionsId,
          remarks: this.Userform.remarks
          // detailId:
        },
        'positions': this.Treevalue
      }
      // this.$store.commit('AddOptionSelect/setPrint',{
      //   positions: this.Treevalue
      // })
      // this.Userform = Object.assign({}, this.row) // 获得所有数据显示在编辑信息模态框里面
      searchApi.UserAdd(form2)
        .then(res => {
          console.log(res, '44444')
          if (res.code === 2000) {
            // alert('添加成功')
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$parent.UserList()
            this.$emit('gohome', form2)
          } else {
            this.$message({
              message: '添加失败！',
              type: 'warning'
            })
            this.$emit('gohome', form2)
          }
        }).catch(error => {
          console.log(error)
          this.$emit('gohome', form2)
        })
    // },
      // this.$router.push({ name: 'Login' })
    },
    toTab(index) {
      debugger
      this.tab = index
      this.isShow = !this.isShow
      console.log(this.tab)
    },
    setMinWidthEmpty(val) {
    // 无数据的情况下，给请选择提示设置最小宽度
      const domEmpty = document.getElementsByClassName('el-select-dropdown__empty')
      if (domEmpty.length > 0) {
        domEmpty[0].style['min-width'] = val.srcElement.clientWidth + 2 + 'px'
      }
    }

  }
}
</script>
<style lang="scss" scoped>
@import '../../../plugins/ztree/css/zTreeStyle/zTreeStyle.css';
// @import '../../../plugins/ztree/css/demo.css';
.staff {
  width: 98%;
  border: 1px solid #b6e0d8;
  // height:630px;
  border-radius: 5px;
  padding-bottom:20px;
}
.title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e3e1e1;
}
.export {
  font-size: 20px;
  margin-left: 5px;
}

.right {
  float: right;
  font-size: 14px;
  color: darkgray;
  margin-right: 10px;
}
#hf {
  color: rgb(66, 184, 231);
  font-size: 14px;
}
.mainexcle {
  width: 100%;
  // height: 70px;
  margin-top: 20px;
  border-bottom: 1px solid #e3e1e1;
}

.truebuton {
  float: right;
  // height:60px;
  line-height: 60px;
  margin-right: 10px;
  margin-top:10px;
  margin-bottom:10px;
  // border: 1px solid red;
}
.truebuton2:after {
  content: "."; /*生成内容作为最后一个元素，至于content里面是什么没有影响*/
  display: block; /*使生成的元素以块级元素显示，占满剩余空间*/
  height: 0; /*避免生成的内容破坏原有空间的高度*/
  clear: both; /*闭合浮动*/
}

.truebuton2 {
  zoom: 1; /*触发IE6/7的haslayout*/
}
.form{
  margin-left:80px;
}
 .select{
      width:90%
}

.el-select {
    margin-top: 10px;
    width: 100%;
}
>>>.el-select-dropdown{
      min-width: 515.388px;
}
.el-tree {
    width: 100%;
}
>>> .el-form-item--medium .el-form-item__content {
    width: 323px;
}

</style>
