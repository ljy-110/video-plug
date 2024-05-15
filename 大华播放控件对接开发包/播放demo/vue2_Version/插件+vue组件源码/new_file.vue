initMap(){
          var myEcharts = echarts.init(document.getElementById("box"));
          var option = {
            title: {

            },
            tooltip: {
                trigger: 'item', 
                backgroundColor: "#588ED5",
                formatter: '地区：{b}<br/>value：{c}'
            },
            visualMap: {
              show: true,
              type: 'piecewise',
              calculable: true,
              showLabel: true,
              itemSymbol: 'rect',
              left: 20,
              top: 20,
              itemWidth: 20,
              itemHeight: 6,
              inRange: {
                color: ['#F1F5FF','#DEE9FF', '#C1D6FF', '#6195FF', '#3377FF']
              },
              padding: 0,
              pieces: [
                { min: 1000, label: '>1000', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { min: 750, max: 1000,label: '750~1000', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { min: 500, max: 750,label: '500-700', symbol: 'rect' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { min: 250, max: 500, label: '250-500', symbol: 'rect' },
                { min: 0, max: 250, label: '0-250', symbol: 'rect' },
                // { min: 0, max: 0, label: '无数据', symbol: 'rect' }
              ],
              
              align: "left",
              itemGap: 5,
              textStyle: {
                color: '#000'
              },
            },
            // geo: [
            //   {
            //     zlevel: 2,
            //     map: this.areaMap.areaName,
            //     roam: true,
            //     zoom: 1.2,
            //     silent: true,
            //     animation: false,
            //     left: "center",
            //     top: "center",
            //     label: {
            //       show: true,
            //       color: "#5176ab",
            //       fontSize: 14
            //     },
            //     itemStyle: {
            //       color: "#04275F",
            //       borderColor: "#294C82",
            //       borderWidth: 1.5,
            //     }
            //   },
            // ],
            series: [
              // {
              //   type: "scatter",
              //   zlevel: 10,
              //   coordinateSystem: "geo",
              //   symbolSize: 20,
              //   large: false,
              //   // data: that.searchVal == '' ? that.projectMapData : that.selectProject,
              //   label: {
              //     normal: {
              //       show: false,
              //       position: 'bottom',
              //       textStyle: {
              //         color: '#F1F5FF',
              //         fontSize: 14
              //       },
              //       formatter: function (params) {
              //         return params.name
              //       }
              //     }
              //   }
              // },
              {
                name: '地图',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle: {
                  // show:false,
                  normal: {
                    areaColor: '#F1F5FF',
                    label: {
                      show: true,//是否显示标签
                      textStyle: {
                        color: '#515E78'
                      }
                    }
                  },
                  zoom: 1.5, 
                  emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                    areaColor: '#F1F5FF',
                    label: { show: true }
                  }
                },
                top: "4%",
                data: [
                    { name: '北京', value: 0 },
                    { name: '天津', value: 0 },
                    { name: '上海', value: 0 },
                    { name: '重庆', value: 0 },
                    { name: '河北', value: 0 },
                    { name: '河南', value: 0 },
                    { name: '云南', value: 0 },
                    { name: '辽宁', value: 0 },
                    { name: '黑龙江', value: 10 },
                    { name: '湖南', value: 0 },
                    { name: '安徽', value: 0 },
                    { name: '山东', value: 400 },
                    { name: '新疆', value: 0 },
                    { name: '江苏', value: 0 },
                    { name: '浙江', value: 0 },
                    { name: '江西', value: 0 },
                    { name: '湖北', value: 0 },
                    { name: '广西', value: 1500 },
                    { name: '甘肃', value: 0 },
                    { name: '山西', value: 0 },
                    { name: '内蒙古', value: 0 },
                    { name: '陕西', value: 0 },
                    { name: '吉林', value: 0 },
                    { name: '福建', value: 0 },
                    { name: '贵州', value: 0 },
                    { name: '广东', value: 0 },
                    { name: '青海', value: 0 },
                    { name: '西藏', value: 10000 },
                    { name: '四川', value: 0 },
                    { name: '宁夏', value: 0 },
                    { name: '海南', value: 0 },
                    { name: '台湾', value: 0 },
                    { name: '香港', value: 0 },
                    { name: '澳门', value: 0 }
                  ]
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myEcharts.setOption(option,true);
          myEcharts.on('georoam', function (params) {
            // console.log(params)
            var option = mapChart.getOption();//获得option对象
            if (option.geo[0].zoom > 20) {
              option.series[0].label.show = true;
              mapChart.setOption(option);
            } else {
              option.series[0].label.show = false;
              mapChart.setOption(option);
            }
          });
        }