//自调用函数
(function() {
    // 1、页面一加载就要知道页面宽度计算
    var setFont = function() {
        // 因为要定义变量可能和别的变量相互冲突，污染，所有用自调用函数
        var html = document.documentElement; // 获取html
        // 获取宽度
        var width = html.clientWidth;

        // 判断
        if (width < 1024) width = 1024
        if (width > 1920) width = 1920
            // 设置html的基准值
        var fontSize = width / 80 + 'px';
        // 设置给html
        html.style.fontSize = fontSize;
    }
    setFont();
    // 2、页面改变的时候也需要设置
    // 尺寸改变事件
    window.onresize = function() {
        setFont();
    }
})();
//证件情况
(function() {
    myAjax('http://www.cmtthz.com/DataV/v1', "post", {
        id: 2
    }).then(res => {
        var date = res.zhengshu
        var ensum = 0;
        var dengg = 0;
        var diang = 0;
        date.forEach(function(v) { //其中的v就是数组的值 123456
            ensum += parseInt(v.engineer);
            dengg += parseInt(v.dengg);
            diang += parseInt(v.diang);
        })
        var html = ""
        date.forEach(function(sj) {
            html += `<div class="row"><span class="col">${sj.dis}</span><span class="col zh">
        ${sj.engineer}</span><span class="col dg">${sj.diang}</span>
        <span class="col gd">${sj.dengg}</span></div>`;
        })
        $('.marquee').html(html);
        $('.inner .content .cs span:eq(1)').text(ensum)
        $('.inner .content .cs span:eq(2)').text(dengg)
        $('.inner .content .cs span:eq(3)').text(diang)
            //事件委托

        $('.monitor').on('click', ' a', function() {
            //点击当前的a 加类名 active  他的兄弟删除类名
            $(this).addClass('active').siblings().removeClass('active');
            //获取一一对应的下标 
            var index = $(this).index();
            //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
            $('.content').eq(index).show().siblings('.content').hide();
        });
        //滚动
        //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
        //      然后动画向上滚动，滚动到一半重新开始滚动
        //因为选取的是两个marquee  所以要遍历

        $('.monitor .marquee').each(function(index, dom) {
            //将每个 的所有子级都复制一遍
            var rows = $(dom).children().clone();
            //再将新的到的加入原来的
            $(dom).append(rows);
        });

    });

})();
//人均装机
(function() {
    myAjax('http://www.cmtthz.com/DataV/v1', "post", {
        id: 2
    }).then(res => {
        var myechart = echarts.init($('.pie')[0]);
        option = {
            // 控制提示
            tooltip: {
                // 非轴图形，使用item的意思是放到数据对应图形上触发提示
                trigger: 'item',
                // 格式化提示内容：
                // a 代表图表名称 b 代表数据名称 c 代表数据  d代表  当前数据/总数据的比例
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // 控制图表
            series: [{
                // 图表名称
                name: '地区',
                // 图表类型
                type: 'pie',
                // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
                // 百分比基于  图表DOM容器的半径
                radius: ['10%', '70%'],
                // 图表中心位置 left 50%  top 50% 距离图表DOM容器
                center: ['50%', '50%'],
                // 半径模式，另外一种是 area 面积模式
                roseType: 'radius',
                // 数据集 value 数据的值 name 数据的名称
                data: res.zhuangji,
                // data: [
                //     { value: 20, name: '江干' },
                //     { value: 5, name: '余杭' },
                //     { value: 15, name: '拱墅' },
                //     { value: 25, name: '武林' },
                //     { value: 20, name: '钱塘' },
                //     { value: 35, name: '西湖' },
                //     { value: 30, name: '萧山' },
                //     { value: 40, name: '桐庐' },
                //     { value: 40, name: '滨江' },
                //     { value: 40, name: '富阳' },
                //     { value: 40, name: '淳安' },
                //     { value: 40, name: '建德' },
                //     { value: 40, name: '临安' },
                // ],
                //文字调整
                label: {
                    fontSize: 10
                },
                //引导线
                labelLine: {
                    length: 8,
                    length2: 10
                }
            }],
            color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
        };
        myechart.setOption(option);
    });

})();
// 人均劳效
(function() {
    myAjax('http://www.cmtthz.com/DataV/v1', "post", {
        id: 2
    }).then(res => {
        // 中间省略的数据  准备三项
        var item = {
            name: '',
            value: 1200,
            // 柱子颜色
            itemStyle: {
                color: '#254065'
            },
            // 鼠标经过柱子颜色
            emphasis: {
                itemStyle: {
                    color: '#254065'
                }
            },
            // 工具提示隐藏
            tooltip: {
                extraCssText: 'opacity:0'
            }
        };
        option = {
            // 工具提示
            tooltip: {
                // 触发类型  经过轴触发axis  经过轴触发item
                trigger: 'item',
                // 轴触发提示才有效
                axisPointer: {
                    // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                    type: 'shadow'
                }
            },
            // 图表边界控制
            grid: {
                // 距离 上右下左 的距离
                left: '0',
                right: '3%',
                bottom: '3%',
                top: '5%',
                // 大小是否包含文本【类似于boxsizing】
                containLabel: true,
                //显示边框
                show: true,
                //边框颜色
                borderColor: 'rgba(0, 240, 255, 0.3)'
            },
            // 控制x轴
            xAxis: [{
                // 使用类目，必须有data属性
                type: 'category',
                // 使用 data 中的数据设为刻度文字
                data: [res.laoxiao[0].dis,
                    res.laoxiao[1].dis,
                    res.laoxiao[2].dis,
                    res.laoxiao[3].dis,
                    res.laoxiao[4].dis,
                    res.laoxiao[5].dis,
                    res.laoxiao[6].dis,
                    res.laoxiao[7].dis,
                    res.laoxiao[8].dis,
                    res.laoxiao[9].dis,
                    res.laoxiao[10].dis,
                    res.laoxiao[11].dis,
                    res.laoxiao[12].dis
                ],
                // 刻度设置
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                }
            }],
            // 控制y轴
            yAxis: [{
                // 使用数据的值设为刻度文字
                type: 'value',
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
            }],
            // 控制x轴
            series: [

                {
                    // series配置
                    // 颜色
                    itemStyle: {
                        // 提供的工具函数生成渐变颜色
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0, 0, 0, 1, [
                                { offset: 0, color: '#00fffb' }, // 0 起始颜色
                                { offset: 1, color: '#0061ce' } // 1 结束颜色
                            ]
                        )
                    },
                    // 图表数据名称
                    name: '用户统计',
                    // 图表类型
                    type: 'bar',
                    // 柱子宽度
                    barWidth: '60%',
                    // 数据
                    data: [res.laoxiao[0].laox,
                        res.laoxiao[1].laox,
                        res.laoxiao[2].laox,
                        res.laoxiao[3].laox,
                        res.laoxiao[4].laox,
                        res.laoxiao[5].laox,
                        res.laoxiao[6].laox,
                        res.laoxiao[7].laox,
                        res.laoxiao[8].laox,
                        res.laoxiao[9].laox,
                        res.laoxiao[10].laox,
                        res.laoxiao[11].laox,
                        res.laoxiao[12].laox
                    ],
                }
            ]
        };
        var myechart = echarts.init($('.users .bar')[0]);
        myechart.setOption(option);
    });



})();
//新进
(function() {
    myAjax('http://www.cmtthz.com/DataV/v1', 'post', ).then(res => {
        // console.log(res.renshi[0].day365.entry)
        var data = res.renshi
        $('.order .item h4:eq(0)').text(res.renshi[0].day365.entry);
        $('.order .item h4:eq(1)').text(res.renshi[0].day365.quit);
        //点击事件
        $('.order').on('click', '.filter a', function() {
            //点击之后加类名
            $(this).addClass('active').siblings().removeClass('active');
            // 先获取点击a的 data-key自定义属性
            const key = $(this).attr('data-key');
            // console.log(key);
            var dis = data[$(this).index()][key]
            console.log();
            //获取自定义属性
            // data{}==>data.shuxing data['shuxing]
            // dis = data[a];
            $('.order .item h4:eq(0)').text(dis.entry);
            $('.order .item h4:eq(1)').text(dis.quit);
        });
    })

    //定时器
    var index = 0;
    var aclick = $('.order a');
    setInterval(function() {
        index++;
        if (index > 3) {
            index = 0;
        }
        //每san秒调用点击事件
        aclick.eq(index).click();
    }, 3000);
})();
//车辆费用
(function() {
    myAjax(' http://www.cmtthz.com/DataV/cheliang', "post", {
        id: 2
    }).then(res => {
        // console.log(res);
        // console.log(Object.keys(res[0].data[0].data));
        var option = {
            //鼠标提示工具
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                // 类目类型                                  
                type: 'category',
                // x轴刻度文字                                  
                data: Object.keys(res[0].data[0].data),
                axisTick: {
                    show: false //去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd' //文本颜色
                },
                axisLine: {
                    show: false //去除轴线  
                },
                boundaryGap: false //去除轴内间距
            },
            yAxis: {
                // 数据作为刻度文字                                  
                type: 'value',
                axisTick: {
                    show: false //去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd' //文本颜色
                },
                axisLine: {
                    show: false //去除轴线  
                },
                boundaryGap: false //去除轴内间距
            },
            //图例组件
            legend: {
                textStyle: {
                    color: '#4c9bfd' // 图例文字颜色

                },
                right: '10%' //距离右边10%
            },
            // 设置网格样式
            grid: {
                show: true, // 显示边框
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                borderColor: '#012f4a', // 边框颜色
                containLabel: true // 包含刻度文字在内
            },
            series: [{
                    name: '租聘费',
                    // 数据                                  
                    data: Object.values(res[0].data[0].data),
                    // 图表类型                                  
                    type: 'line',
                    // 圆滑连接                                  
                    smooth: true,
                    itemStyle: {
                        color: '#00f2f1' // 线颜色
                    }
                },
                {
                    name: '油费',
                    // 数据                                  
                    data: Object.values(res[0].data[1].data),
                    // 图表类型                                  
                    type: 'line',
                    // 圆滑连接                                  
                    smooth: true,
                    itemStyle: {
                        color: '#ed3f35' // 线颜色
                    }
                },
                {
                    name: '维修费',
                    // 数据                                  
                    data: Object.values(res[0].data[2].data),
                    // 图表类型                                  
                    type: 'line',
                    // 圆滑连接                                  
                    smooth: true,
                    itemStyle: {
                        color: '#ffffff' // 线颜色
                    }
                }
            ]
        };
        var myechart = echarts.init($('.line')[0]);
        myechart.setOption(option);

        //点击效果
        var data = {
            year: [
                Object.values(res[0].data[0].data),
                Object.values(res[0].data[1].data),
                Object.values(res[0].data[2].data)
            ],
            quarter: [
                Object.values(res[1].data[0].data),
                Object.values(res[1].data[1].data),
                Object.values(res[1].data[2].data)
            ],
            month: [
                Object.values(res[2].data[0].data),
                Object.values(res[2].data[1].data),
                Object.values(res[2].data[2].data)
            ],
            week: [
                Object.values(res[3].data[0].data),
                Object.values(res[3].data[1].data),
                Object.values(res[3].data[2].data)
            ]
        }
        $('.sales ').on('click', '.caption a', function() {
            $(this).addClass('active').siblings('a').removeClass('active');
            //option series   data
            //获取自定义属性值
            var key = $(this).attr('data-type');
            //取出对应的值
            key = data[key];
            //将值设置到 图表中
            option.series[0].data = key[0];
            option.series[1].data = key[1];
            option.series[2].data = key[2];
            //再次调用才能在页面显示
            myechart.setOption(option);
        });
        //定时器
        var index = 0;
        var timer = setInterval(function() {
            index++;
            if (index > 4) {
                index = 0;
            };
            $('.sales .caption a').eq(index).click();
        }, 2000);
    })

})();
//车辆情况
(function() {
    myAjax('http://www.cmtthz.com/DataV/v1', "post", {
        id: 2
    }).then(res => {
        // console.log(res.cheliang);
        var data = res.cheliang
        $('.inner').on('mouseenter', '.sup li', function(e) {
            $(this).addClass('active').siblings().removeClass('active');
            //获取随机的值  sort方法 是给数组排序 a-b是从小到大
            //.5-随机0-1的数 可能为正可能为负 排序就会随机
            const index = $(this).index();
            var html = '';
            data[index]['data'].forEach(function(item) {
                html += `<li><span>${item.name}</span><span>${item.num}</span></li>`;
            });
            //渲染
            $('.nb').html(html);

            //滚动
            //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
            //      然后动画向上滚动，滚动到一半重新开始滚动
            //因为选取的是两个marquee  所以要遍历
            $('.province .nb').each(function(index, dom) {
                //将每个 的所有子级都复制一遍
                var rows = $(dom).children().clone();
                //再将新的到的加入原来的
                $(dom).append(rows);
            });
        });

        $('.province .sup li').eq(0).mouseenter();
        var index = 0;
        setInterval(() => {
            index++;
            if (index > 2) {
                index = 0;
            }
            $('.sup li').eq(index).mouseenter();
        }, 10000);
    })
})();
//渲染
(function() {
    myAjax('http://www.cmtthz.com/DataV/v1', "post", {
        id: 2
    }).then(res => {
        $('.overview .item h4:eq(0)').text(res.tongji["家客一线"]);
        $('.overview .item h4:eq(1)').text(res.tongji["集客一线"]);
        $('.overview .item h4:eq(2)').text(res.tongji["抢修支撑"]);
        $('.overview .item h4:eq(3)').text(res.tongji["后台人员"]);
        $('.inner .data .item h4:eq(0)').text(res.tongji["当月装机"]);
        $('.inner .data .item h4:eq(1)').text(res.tongji["市人均装机"] & "个");
        $('.channel .inner .data h4:eq(0)').text(res.tongji["熔接机"]);
        $('.channel .inner .data h4:eq(1)').text(res.tongji["OTDR"]);
        $('.channel .inner .data h4:eq(2)').text(res.tongji["综合测试仪"]);
        $('.channel .inner .data h4:eq(3)').text(res.tongji["标签打印机"]);
        $('.channel .inner .data h4:eq(4)').text(res.tongji["安全帽"]);
        $('.channel .inner .data h4:eq(5)').text(res.tongji["警报器"]);
        $('.channel .inner .data h4:eq(6)').text(res.tongji["安全带"]);
        $('.channel .inner .data h4:eq(7)').text(res.tongji["脚扣"]);
        $('.top .all p:eq(0)').text(res.tongji["车辆总数"]);
        $('.top .province .sup span:eq(1)').text(res.tongji["公司自有车辆"]);
        $('.top .province .sup span:eq(3)').text(res.tongji["员工自备"]);
        $('.top .province .sup span:eq(5)').text(res.tongji["租聘"]);
    });
})();
//跳转
(function () {
    setTimeout(() => {
        // clearInterval(timer);
        window.location.href = "http://www.whbqd.xyz/bigdatazp"
    }, 30000);
})();
(function() {
    var date = ["临安",
        "余杭",
        "富阳",
        "建德",
        "拱墅",
        "桐庐",
        "武林",
        "江干",
        "淳安",
        "滨江",
        "萧山",
        "西湖",
        "钱塘"
    ]
    var currentImage = 1; //从1开始
    var imageCount = 13; //图片总数
    myAjax('http://www.cmtthz.com/DataV/v1', "post", {
        id: 2
    }).then(res => {
        // res
        console.log(res)
        $('.map #app span:eq(0)').text(res.zhengshu[0].dis);
        $('.map #app span:eq(1)').text(res.zhengshu[0].diang);
        $('.map #app span:eq(2)').text(res.zhengshu[0].engineer);
        $('.map #app span:eq(3)').text(res.zhengshu[0].dengg);
        $('.map #app span:eq(4)').text(res.cheliang[0].data[0].num);
        setInterval(() => {
            selfChangeImage(res);
        }, 2000);

    });

    // window.onload = function () {
    //     //2秒后执行
    //     setTimeout(selfChangeImage, 2000);
    // };

    //自动循环
    function selfChangeImage(res, sa) {
        if (currentImage < imageCount) {
            currentImage++;
        } else if (currentImage = imageCount) {
            currentImage = 1;
        }
        sa = currentImage - 1
        var zhen = res.zhengshu
        var chel = res.cheliang[0].data
        var i = 0
        zhen.forEach(function(e) {
            // console.log("4545", e, i)
            if (e.dis == date[sa]) {
                $('.map #app span:eq(0)').text(res.zhengshu[i].dis);
                $('.map #app span:eq(1)').text(res.zhengshu[i].diang);
                $('.map #app span:eq(2)').text(res.zhengshu[i].engineer);
                $('.map #app span:eq(3)').text(res.zhengshu[i].dengg);

                console.log("25", i, res.zhengshu[i].dis, res.zhengshu[i].diang, res.zhengshu[i].engineer, res.zhengshu[i].dengg)
            }
            i += 1
        })
        i = 0
        var zj = 0
        chel.forEach(function(e) {
            console.log("4545", e, i)
            if (e.name == date[sa]) {
                $('.map #app span:eq(4)').text(res.cheliang[0].data[i].num);
                console.log("30", res.cheliang[0].data[i].num, i)
                zj = 1
            } else if (zj == 0) {
                $('.map #app span:eq(4)').text("0");
                console.log("31", "0")
            }
            i += 1
        })

        // console.log("25", i, date[i], res.zhengshu[i].diang, res.zhengshu[i].engineer, res.zhengshu[i].dengg, res.cheliang[0].data[i].num)

        var imageObj = document.getElementById("testImage");
        imageObj.src = "./image/" + currentImage + ".png";
        // $('.map #app span:eq(0)').text(date[sa]);
        // $('.map #app span:eq(1)').text(res.zhengshu[sa].diang);
        // $('.map #app span:eq(2)').text(res.zhengshu[sa].engineer);
        // $('.map #app span:eq(3)').text(res.zhengshu[sa].dengg);
        // $('.map #app span:eq(4)').text(res.cheliang[0].data[sa].num);



    }

})()