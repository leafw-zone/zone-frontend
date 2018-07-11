<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="userQueryDto.userName">
      </el-input>
      <!--<el-select clearable style="width: 90px" class="filter-item" v-model="userQueryDto.importance" :placeholder="$t('table.importance')">-->
        <!--<el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="userQueryDto.sort">-->
        <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
    </div>

    <el-table :key='tableKey' :data="list"  border fit highlight-current-row
              style="width: 100%;min-height:1000px;">
      <el-table-column align="center" :label="$t('table.userId')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300" :label="$t('table.userName')">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" :label="$t('table.email')">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.birthday | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>

      <!--<el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">-->
        <!--<template slot-scope="scope">-->
          <!--<span style='color:red;'>{{scope.row.reviewer}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column width="80px" :label="$t('table.importance')">-->
        <!--<template slot-scope="scope">-->
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" :label="$t('table.readings')" width="95">-->
        <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
          <!--<span v-else>0</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column class-name="status-col" :label="$t('table.status')" width="100">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>-->
          <!--<el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">{{$t('table.publish')}}-->
          <!--</el-button>-->
          <!--<el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.draft')}}-->
          <!--</el-button>-->
          <!--<el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{$t('table.delete')}}-->
          <!--</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="userQueryDto.pageNumber" :page-sizes="[10,20,30, 50]" :page-size="userQueryDto.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">-->
      <!--<el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>-->
        <!--<el-form-item :label="$t('table.createTime')" prop="timestamp">-->
          <!--<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.userId')" prop="title">-->
          <!--<el-input v-model="temp.title"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.status')">-->
          <!--<el-select class="filter-item" v-model="temp.status" placeholder="Please select">-->
            <!--<el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.importance')">-->
          <!--<el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='3'></el-rate>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.remark')">-->
          <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">-->
          <!--</el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>-->
        <!--<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>-->
        <!--<el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { queryUserList } from '@/api/userlist'
  import { parseTime } from '@/utils'

  export default {
    name: 'complexTable',
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        userQueryDto: {
          pageNumber: 1,
          pageSize: 20,
          importance: undefined,
          title: undefined,
          type: undefined
        },
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
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
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.queryUserList()
    },
    methods: {
      queryUserList() {
        this.listLoading = true
        queryUserList(this.userQueryDto).then(response => {
          this.list = response.data.list
          this.total = response.data.totalPage

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleFilter() {
        this.userQueryDto.pageNumber = 1
        this.queryUserList(this.userQueryDto)
      },
      handleSizeChange(val) {
        this.userQueryDto.pageSize = val
        this.queryUserList(this.userQueryDto)
      },
      handleCurrentChange(val) {
        this.userQueryDto.pageNumber = val
        this.queryUserList(this.userQueryDto)
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
