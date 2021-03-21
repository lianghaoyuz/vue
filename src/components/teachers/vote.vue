<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
         <el-card>
<div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
</el-card>
        </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      options:{
    backgroundColor: '#fff',

    title: {
        text: 'score',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#5c5c5c'
        }
    },

    tooltip: {
        trigger: 'item'
    },

    visualMap: {
        show: false,
        min: 0,
       max:20,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: 'score',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: this.info,
            roseType: 'radius',
            label: {
                color: '#5c5c5c'
            },
            labelLine: {
                lineStyle: {
                    color: '#5c5c5c'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
                return Math.random() * 200;
            }
        }
    ]
}
    }
  },
  created(){
    
  },
  async mounted(){
    await this.getinfo()
    this.drawLine()
  },
  methods: {
    async getinfo(){
      const data = await this.$http.get('/score_info')
      this.options.series[0].data = data.data
      console.log(this.options)
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.options)
    }
  }
}

</script>

<style scoped>
div#myChart{
  display: inline-block;
}


.echarts {
  width: 100%;
  height: 100%;
}
.el-card{
  display: flex;
  justify-content: flex-start;
}
.el-card {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>