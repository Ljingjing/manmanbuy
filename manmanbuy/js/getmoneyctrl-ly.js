$(function () {
    var mmb = new Mmb;
    // 初始化区域滚动
    mmb.initScroll();
    // 调用刷新的列表
    mmb.refurbishList();
    // 调用商品详情页
    mmb.wareDetailed();
    // 调用返回顶部
    mmb.backTop();
});

var Mmb = function () {

};

Mmb.prototype = {

    //  初始化区域滚动
    initScroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            indicators: false, //是否显示滚动条
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    // 刷新列表的方法
    refurbishList: function () {
        var that = this;
        // 定义一个全局的pageid
        pageid: 1;
        mui.init({
            pullRefresh: {
                container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                //   下拉刷新
                down: {
                    auto: true,
                    contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    callback: function () {
                        setTimeout(function (argument) {
                            // 2. 在下拉刷新的时候请求数据
                            //在下拉发送请求之前要重置page
                            that.pageid = 1
                            $.ajax({
                                url: 'http://localhost:9090/api/getmoneyctrl',
                                beforeSend: function () {
                                    //发送请求之前显示加载中
                                    $('.mask').show();
                                },
                                data: {
                                    pageid: that.pageid
                                },
                                success: function (data) {
                                    //请求成功渲染当前商品列表
                                    // console.log(data);
                                    var html = template('refurbishTmp', data);
                                    // 4. 把页面放到列表的ul里面
                                    $('.product-list').html(html);
                                    // 请求渲染完毕后隐藏加载中效果
                                    $('.mask').hide();
                                    // // 5. 数据渲染完毕要结束下拉刷新
                                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                    //6. 还要重置上拉加载的效果 要放到请求完毕数据渲染完毕才重置
                                    mui('#refreshContainer').pullRefresh().refresh(true);
                                }
                            });
                        }, 500)
                    }
                },
                up: {
                    height: 50, //可选.默认50.触发上拉加载拖动距离
                    contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    callback: function () {
                        setTimeout(function (argument) {
                            // 2. 在下拉刷新的时候请求数据
                            //在下拉发送请求之前要重置page
                            that.pageid++;
                            $.ajax({
                                url: 'http://localhost:9090/api/getmoneyctrl',
                                beforeSend: function () {
                                    //发送请求之前显示加载中
                                    $('.mask').show();
                                },
                                data: {
                                    pageid: that.pageid
                                },
                                success: function (data) {
                                    //请求成功渲染当前商品列表
                                    // console.log(data);

                                    var html = template('refurbishTmp', data);
                                    // 4. 把页面放到列表的ul里面
                                    $('.product-list').append(html);
                                    // 请求渲染完毕后隐藏加载中效果
                                    $('.mask').hide();
                                    // 数据渲染后要结束上拉加载更多
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                    if (that.pageid > 15) {
                                        // 没有数据就提示没有数据了

                                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    }
                                }
                            });
                        }, 500)
                    }
                }
            }
        });
    },
    // 点击商品跳转到商品详情页
    wareDetailed: function () {
        // 给每一个li里面的a添加点击事件
        $('.product-list').on('tap', '.mui-table-view-cell', function () {
            // console.log(this);
            // 获取商品的id
            var sort = $(this).data('productid')
            // console.log(sort);
            location.href = "productDetail.html?productid=" + sort
        })
    },
    //返回顶部按钮
    backTop: function () {

        var scrollToTopBox = document.getElementById('back-to-top');
        //返回按钮tap
        scrollToTopBox.addEventListener('tap', function (e) {
            e.stopPropagation();
            mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 1000); //滚动到顶部
        });
    }
}