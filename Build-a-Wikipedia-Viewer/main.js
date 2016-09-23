'use strict';

// https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json

// wikipedia
// var url = "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&gsrsearch="+str+"&callback=?";

$(function(){
    var dataList = {};
    $('form').on('click',function () {
        $('input').addClass('input-focus').show(1000).val('');
        $('.container').find('p:first-child').slideUp(1000);
        $('label:first').slideUp(1000);

    }).on('keydown',function () {
        $('input').siblings().slideUp(1000);
        $('.container').removeClass('margin-top-center');
    }).on('submit',function (e) {
        e.preventDefault();// 阻止默认刷新

        // $('.container').find('.item').remove();

        var keyStr = encodeURI($('input').val());
        // wikipedia的返回值看不懂
        // var url = "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&gsrsearch="+keyStr+"&callback=?";
        var url = 'http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key='+keyStr+'&bk_length=600&callback=?';
        console.log('url:'+url);
        $.getJSON(url,function (result) {
            console.log(result);
            renderData(result);
        });
    });

    function renderData( data ) {
        // var dataList = {};
        dataList.abstract = data.abstract;
        dataList.totalUrl = data.totalUrl;
        dataList.key = data.key;
        console.log('abstract:'+dataList.abstract);
        console.log('totalUrl:'+dataList.totalUrl);
        console.log('key:'+dataList.key);

        //array
        dataList.catalog = data.catalog; // 4个url地址
        console.log('catalog:'+dataList.catalog);
        /*<div class="item">
         <a href="https://www.baidu.com" target="_blank">
         <h2>title</h2>
         <p>fjwoefjwioefwif</p>
         </a>
         </div>*/
        var newNode = null;
        if(!dataList.abstract){
            alert('not found, change the key word!');
            return;
        }
        if(dataList.totalUrl){
            newNode = $('<div class="item"><a target="_blank" href='+dataList.totalUrl+'><h2>'+dataList.key+'</h2><p>'+dataList.abstract+'</p></a></div>');
        }else{
            newNode = $('<div class="item"><h2>'+$('input').val()+'</h2><p>'+dataList.abstract+'</p></a></div>');
        }

        newNode.appendTo($('.container'));
    }

});