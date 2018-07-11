<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.categoryName')" v-model="categoryQueryDto.categoryName">
      </el-input>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list"  border fit highlight-current-row stripe
              style="width: 100%;min-height:150%; margin-bottom: 1%">
      <el-table-column align="center" :label="$t('table.categoryId')" fit>
        <template slot-scope="scope">
          <span>{{scope.row.categoryId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300" :label="$t('table.categoryName')" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.categoryName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="170px" align="center" :label="$t('table.createTime')">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | moment("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import { queryCategoryList } from '@/api/article/category'

  export default {
    name: 'complexTable',
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        categoryQueryDto: {},
        categoryId: '',
        categoryName: '',
        createTime: '',
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
      this.queryCategoryList()
    },
    methods: {
      queryCategoryList() {
        this.listLoading = true
        queryCategoryList(this.categoryQueryDto).then(response => {
          this.list = response.data

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleFilter() {
        this.queryCategoryList(this.categoryQueryDto)
      }
    }
  }
</script>
