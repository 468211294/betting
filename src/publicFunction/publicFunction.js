exports.install = function (Vue, options) {
    // 路由跳转方法
    Vue.prototype.skip = function (pageRoute,parms){
        const that=this;
        console.log("打印这个pagRoute",pageRoute)
        that.$router.push({path:pageRoute,query:{id:parms}})
        window.localStorage.setItem("firstUrl",window.location.href);
    };
    // 页面回退
    Vue.prototype.goback=function(){
        history.go(-1);//回退上一层
    }
    // 时间格式转换
    Date.prototype.format2 = function(fmt) {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }
    
};

