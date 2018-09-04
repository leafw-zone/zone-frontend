<template>
  <div id="myChart" >
  </div>

</template>

<script>
  import { sumAccountLog } from '@/api/account/accountLog'

  // 引入基本模板
  const echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        accountLogQueryDto: {},
        seriesData: [],
        listLoading: true,
        option: {
          title: {
            text: '月度账单统计',
            top: 40,
            left: 250
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 180,
            top: 80,
            bottom: 20,
            data: [],
            selected: {}
          },
          series: [
            {
              name: '消费',
              type: 'pie',
              radius: '55%',
              center: ['40%', '50%'],
              data: this.seriesData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]

        }
      }
    },
    mounted() {
      this.queryPieData()
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('myChart'), 'light')
        // 绘制图表
        myChart.setOption({
          title: { text: 'ECharts 入门示例' },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      },
      drawPie() {
        const myChart = echarts.init(document.getElementById('myChart'), 'light')
        myChart.setOption(this.option, true)
      },
      queryPieData() {
        sumAccountLog(this.accountLogQueryDto).then(response => {
          console.log(response.data)
          var data = response.data
          for (let i = 0; i < data.length; i++) {
            this.option.legend.data.push(data[i].consumeTypeName)
            var seriesData = { 'name': data[i].consumeTypeName, 'value': data[i].sumAmount }
            this.seriesData.push(seriesData)
          }
          this.option.series[0].data = this.seriesData
          const myChart = echarts.init(document.getElementById('myChart'), 'light')
          myChart.setOption(this.option, true)
          console.log(this.option)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    }

  }

</script>
<style>
  #myChart {
    width: 800px;
    height: 600px;
    margin-left: 100px;
  }

</style>
