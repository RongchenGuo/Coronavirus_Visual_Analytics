import {
    doubleIndexList
} from '../data/world_double_index_data.js';

displayDoubleIndex();

function displayDoubleIndex() {
    let myChart = echarts.init(document.getElementById('infectious_double_index_svg_area'));
    myChart.showLoading();

    $.get('json/worldmap_s_us_canada_china.json', function (worldJson) {
        myChart.hideLoading();

        echarts.registerMap('worldmap', worldJson, {});
        let option = {
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: function (params) {
                    let value = (params.value + '').split('.');
                    // value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                    return params.seriesName + '<br/>' + params.name + ': ' + value;
                }
            },
            visualMap: {
                itemWidth: 10,
                itemHeight: 100,
                left: '5px',
                bottom: '1px',
                min: 0.0, //0.3,
                max: 3.8, //1.9,
                precision: 1,
                inRange: {
                    color: ['#ffffff', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    // color: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695']
                },
                text: ['High', 'Low'],
                // text: ['1350.0', '0.0'],
                calculable: true
            },
            series: [
                {
                    name: 'Outbreak Tendency Index',
                    // label: {
                    //     show: true
                    // },
                    type: 'map',
                    roam: true,
                    map: 'worldmap',
                    zoom: 1.05,
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#ffffff'
                        }
                    },
                    data: doubleIndexList
                }
            ]
        };

        myChart.setOption(option);
        myChart.on('click', (params) => {
            console.log(params);
        });
    });
}