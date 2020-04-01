import {
    resumptionList
} from '../data/china_resumption.js';


displayChinaResumptionMap();


function displayChinaResumptionMap() {
    let myChart = echarts.init(document.getElementById('resumption_map_svg_area'));
    myChart.showLoading();
    $.get('json/china-cities.json', function (cityJson) {
        myChart.hideLoading();
        echarts.registerMap('china-cities', cityJson, {});
        displayMapResumption(myChart);
    });

    let myChart2 = echarts.init(document.getElementById('shortage_map_svg_area'));
    myChart2.showLoading();
    $.get('json/china-cities.json', function (cityJson) {
        myChart2.hideLoading();
        echarts.registerMap('china-cities', cityJson, {});
        displayMapShortage(myChart2);
    });

    initSideCard();
    initBottomResumption();
    initBottomShortage();
}


function displayMapResumption(chart) {
    let data_resumption = {
        name: "China Map of Labor Resumption",
        formatter: function(params) {
            if (params.data) {
                return pinyin.getFullChars(params.name) + "<br>" + "2020 Resumption Index" + " : " + params.value;
            }
        },
        visualMap: {
            // itemWidth: 12,
            // itemHeight: 100,
            right: '5%',
            bottom: '13%',
            min: 0,
            max: 1,
            calculable: true,
            inRange: {
                color: ['#FF0000', "#DDDDDD"] //颜色
            },
            textStyle: {
                // color: '#fff'
            },
        },
        data: resumptionList.fugong_daily,
    };
    chart.setOption(baseOption(data_resumption));
}


function displayMapShortage(chart) {
    let data_lack = {
        name: "China Map of Labor Absence",
        formatter: function(params) {
            if (params.data) {
                return pinyin.getFullChars(params.name) + "<br>" + "2020 Shortage Index" + " : " + params.value;
            }
        },
        visualMap: {
            // itemWidth: 12,
            // itemHeight: 100,
            right: '5%',
            bottom: '13%',
            min: 0,
            max: 1,
            calculable: true,
            inRange: {
                color: ['#c9e2b3', '#6f42c1']
                // color: ['#00FF33','#d94e5d'], //颜色
            },
            textStyle: {
                // color: '#fff'
            },
        },
        data: resumptionList.quegong_daily,
    };
    chart.setOption(baseOption(data_lack));
}


function initSideCard() {
    let citiesLeft = [];
    let valuesLeft = [];
    resumptionList.sideCard.in.forEach((item)=>{
        citiesLeft.push(item.city);
        valuesLeft.push(item.value);
    });
    let dataLeft = {
        name: "Population Inflow Ranking",
        keyList: citiesLeft,
        valueList: valuesLeft,
    };

    let citiesRight = [];
    let valuesRight = [];
    resumptionList.sideCard.out.forEach((item)=>{
        citiesRight.push(item.city);
        valuesRight.push(item.value);
    });
    let dataRight = {
        name: "Population Outflow Ranking",
        keyList: citiesRight,
        valueList: valuesRight,
    };

    let myLeftCard = echarts.init(document.getElementById('resumption_left_card_svg_area'));
    let myRightCard = echarts.init(document.getElementById('resumption_right_card_svg_area'));
    myLeftCard.setOption(sideOption(dataLeft));
    myRightCard.setOption(sideOption(dataRight));
}


function initBottomResumption() {
    let option = {
        grid: {
            top: '15%',
            left: '9%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: true
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,
            data: resumptionList.fugong_bottomCard.dateList,
        }],

        yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
                margin: 20,
            },
            axisTick: {
                show: false,
            },
        }],
        series: {
            name: "GDP-Weighted National Work Resumption Index",
            type: 'line',
            showAllSymbol: false,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
                normal: {
                    color: "#6c50f3",
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5,
                },
            },
            label: {
                show: true,
                position: 'top',
                // textStyle: {
                //     color: '#fff',
                // }
            },
            itemStyle: {
                color: "#6c50f3",
                // borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(108,80,243,0.3)'
                    },
                        {
                            offset: 1,
                            color: 'rgba(108,80,243,0)'
                        }
                    ], false),
                    shadowColor: 'rgba(108,80,243, 0.9)',
                    shadowBlur: 20
                }
            },
            data: resumptionList.fugong_bottomCard.value,
        },
    };
    let myBottomCard = echarts.init(document.getElementById('resumption_bottom_card_svg_area'));
    myBottomCard.setOption(option);
}


