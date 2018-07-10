<template>
    <el-form label-width="100px" style="margin-left: 5%;margin-top: 4%">
      <el-form-item style="margin-left: -10%">
        <el-input placeholder="标题" style="width: 90%" v-model="title"></el-input>
      </el-form-item>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="分类目录">
          <el-select v-model="categories" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" style="margin-left: 2%">
          <el-select v-model="tags" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否公开" style="margin-left: 2%">
          <el-radio v-model="isOpen" label="1">公开</el-radio>
          <el-radio v-model="isOpen" label="0">私有</el-radio>
        </el-form-item>
      </el-form>
      <mavon-editor  id="editor" v-model="content" ></mavon-editor>
      <el-form-item style="margin-top: 3%; margin-left: -11%">
        <el-button style="margin-left: 10px;" type="success">发布
        </el-button>
        <el-button type="warning">草稿</el-button>
      </el-form-item>
    </el-form>

</template>
<script>
  // Local Registration
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item.vue'

  const content = `
* vue
* element
* webpack

## Simplemde
`

  export default {
    name: 'editor',
    components: {
      ElFormItem,
      mavonEditor
    },
    data() {
      return {
        content: content,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        categories: [],
        tags: [],
        isOpen: '',
        title: ''
      }
    }
  }
</script>
<style>
  #editor {
    margin-left: 0px;
    width: 90%;
    height: 580px;
  }
</style>
