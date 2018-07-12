<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.tagName')" v-model="tagQueryDto.tagName">
      </el-input>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="dialogFormVisible = true">新增</el-button>
    </div>

    <el-table :key='tableKey' :data="list"  border fit highlight-current-row stripe
              style="width: 100%;min-height:150%; margin-bottom: 1%">
      <el-table-column align="center" :label="$t('table.tagId')" fit>
        <template slot-scope="scope">
          <span>{{scope.row.tagId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300" :label="$t('table.tagName')" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.tagName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="170px" align="center" :label="$t('table.createTime')">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | moment("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="新增标签" :visible.sync="dialogFormVisible">
      <el-form :model="tagDto">
        <el-form-item label="分类名称" >
          <el-input v-model="tagDto.tagName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTag">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { queryTagList, saveTag } from '@/api/article/tag'

  export default {
    name: 'complexTable',
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        tagQueryDto: {},
        tagDto: {
          tagName: ''
        },
        tagId: '',
        tagName: '',
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
      this.queryTagList()
    },
    methods: {
      queryTagList() {
        this.listLoading = true
        queryTagList(this.tagQueryDto).then(response => {
          this.list = response.data

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      saveTag() {
        this.listLoading = true
        saveTag(this.tagDto).then(response => {
          this.$message('success')
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
          this.dialogFormVisible = false
          this.queryTagList()
        })
      },
      handleFilter() {
        this.queryTagList(this.tagQueryDto)
      }
    }
  }
</script>