function initBottomShortage() {
    let option = {
        grid: {
            top: '15%',
            left: '9%',
            right: '3%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: true
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,
            data: resumptionList.quegong_bottomCard.dateList,
        }],

        yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
                margin: 20,
            },
            axisTick: {
                show: false,
            },
        }],
        series: {
            name: "GDP-Weighted National Labor Shortage Index",
            type: 'line',
            showAllSymbol: false,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
                normal: {
                    color: "#6c50f3",
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5,
                },
            },
            label: {
                show: true,
                position: 'top',
            },
            itemStyle: {
                color: "#6c50f3",
                // borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(108,80,243,0.3)'
                    },
                        {
                            offset: 1,
                            color: 'rgba(108,80,243,0)'
                        }
                    ], false),
                    shadowColor: 'rgba(108,80,243, 0.9)',
                    shadowBlur: 20
                }
            },
            data: resumptionList.quegong_bottomCard.value,
        },
    };
    let myBottomCard = echarts.init(document.getElementById('shortage_bottom_card_svg_area'));
    myBottomCard.setOption(option);
}


function baseOption(data) {
    let option = {
        timeline: {
            data: [],
            axisType: 'category',
            autoPlay: true,
            playInterval: 1500,
            left: '5%',
            right: '5%',
            bottom: '3%',
            width: '90%',
            label: {
                normal: {
                    textStyle: {
                        // color: '#fff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                },
            },
            tooltip: {
                formatter: function(params) {
                    return params.name;
                },
                show: true,
            },
            symbolSize: 10,
            lineStyle: {
                // color: '#fff'
            },
            checkpointStyle: {
                borderColor: '#777',
                borderWidth: 2
            },
            controlStyle: {
                showNextBtn: true,
                showPrevBtn: true,
                normal: {
                    color: '#666',
                    borderColor: '#666'
                },
                emphasis: {
                    color: '#aaa',
                    borderColor: '#aaa'
                }
            },
        },
        baseOption: {
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            tooltip: {
                formatter: data.formatter,
            },
            geo: {
                map: "china-cities",
                roam: true,
                top: '9%',
                left: '7%',
                scaleLimit: {
                    min: 1,
                    max: 10,
                },
                zoom: 1.0,
                label: {
                    normal: {
                        show: false,
                        fontSize: 10,
                        color: "black",
                    },
                },
                // background: "#aaa",
                emphasis: {
                    label: {
                        //控制对应地区的汉字
                        show: false,
                    },
                    itemStyle: {
                        areaColor: '#888',
                    },
                },
            },
        },
        options: []
    };
    let dateList = [];
    let cityList = data.data.city;
    for(let i = 0; i < data.data.data.length; i++) {
        let temp = data.data.data[i].value;
        dateList.push(data.data.data[i].date);
        let daily = [];
        for(let i = 0; i < temp.length; i++) {
            daily.push({
                name: cityList[i],
                value: temp[i]
            })
        }
        option.options.push({
            // backgroundColor: "rgb(11, 53, 102)", //背景颜色
            visualMap: [ data.visualMap ],

            series: {
                name: "复工率",
                type: "map",
                geoIndex: 0,
                data: daily,
            }
        });
    }
    option.timeline.data = dateList;
    option.timeline.currentIndex = dateList.length-1;
    return option;
}


function sideOption(data) {
    let myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
    return {
        grid: {
            left: '5%',
            top: '15%',
            right: '18%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            show: false,
        },
        yAxis: {
            axisTick: 'none',
            axisLine: 'none',
            offset: '0',
            axisLabel: {
                textStyle: {
                    color: '#000000',
                    fontSize: '10',
                }
            },
            data: data.keyList.map(item => pinyin.getFullChars(item)),
        },
        series: {
            name: 'bar',
            type: 'bar',
            yAxisIndex: 0,
            data: data.valueList,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        // color: '#ffffff',
                        fontSize: '10',
                    }
                }
            },
            barWidth: 12,
            itemStyle: {
                normal: {
                    color: function(params) {
                        return myColor[params.dataIndex % myColor.length]
                    },
                }
            },
            z: 2
        },
    };
}