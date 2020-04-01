import {
    worldInfectiousList
} from '../data/world_infectious_rate.js';

displayEuroInfectiousMap();

function displayEuroInfectiousMap() {
    let myChart = echarts.init(document.getElementById('infectious_euro_map_svg_area'));
    myChart.showLoading();

    $.get('json/europe.geoJson', function (euroJson) {
        myChart.hideLoading();

        echarts.registerMap('europe', euroJson, {});
        let option = {
            // title: {
            //     text: 'Coronavirus Outbreak Severity Prediction in European Countries',
            //     subtext: 'Beihang BIGSCity Interest Group',
            //     left: 'center'
            // },
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
                itemHeight: 80,
                right: '1px',
                bottom: '1px',
                min: -0.1, //0.3,
                max: 1.1, //1.9,
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
            // toolbox: {
            //     show: true,
            //     //orient: 'vertical',
            //     left: '10%',
            //     top: '10%',
            //     // feature: {
            //     //     // dataView: {readOnly: false},
            //     //     // restore: {},
            //     //     saveAsImage: {pixelRatio: 5}
            //     // }
            // },
            series: [
                {
                    name: 'Outbreak Severity',
                    // label: {
                    //     show: true
                    // },
                    type: 'map',
                    roam: true,
                    left: '7%',
                    map: 'europe',
                    // zoom: 1.06,
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
                    data: worldInfectiousList
                }
            ]
        };

        myChart.setOption(option);
    });
}