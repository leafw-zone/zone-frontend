<template>
  <div id="editor" style="margin-top: 5%; margin-left: 2%" >
    <el-form  label-width="100px" >
      <el-form-item style="margin-left: -12%">
        <el-input placeholder="标题"></el-input>
      </el-form-item>

    <mavon-editor  v-model="content" ></mavon-editor>
      <el-form-item style="margin-top: 10px; margin-left: -11%">
    <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
    </el-button>
    <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  // Local Registration
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";

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
        content: content
      }
    }
  }
</script>
<style>
  #editor {
    margin: auto;
    width: 80%;
    height: 580px;
  }
</style>
