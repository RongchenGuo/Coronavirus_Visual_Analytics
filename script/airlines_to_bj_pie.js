import {
    proportionList
} from '../data/air_trans_aggr.js';

displayAirlinePie();

function displayAirlinePie() {
    let myChart = echarts.init(document.getElementById('airline_overview_pie_svg_area'));

    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 3,
            bottom: 3
            // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series : [
            {
                name: 'Airlines to Beijing, China',
                type: 'pie',
                radius: ['40%', '70%'],
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}: {d}%'
                },
                // radius: '55%',
                // roseType: 'angle',
                data: proportionList
            }
        ]
    };

    myChart.setOption(option);

}