/**
 * Created by San on 2016/10/9.
 */
'use strict';
(function () {
  var addTBtn = document.querySelector('#btn-addT'),
    reduceTBtn = document.querySelector('#btn-reduceT'),
    timerBox = document.querySelector('.timer'),
    step = document.querySelector('input'),
    txtTimer = document.querySelector('#timer-txt');

  var timer = null,
    beginTime = null,
    endTime = null,
    isCorrect = false;


  addTBtn.onclick = function (e) {
    e.stopPropagation();
    var arrTmp = txtTimer.innerText.split(':');
    arrTmp[0] = Number.parseInt(arrTmp[0], 10) + Number.parseInt(step.value,10);
    txtTimer.innerText = arrTmp.join(':');
  };
  reduceTBtn.onclick = function (e) {
    e.stopPropagation();
    var arrTmp = txtTimer.innerText.split(':');
    arrTmp[0] = Number.parseInt(arrTmp[0], 10) - Number.parseInt(step.value,10);
    if(arrTmp[0] <= 0){
      arrTmp[0] = 0;
      console.warn('定时器设置不应该小于0');
    }
    txtTimer.innerText = arrTmp.join(':');
  };

  timerBox.onclick = function (e) {
    e.stopPropagation();
    if (!timer) {
      setTime(txtTimer.textContent);
      if(!isCorrect){
        console.warn('没有正确的设置时间！');
        return;
      }
      console.info('开启定时器');
      this.title = '取消定时器';
      timer = setInterval(function () {
        txtTimer.innerHTML = getTime();
      }, 500);
    } else {
      clearTimer();
    }
  };

  function clearTimer() {
    console.info('取消定时器');
    timer && clearInterval(timer);
    timerBox.title = '开启定时器';
    txtTimer.innerHTML = '25:00'; // 返回默认值
    timer = null;
  }

  /**
   * 设置开始时间与结束时间
   * @param str
   */
  function setTime(str) {
    var h = 0, m = 0, s = 0;
    beginTime = new Date();
    endTime = new Date();
    var arr = str.split(':');
    console.log(arr);
    if(arr[0] == arr[1] && arr[0] == 0){
      console.warn('没有设置时间，不执行后面的设置任务。');
      isCorrect = false;
      return;
    }

    s = Number.parseInt(arr[1], 10); // 秒钟
    m = Number.parseInt(arr[0], 10); // 分钟
    if (m / 60 >= 1) {
      s += Number.parseInt(m / 60, 10);
      m = m % 60;
    }
    if (s / 60 >= 1) {
      h += Number.parseInt(s / 60, 10);
      s = s % 60;
    }
    var addVal = (h * 60 * 60 + m * 60 + s) * 1000;
    endTime.setTime(endTime.getTime() + addVal);
    isCorrect = true;
    console.log('setTime 开始时间' + beginTime.toTimeString());
    console.log('setTime 结束时间' + endTime.toTimeString());
  }

  /**
   * 定时器调用，获取当前剩余时间值
   * @returns {string}
   */
  function getTime() {
    var nowTime = new Date();
    var dif = endTime.getTime() - nowTime.getTime();
    if(dif <= 0){
      alert('时间到！');
      clearTimer();
      return '25:00';
    }
    // var d = Math.floor(dif / 1000 / 60 / 60 / 24);
    var h = Math.floor(dif / 1000 / 60 / 60 % 24);
    var m = Math.floor(dif / 1000 / 60 % 60);
    var s = Math.floor(dif / 1000 % 60);
    if (h !== 0) {
      m += 60 * h;
    }
    if(s < 10){
      s = '0' +s;
    }
    return m + ":" + s;
  }

}());