<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="articleQueryDto.title">
      </el-input>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list"  border fit highlight-current-row stripe
              style="width: 100%;min-height:150%; margin-bottom: 1%">
      <el-table-column align="center" :label="$t('table.articleId')" fit>
        <template slot-scope="scope">
          <span>{{scope.row.articleId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300" :label="$t('table.title')" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column fit align="center" :label="$t('table.categories')">
        <template slot-scope="scope">
          <span>{{scope.row.categories}}</span>
        </template>
      </el-table-column>
      <el-table-column fit align="center" :label="$t('table.tags')">
        <template slot-scope="scope">
          <span>{{scope.row.tags}}</span>
        </template>
      </el-table-column>
      <el-table-column width="170px" align="center" :label="$t('table.postTime')">
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
        downloadLoading: false
      }
    },
    created() {
      this.queryArticleList()
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
      handleSizeChange(val) {
        this.articleQueryDto.pageSize = val
        this.queryArticleList(this.articleQueryDto)
      },
      handleCurrentChange(val) {
        this.articleQueryDto.pageNumber = val
        this.queryArticleList(this.articleQueryDto)
      }
    }
  }
</script>
