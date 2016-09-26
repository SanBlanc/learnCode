$(function(){


  // page-nav hover事件
  $('span.glyphicon').on({
    mouseenter:function(e){
      // console.log(this);
      if(!this.dataset.name){
        return false;
      }
      var newTip = $('<span class="tooltip">'+this.dataset.name+'</span>');
      var left = this.offsetLeft;
      // newTip.css('left',e.pageX);
      newTip.css('left',left);

      newTip.insertAfter(this);
      newTip.fadeIn();
    },
    mouseleave:function(){
      $('.tooltip').remove();
    }
  });

/**
 * 切换视图
 */
  $('.viewMenu span:first').on('click',function(){
      // console.log('当前视图：'+this.dataset.name);
      if(this.dataset.name == '网格视图'){
        this.dataset.name = '列表视图';
        $(this).removeClass('glyphicon-th-list').addClass('glyphicon-list');
        changeView(true);
      }else{
        this.dataset.name = '网格视图';
        $(this).removeClass('glyphicon-list').addClass('glyphicon-th-list');
        changeView(false);
      }
      $('.tooltip').text(this.dataset.name);
  });

  /**
   * 更换main视图显示方式
   * isList 是否是列表显示
   */
  function changeView(isList){
    if(isList){
      $('.task').removeClass('task-grid').addClass('task-list');
    }else{
      $('.task').removeClass('task-list').addClass('task-grid');
    }
  }


  $('.task .content label').on('click',function(){
    $(this).find('span').toggleClass('glyphicon-ok');
  });


  $('.task-add').on('click',function(e){
    e = e || window.event;
    e.stopPropagation();
    e.cancelBubble = true;
    $(this).find('.content').addClass('content-extend');
      $(this).find('header').show(500);
      $(this).find('footer').show(500);
  });

  function initTask(){

  }


  function addTask(){
    var title = $('.task-add header input').val();
    var content = $('.task-add .content input').val();
    var newTask;
    if(title){
      // newTask = $('<>')
    }
  }

  $('.task-add button').on('click',function(){
      addTask();
  });


  $(document).on('click',function(){

    var isRun = $('.task-add .content').hasClass('content-extend');
    console.log('body click'+isRun);
    if(isRun){
      $('.task-add ').find('.content').removeClass('content-extend');
      $('.task-add').find('header').hide(500);
      $('.task-add ').find('footer').hide(500);
    }
  });
});