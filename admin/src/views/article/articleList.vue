<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 1%; margin-top: 2%">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="articleQueryDto.title">
      </el-input>
      <el-select v-model="articleQueryDto.categories" clearable placeholder="分类目录">
        <el-option
          v-for="item in optionsA"
          :key="item.categoryId"
          :label="item.categoryName"
          :value="item.categoryId">
        </el-option>
      </el-select>
      <el-select v-model="articleQueryDto.tags" clearable placeholder="标签">
        <el-option
          v-for="item in optionsB"
          :key="item.tagId"
          :label="item.tagName"
          :value="item.tagId">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleEdit">编辑</el-button>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">删除</el-button>


    </div>

    <el-table :key='tableKey' :data="list"  border  highlight-current-row stripe ref="multipleTable"
              style="width: 100%;min-height:150%" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" >
      </el-table-column>
      <el-table-column align="center" :label="$t('table.articleId')"  >
        <template slot-scope="scope">
          <span>{{scope.row.articleId}}</span>
        </template>
      </el-table-column>
      <el-table-column  :label="$t('table.title')" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.categories')" >
        <template slot-scope="scope">
          <span>{{scope.row.categoriesName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.tags')" >
        <template slot-scope="scope">
          <span>{{scope.row.tagsName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.postTime')" >
        <template slot-scope="scope">
          <span>{{ scope.row.postTime | moment("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="articleQueryDto.pageNumber" :page-sizes="[10,20,30, 50]" :page-size="articleQueryDto.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { queryArticleList } from '@/api/article/article'
  import { queryCategoryList } from '@/api/article/category'
  import { queryTagList } from '@/api/article/tag'

  export default {
    name: 'complexTable',
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        articleQueryDto: {
          pageNumber: 1,
          pageSize: 20
        },
        optionsA: [],
        optionsB: [],
        articleId: '',
        title: '',
        categories: '',
        tags: '',
        postTime: '',
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        downloadLoading: false,
        articleDto: {}
      }
    },
    created() {
      this.queryArticleList()
    },
    mounted: function() {
      this.queryCategoryList()
      this.queryTagList()
    },
    methods: {
      queryArticleList() {
        this.listLoading = true
        queryArticleList(this.articleQueryDto).then(response => {
          this.list = response.data.list
          this.total = response.data.list.length

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleFilter() {
        this.articleQueryDto.pageNumber = 1
        this.queryArticleList(this.articleQueryDto)
      },
      handleEdit() {
        const articleDto = this.articleDto
        console.log(articleDto[0])
        this.$router.push({
          path: '/article/edit',
          name: 'edit',
          component: () => import('@/views/article/edit'),
          redirect: 'noredirect',
          params: {
            articleDto: articleDto[0]
          }
        })
      },
      handleSizeChange(val) {
        this.articleQueryDto.pageSize = val
        this.queryArticleList(this.articleQueryDto)
      },
      handleCurrentChange(val) {
        this.articleQueryDto.pageNumber = val
        this.queryArticleList(this.articleQueryDto)
      },
      handleSelectionChange(val) {
        this.articleDto = val
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
