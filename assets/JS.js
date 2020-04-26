$(function () {
    var $day =$("div.dateChoose ul");

//日期、星期
    for(var i=7;i>0;i--){
        var today = new Date(new Date().setDate(new Date().getDate() +7- i)).format("MM/dd");
        var week;
        if(i>new Date().getDay()){
            week = "星期" + "日一二三四五六".charAt(new Date().getDay()-i+7);
        } else {
            week = "星期" + "日一二三四五六".charAt(new Date().getDay()-i);
        }
        // console.log(today)
        console.log(week)
        if(i===0){
            $day.append(' <li class="selected">\n' +
                '                        <div>'+week+'</div>\n' +
                '                        <div class="day">'+today+'</div>\n' +
                '                    </li>')
        }else{
            $day.append(' <li>\n' +
                '                        <div>'+week+'</div>\n' +
                '                        <div class="day">'+today+'</div>\n' +
                '                    </li>')
        }
    }


//选中日期
    var $tab_day =$("div.dateChoose ul li");
    $tab_day.click(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        var index =  $(this).index();  // 获取当前点击的<li>元素 在 全部li元素中的索引。
        $("div.info > .pick")       //选取子节点。不选取子节点的话，会引起错误。如果里面还有div
            .eq(index).show()   //显示 <li>元素对应的<div>元素
            .siblings().hide(); //隐藏其它几个同辈的<div>元素
    });
//选中时间段
    var $tab_time =$("div.box");
    var total = 0;
    $tab_time.click(function () {
        if($(this).hasClass("ban")===false){
            var val = Number($(this).attr("value"));
            if($(this).hasClass("selectedInfo")===true){
                $(this).removeClass("selectedInfo")
                total -= val;
            }else{
                $(this).addClass("selectedInfo");
                total += val;
            }
        }else {
            alert("不可选，请选择其他时间段")
        }
//合计金额
//         console.log(total);
        $("#total").text(total)

//统计时间段个数
        var num = $(".selectedInfo").length;
        // console.log(num)
        $("#num").text(num)

    });


//日历弹窗
    var minDate = new Date(new Date().setDate(new Date().getDate() - 1)).format("yyyy-MM-dd");
    var maxDate = new Date(new Date().setDate(new Date().getDate() + 6)).format("yyyy-MM-dd");
    // console.log(minDate);
    // console.log(maxDate);
    var pickDate;
    $("#inline-calendar").calendar({
        minDate: minDate,
        maxDate: maxDate,
        dateFormat:'mm/dd',
// 点击日期跳转对应选项卡
        onChange:function (p, values, displayValues){
            pickDate = values[0];
            console.log(pickDate);
            for(j=0;j<7;j++){
                var p_text = $tab_day.eq(j).find(".day").text()
                if(p_text == pickDate){
                    console.log(true)
                    $tab_day.eq(j).addClass("selected").siblings().removeClass("selected");
                    $("div.info > .pick")       //选取子节点。不选取子节点的话，会引起错误。如果里面还有div
                        .eq(j).show()   //显示 <li>元素对应的<div>元素
                        .siblings().hide(); //隐藏其它几个同辈的<div>元素
                }

            }

        }
    });
});


//日期封装方法format
Date.prototype.format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
