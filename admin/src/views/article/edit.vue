<template>
    <el-form label-width="100px" style="margin-left: 3%;margin-top: 4%;margin-right: 5%">
      <el-form-item style="margin-left: -10%">
        <el-input placeholder="标题" style="width: 100%" v-model="articleDto.title"></el-input>
      </el-form-item>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="分类目录">
          <el-select v-model="articleDto.categoriesList" multiple placeholder="请选择">
            <el-option
              v-for="item in optionsA"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" style="margin-left: 2%">
          <el-select v-model="articleDto.tagsList" multiple placeholder="请选择">
            <el-option
              v-for="item in optionsB"
              :key="item.tagId"
              :label="item.tagName"
              :value="item.tagId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否公开" style="margin-left: 2%">
          <el-radio v-model="articleDto.isOpen" label="1">公开</el-radio>
          <el-radio v-model="articleDto.isOpen" label="0">私有</el-radio>
        </el-form-item>
      </el-form>
      <mavon-editor  id="editor" v-model="articleDto.contentMd" ></mavon-editor>
      <el-form-item style="margin-top: 3%; margin-left: -11%">
        <el-button style="margin-left: 10px;" type="success" @click="publish">发布
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
  import { postArticle } from '@/api/article/article'
  import { queryCategoryList } from '@/api/article/category'
  import { queryTagList } from '@/api/article/tag'

  const contentMd = `
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
        optionsA: [],
        optionsB: [],
        articleDto: {
          categoriesList: [],
          tagsList: [],
          isOpen: '',
          title: '',
          contentMd: contentMd,
          articleId: ''
        }
      }
    },
    mounted: function() {
      this.queryCategoryList()
      this.queryTagList()
    },
    created: function() {
      this.initData()
    },
    methods: {
      publish() {
        console.log(this.articleDto)
        postArticle(this.articleDto).then(response => {
          this.$message('success!')
        })
        this.$router.push({
          path: '/article/articleList',
          name: 'articleList',
          component: () => import('@/views/article/articleList'),
          redirect: 'noredirect'
        })
      },
      initData() {
        const articleParam = this.$route.params.articleDto
        if (undefined === this.$route.params.articleDto) {
          return
        }
        this.articleDto.articleId = articleParam.articleId
        this.articleDto.title = articleParam.title
        this.articleDto.contentMd = articleParam.contentMd
        this.articleDto.isOpen = articleParam.isOpen
        this.articleDto.categoriesList = articleParam.categories.split(',')
        this.articleDto.tagsList = articleParam.tags.split(',')
      },
      queryCategoryList() {
        const categoryQueryDto = {}
        queryCategoryList(categoryQueryDto).then(response => {
          this.optionsA = response.data
        })
      },
      queryTagList() {
        const tagQueryDto = {}
        queryTagList(tagQueryDto).then(response => {
          this.optionsB = response.data
        })
      }
    }
  }
</script>
<style>
  #editor {
    margin-left: 0px;
    width: 100%;
    height: 580px;
  }
</style>
