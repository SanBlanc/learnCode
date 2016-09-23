'use strict';
/*天气数据，101010100----北京
 http://wthrcdn.etouch.cn/weather_mini?city=北京
 通过城市名字获得天气数据，json数据
 http://wthrcdn.etouch.cn/weather_mini?citykey=101010100
 通过城市id获得天气数据，json数据*/
$(document).ready(function() {

    // 北京，上海，大连，苏州，杭州，厦门，深圳
	var cityarr = [
	    '101010100','101020100','101070201','101190401','101210101','101230201','101280601'
    ];
    var citycode = '101010100';//默认城市
    var dataObj = {};
    var index = 0;// 城市索引
    var todayCont = $('#today_content');
    var forecastCont = document.getElementById('forecast_content');

	function initData() {
        dataObj = {};//清除数据

		$.getJSON('http://wthrcdn.etouch.cn/weather_mini?callback=?', {
			citykey: citycode
		}, function(result) {
		    // 处理天气数据
            dataObj.city = result.data.city;
            dataObj.hit = result.data.ganmao;
            dataObj.wendu = result.data.wendu;
            dataObj.aqi = result.data.aqi;
            dataObj.forecast = result.data.forecast;
            // dataObj.forecast = [];
            // for(var i = 0;i<result.data.forecast.length ; i++){dataObj.forecast.push(result.data.forecast[i]);}
            console.log(dataObj);
            renderDom();
		});
	}


    function renderDom() {
        //清空所有原生
        todayCont.html('');
        forecastCont.innerHTML = '';

        $('#city').text(dataObj.city);
        todayCont.append('<li class="item">气候提示：'+dataObj.hit+'</li>');
        todayCont.append('<li class="item">温度：'+dataObj.wendu+' ℃</li>');
        todayCont.append('<li class="item">aqi指数：'+dataObj.aqi+'</li>');

        var arr = dataObj.forecast;
        var fragment = document.createDocumentFragment();
        arr.forEach(function (element) {
            var li = document.createElement('li');
            li.classList.add('item');
            for(var key in element){
                var op = document.createElement('p');
                var str = getKey(key);
                op.innerHTML = '<span>'+str+'：'+element[key]+'</span>';
                li.appendChild(op);
                // console.log(key+':'+element[key]);
            }
            fragment.appendChild(li);
        });
        forecastCont.appendChild(fragment);
    }

    function getKey(str) {
        switch(str){
            case "fengxiang":
                return "风向";
                break;
            case "fengli":
                return "风力";
                break;
            case "high":
                return "最高";
                break;
            case "type":
                return "天气";
                break;
            case "low":
                return "最低";
                break;
            case "date":
                return "日期";
                break;
            default:
                console.error('未处理该项数据');
                break;

        }
    }

	function renderData(data) {
		$.each(data, function(key, value) {
			if(typeof value != 'string'){
				renderData(value);
			}else{
				console.log(key+' : '+value);
			}
		});
	}

	initData();//页面初始化之后数据加载

    //点击切换城市，数据加载
    $('#city').click(function (e) {
        e = e || window.event;
        index += 1;
        if(index >= cityarr.length){
            index = 0;
        }
        citycode = cityarr[index];
        initData();
        e.stopPropagation();
        e.cancelBubble = true;

    })
});