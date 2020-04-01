import {
    dataListOne
} from "../data/air_trans_one_filtered.js";

import {
    dataListTwo
} from "../data/air_trans_two.js";

import {
    dataListZero
} from "../data/air_trans_zero.js";


displayAirlineSankey('zero_trans_sankey_svg_area', dataListZero);
displayAirlineSankey('one_trans_sankey_svg_area', dataListOne);
displayAirlineSankey('two_trans_sankey_svg_area', dataListTwo);


function displayAirlineSankey(elementId, dataList) {
    let myChart = echarts.init(document.getElementById(elementId));
    myChart.showLoading();

    myChart.hideLoading();

    let option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'sankey',
                top: '6%',
                bottom: '6%',
                right: '8%',
                left: '6%',
                data: dataList.nodes,
                links: dataList.links,
                focusNodeAdjacency: 'allEdges',
                nodeAlign:'left',
                // orient: 'vertical',
                // nodeGap: 18,
                // layoutIterations: 100,
                // itemStyle: {
                //     borderWidth: 1,
                //     borderColor: '#aaa'
                // },
                lineStyle: {
                    color: 'source',
                    curveness: 0.5,
                    opacity: 0.5
                },
                label: {
                    show: true,
                    // position: 'bottom',
                    // rotate: -90,
                    // fontSize: 21,
                    align: 'left',
                    // offset: [10, 0],
                    formatter: function (params) {
                        // console.log(params);
                        return params.name.split('(')[0];
                    }
                }
            }
        ]
    };

    myChart.setOption(option);
    // });
}