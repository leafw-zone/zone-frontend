<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 1%; margin-top: 2%">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="accountLogQueryDto.accountId">
      </el-input>
      <el-select v-model="accountLogQueryDto.changeType" clearable placeholder="消费类型">
        <el-option
          v-for="item in optionsChangeType"
          :key="item.changeTypeId"
          :label="item.changeTypeName"
          :value="item.changeTypeId">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleEdit">编辑</el-button>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">删除</el-button>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="dialogFormVisible = true">新增</el-button>

    </div>

    <el-table :key='tableKey' :data="list"  border  highlight-current-row stripe ref="multipleTable"
              style="width: 100%;min-height:150%" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" >
      </el-table-column>
      <el-table-column align="center" :label="$t('table.accountName')"  >
        <template slot-scope="scope">
          <span>{{scope.row.accountName}}</span>
        </template>
      </el-table-column>
      <el-table-column  :label="$t('table.changeType')" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.changeTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column  :label="$t('table.consumeType')" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.consumeTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.changeAmount')" >
        <template slot-scope="scope">
          <span>{{scope.row.changeAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.changeTime')" >
        <template slot-scope="scope">
          <span>{{ scope.row.changeTime | moment("YYYY-MM-DD")}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="accountLogQueryDto.pageNumber" :page-sizes="[10,20,30, 50]" :page-size="accountLogQueryDto.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="新增记录" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="accountLogDto"  label-width="80px" >
        <el-form-item label="账户类型">
          <el-select v-model="accountLogDto.accountId" clearable placeholder="账户">
            <el-option
              v-for="item in optionsA"
              :key="item.accountId"
              :label="item.accountName"
              :value="item.accountId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变化类型">
          <el-select v-model="accountLogDto.changeType" clearable placeholder="变化类型">
            <el-option
              v-for="item in optionsChangeType"
              :key="item.changeTypeId"
              :label="item.changeTypeName"
              :value="item.changeTypeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消费类型">
          <el-select v-model="accountLogDto.consumeType" clearable placeholder="消费类型">
            <el-option
              v-for="item in optionsConsumeType"
              :key="item.consumeId"
              :label="item.consumeName"
              :value="item.consumeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" >
          <el-input v-model="accountLogDto.changeAmount" auto-complete="off" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="时间" >
          <el-date-picker
            v-model="accountLogDto.changeTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAccountLog">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { queryAccountLogList, saveAccountLog } from '@/api/account/accountLog'
  import { queryAccountMainList } from '@/api/account/accountMain'
  import { queryConsumeConfigList } from '@/api/account/consumeType'
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item.vue'

  export default {
    components: {
      ElFormItem
    },
    name: 'complexTable',
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        accountLogQueryDto: {
          accountId: '',
          changeType: '',
          pageNumber: 1,
          pageSize: 20
        },
        accountLogDto: {
          accountId: '',
          changeType: '',
          changeAmount: '',
          changeTime: ''
        },
        optionsA: [],
        optionsConsumeType: [],
        optionsChangeType: [
          {
            changeTypeId: '1',
            changeTypeName: '收入'
          },
          {
            changeTypeId: '2',
            changeTypeName: '支出'
          }
        ],

        accountId: '',
        accountName: '',
        changeType: '',
        changeTypeName: '',
        consumeTypeId: '',
        changeAmount: '',
        consumeType: '',
        consumeTypeName: '',
        changeTime: '',
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        downloadLoading: false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    created() {
      this.queryAccountLogList()
    },
    mounted: function() {
      this.queryAccountMainList()
      this.queryConsumeConfigList()
    },
    methods: {
      queryAccountLogList() {
        this.listLoading = true
        queryAccountLogList(this.accountLogQueryDto).then(response => {
          this.list = response.data.list
          this.total = response.data.list.length
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      saveAccountLog() {
        this.listLoading = true
        saveAccountLog(this.accountLogDto).then(response => {
          this.$message('success')
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
          this.dialogFormVisible = false
          this.queryAccountLogList()
        })
      },
      queryAccountMainList() {
        const accountMainQueryDto = {}
        queryAccountMainList(accountMainQueryDto).then(response => {
          this.optionsA = response.data
        })
      },
      queryConsumeConfigList() {
        const consumeConfigQueryDto = {}
        queryConsumeConfigList(consumeConfigQueryDto).then(response => {
          this.optionsConsumeType = response.data
        })
      },
      handleFilter() {
        this.accountLogQueryDto.pageNumber = 1
        this.queryAccountLogList(this.accountLogQueryDto)
      },
      handleEdit() {
        console.log('---')
      },
      handleSizeChange(val) {
        this.accountLogQueryDto.pageSize = val
        this.queryAccountLogList(this.accountLogQueryDto)
      },
      handleCurrentChange(val) {
        this.accountLogQueryDto.pageNumber = val
        this.queryAccountLogList(this.accountLogQueryDto)
      },
      handleSelectionChange(val) {
        this.articleDto = val
      }
    }
  }
</script>
