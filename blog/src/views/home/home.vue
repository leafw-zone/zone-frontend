<template>
  <div class="app-container">
    <div style="width: 1080px;height: 25px">
      <img src='@/assets/header-line.png' style="width: 100%;height: 100%"/>
    </div>

    <div class="articleContent">
      <div id="articles">
        <div class="tags animated fadeIn">
          <!--<div class="tagFlex">-->
            <!--<button-->
              <!--v-for="(tag, index) in allTags"-->
              <!--v-bind:class="{activeBtn: selectIndex === index}"-->
              <!--v-on:click="switchTag({value: tag, page: 1}, index, tag)"-->
            <!--&gt;-->
              <!--<span>{{tag}}</span>-->
            <!--</button>-->
          <!--</div>-->
        </div>
        <div v-for="(article, index) in list" id="article" class="animated fadeIn">
          <h2>{{article.title}}</h2>
          <time><i class="iconfont icon-shijian"></i>{{article.postTime | moment("YYYY-MM-DD HH:mm:ss")}}</time>
          <span class="articleTag"><i class="iconfont icon-label"></i>{{article.tagsName}}</span>
          <p>{{article.summary}}</p>
          <a @click="readArticle(index)">Continue reading</a>
          <!--<router-link :to="{name: 'article', params: {id: article.id, index: index, page: pageNumber}, hash: '#article'}" tag="button" exact>-->
            <!--<span>Continue reading</span>-->
          <!--</router-link>-->
        </div>
        <!--<p v-if="!loadMore" v-show="!noMore" class="noMore animated fadeIn">下拉加载更多</p>-->
        <!--<p v-if="noMore" class="noMore animated fadeIn">已经到底了，别扯了</p>-->
      </div>
      <!--<spinner v-show="loadMore" class="spinner"></spinner>-->
    </div>



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
        article: {
          articleId: '',
          title: '',
          categories: '',
          tags: '',
          postTime: '',
          summary: ''
        },
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
      },
      readArticle(index) {
        const articleDto = this.list[index]
        console.log(articleDto)
        this.$router.push({
          path: '/article',
          name: 'article',
          component: () => import('@/views/article/article'),
          redirect: 'noredirect',
          params: {
            articleDto: articleDto
          }
        })
      }
    }
  }
</script>
