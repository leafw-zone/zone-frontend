<template>
  <div class="wrapper" id="article" style="margin-left: 90px;margin-right:200px;">
    <div id="content">
      <h1 class="title animated fadeIn" style="text-align: center">{{article.title}}</h1>
      <div class="appendInfo animated fadeIn" style="text-align: center">
        <time>
          {{article.postTime | moment("YYYY-MM-DD HH:mm:ss")}}
        </time>
        <span>
          <i class="iconfont icon-label"></i>
          {{article.tags}}
        </span>
      </div>
      <div class="content animated fadeIn"  v-html="article.contentHtml"></div>
      <span class="splitLine">————————————————————</span>
      <div>
        <span>分享此文章: </span>
        &nbsp;&nbsp;
      </div>
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;
      <img src="http://www.leafw.cn/wp-content/themes/Siren-master/images/sns/wechat.png" style="width: 20px;padding-top: 5px"/>
        &nbsp;
        <img src="http://www.leafw.cn/wp-content/themes/Siren-master/images/sns/qzone.png" style="width: 20px;padding-top: 5px"/>
        &nbsp;
        <img src="http://www.leafw.cn/wp-content/themes/Siren-master/images/sns/sina.png" style="width: 20px;padding-top: 5px"/>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'readArticle',
  data() {
    return {
      article: {
        title: '',
        postTime: '',
        tags: '',
        comment: '',
        contentHtml: ''
      }
    }
  },
  created: function() {
    this.initData()
  },
  methods: {
    initData() {
      const articleParam = this.$route.params.articleDto
      if (undefined === this.$route.params.articleDto) {
        return
      }
      this.article = articleParam
    }
  }
}
</script>
<style>
  h1 {
    font-family: "Microsoft YaHei UI Light";
    color: #404040;
    font-size: 24px;
    font-weight: 300
  }
  p {
    font-family: "Microsoft YaHei UI Light";
    color: #797979;
    line-height: 30px;
    margin-bottom: 1.5em;
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }
  strong {
    font-family: "Miranafont Bold";
    font-weight: 800;
  }
  time {
    font-size: 12px;
    margin: 0;
    color: #888888;
  }
  span {
    font-size: 12px;
    margin: 0;
    color: #888888;
  }
  .splitLine {
    color: #DDDDDD
  }
</style>
