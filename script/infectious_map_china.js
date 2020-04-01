import {
    chinaInfectiousList
} from '../data/china_infectious_rate.js';

import {
    provList
} from '../data/prov_cumulation.js';

import nameMap from '../text/NameMapProv.js'

displayChinaInfectiousMap();

function displayChinaInfectiousMap() {

    let seriesList = parseChinaInfectiousList();
    let mycharts = echarts.init(document.getElementById('infectious_china_map_svg_area'));

    mycharts.setOption(getMapOption(seriesList));
    // 绑定点击函数
    mycharts.on('click', (params) => {
        if(params.name === "湖北") {
            activeCity("湖北_不含武汉");
        }
        else if (params.name) {
            activeCity(params.name);
        }
    });

    activeCity("湖北_不含武汉");

}


function parseChinaInfectiousList () {
    return chinaInfectiousList.map(function (item) {
        return {"name": item.name, "value": item.value.infect};
    });
}


function getMapOption(dataList) {
    return {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                // console.log(params);
                if (params.name.length === 0) {
                    return
                }
                if (params.data.value) {
                    return nameMap[params.name] + "<br />" + "Cumulative confirmed cases" + " : " + params.data.value;
                } else {
                    return nameMap[params.name] + "Data missing";
                }
            },
        },
        visualMap: [
            {
                itemWidth: 10,
                itemHeight: 80,
                right: '1px',
                bottom: '1px',
                min: 0, //0.3,
                max: 400, //1.9,
                precision: 1,
                inRange: {
                    color: ['#ffffff', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    // color: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695']
                },
                text: ['High', 'Low'],
                // text: ['1350.0', '0.0'],
                calculable: true
            }
        ],
        series: [
            {
                name: 'Outbreak Severity',
                // label: {
                //     show: true
                // },
                left: '10%',
                type: 'map',
                roam: true,
                map: 'china',
                // zoom: 1.06,
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (params) {
                            return nameMap[params.name];
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#ffffff'
                    }
                },
                data: dataList
            }
        ]
    };
}


function activeCity(prov) {

    // let current_city = nameMap[prov];

    let predictCases = provList[prov].data.predict.value;
    let actualCases = provList[prov].data.official_confirmed.value;
    let remainingCases = provList[prov].data.Remain_confirm.value;
    const dateSeries1 = genDateArr(
        provList[prov].data.predict.start_date,
        provList[prov].data.predict.end_date,
        provList[prov].data.predict.value
    );
    const dateSeries2 = genDateArr(
        provList[prov].data.Remain_confirm.start_date,
        provList[prov].data.Remain_confirm.end_date,
        provList[prov].data.Remain_confirm.value
    );
    let optionPredict = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ["Predict", "Actual"],
            orient: 'vertical',
            right: '3%',
            bottom: '20%',
            // x: 'left',
            // y: 'center',
            // textStyle: {
            //     color: '#fff'
            // }
        },
        grid:{
            x:50,
            y:50,
            x2:50,
            y2:50,
            borderWidth:1,
            bottom: '15%',
            left: '19%',
            right: '8%'
        },
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar', 'stack']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false,
            },
            data: dateSeries1,
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#000',
                    width:'2'
                },
                symbol: ['none', 'arrow'],
                symbolSize: [6, 10],
                symbolOffset: [0, 5]
            },
            axisLabel: {
                textStyle: {
                    color: '#000',
                }
            },
        },
        yAxis: {
            type: 'value',
            show: true,
            scale: true,
            splitLine: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#000',
                    width:'2'
                },
                symbol: ['none', 'arrow'],
                symbolSize: [6, 10],
                symbolOffset: [0, 8]
            },
            axisLabel: {
                textStyle: {
                    color: '#000', //坐标轴的具体的颜色
                }
            },
        },
        series: [
            {
                name: "Predict",
                type: 'line',
                data: predictCases,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },
            {
                name: "Actual",
                type: 'line',
                data: actualCases,
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
            },
        ]
    };
    let optionRemaining = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ["Remaining"],
            orient: 'horizontal',
            right: '3%',
            top: '20%'
            // x: 'center',
            // y: 'bottom',
            // textStyle: {
            //     color: '#fff'
            // }
        },
        grid:{
            x:50,
            y:50,
            x2:50,
            y2:50,
            borderWidth:1,
            bottom: '15%',
            left: '19%',
            right: '8%'
        },
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateSeries2,
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#000',
                    width:'2'
                },
                symbol: ['none', 'arrow'],
                symbolSize: [6, 10],
                symbolOffset: [0, 5]
            },
            axisLabel: {
                textStyle: {
                    color: '#000', //坐标轴的具体的颜色
                }
            }
        },
        yAxis: {
            type: 'value',
            show: true,
            scale: true,
            splitLine: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#000',
                    width:'2'
                },
                symbol: ['none', 'arrow'],
                symbolSize: [6, 10],
                symbolOffset: [0, 8]
            },
            axisLabel: {
                textStyle: {
                    color: '#000', //坐标轴的具体的颜色
                }
            },
        },
        series: [
            {
                name: "Remaining Confirmed Cases",
                type: 'line',
                data: remainingCases,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },
        ]
    };
    let tablePredict = echarts.init(document.getElementById('predict_linechart_svg_area'));
    tablePredict.setOption(optionPredict);
    let tableRemaining = echarts.init(document.getElementById('actual_linechart_svg_area'));
    tableRemaining.setOption(optionRemaining);
}


function genDateArr(start, end, arr) {
    const startDate = +new Date(start);
    const endDate = +new Date(end);
    const N = arr.length - 1;
    const step = parseInt((endDate - startDate) / N);
    let res = [];
    for(let i=0; i<arr.length; i+=1) {
        const now = new Date( + i * step + startDate);
        res.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    }
    return res;
}