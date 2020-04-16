import {
    worldInfectiousList
} from '../data/world_infectious_rate.js';

displayWorldInfectiousMap();

function displayWorldInfectiousMap() {
    let myChart = echarts.init(document.getElementById('infectious_world_map_svg_area'));

    let option = {
        // title: {
        //     text: 'World-wide Coronavirus Outbreak Severity Prediction',
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
            itemHeight: 100,
            left: '5px',
            bottom: '1px',
            min: 0.3, //0.3,
            max: 2.65, //1.9,
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
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: '5%',
            top: '5%',
            feature: {
                // dataView: {readOnly: false},
                // restore: {},
                saveAsImage: {pixelRatio: 5}
            }
        },
        // backgroundColor: '#6495ED',
        series: [
            {
                name: 'Cumulative Incidence Rate',
                // label: {
                //     show: true
                // },
                type: 'map',
                mapType: 'world',
                zoom: 1.05,
                roam: true,
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

}