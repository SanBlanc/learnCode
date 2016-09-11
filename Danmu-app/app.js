/**
 * Created by San on 2016/9/6.
 */
'use strict';

(function () {

    //public function
    function $(dom) {
        return document.querySelector(dom);
    }

    //public variables
    var oTxt = $('#inTxt'),
        // sendBtn  = $('#send'), //submit包含了sendBtn的响应
        clearBtn = $('#clear'),
        oForm = document.querySelectorAll('form')[0],
        screen = $("#screen");
    var min, max;

    /*获取样式的值*/
    function getStyle(obj, type) {
        if (obj.currentStyle) {
            return obj.currentStyle[type];
        } else {
            return getComputedStyle(obj)[type];
        }
    }

    /*生产弹幕条top值随机数*/
    function randomPos() {
        if (!min) {
            min = screen.offsetTop;
        }
        if (!max) {
            max = Number.parseInt(getStyle(screen, "height")) - 32;
            /*32 视为内容本身的高度*/
        }
        // console.log(`randomPos: max = ${max}, min = ${min}`);
        // return parseInt(Math.random()*(max-min+1)+min,10);
        return parseInt(Math.random() * max);
    }

    function move(obj) {
        console.log("------------- move -------------");
        // 不执行下去了
        if (!obj) {
            return;
        }
        obj.style.top = randomPos() + 'px';
        if (obj.timer) {
            clearInterval(obj.timer);
        }
        if (!obj.iLeft) {
            obj.iLeft = obj.offsetLeft;//记录初始位置
        }
        if (!obj.iLimit) {
            var limit = Number.parseInt(getStyle(obj, 'width'));
            limit = 0 - limit;
            /*转为负值*/
            obj.iLimit = limit;
        }
        if (!obj.iLeft || !obj.iLimit) {
            alert("出错，检查！");
        }
        if (!obj.iSpeed) {
            var maxSpeed = 10;
            var minSpeed = 1;
            obj.iSpeed = parseInt(parseInt(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed, 10));
        }
        console.log(`弹幕内容：${obj.innerText}，初始位置：${obj.iLeft}，限制大小：${obj.iLimit}，速度为：${obj.iSpeed}。`);
        obj.timer = setInterval(function () {
            obj.style.left = (obj.offsetLeft - obj.iSpeed) + 'px';
            var iLeft = obj.offsetLeft;
            if (iLeft <= obj.iLimit) {
                clearInterval(obj.timer);
                setTimeout(function () {
                    obj.style.left = obj.iLeft + 'px';
                    move(obj);
                }, 1000);
            }
        }, 30);

    }

    /**
     * enter和点击btn自动触发sendTo
     */
    function submitHandler() {
        if (!oTxt.value) {
            return false;
        }
        var inStr = oTxt.value.trim();
        console.log(`submitHandler: value = ${inStr}`);
        var oP = document.createElement('p');
        oP.innerHTML = inStr;
        screen.appendChild(oP);
        render(oP);
        oTxt.value = '';
        move(oP);
    }

    oForm.onsubmit = function (event) {
        submitHandler();
        event = event || window.event;
        event.cancelBubble = true;
        // event.returnValue = false;
        return false;//important!!! 不添加浏览器会自动刷新，这是为啥？？
        // event.stopPropagation();

    };

    /* 屏幕内没有任何东西在滚*/
    function reset() {
        var sWid = parseInt(getStyle(screen, 'width'));
        var maxWid = sWid + screen.offsetLeft;
        if (!screen.children) {
            console.log("屏幕内没有弹幕！");
            return;
        }
        for (let i = 0; i < screen.children.length; i++) {
            (function () {
                var _dom = screen.children[i];
                if (_dom.timer) {
                    clearInterval(_dom.timer);
                }
                _dom.style.left = maxWid + 'px';
                console.log("等待3s后重新开始移动！");
                setTimeout(function () {
                    restartScroll(_dom);
                }, 3000);
            })(i);
        }
    }

    function restartScroll(obj) {
        obj.style.left = obj.iLeft + 'px';
        // 重新生成速度
        var maxSpeed = 10;
        var minSpeed = 1;
        obj.iSpeed = parseInt(parseInt(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed, 10));
        move(obj);
    }


    clearBtn.onclick = function (event) {
        event = event || window.event;
        event.cancelBubble = true;
        reset();
    };

    window.onresize = function (event) {
        event = event || window.event;
        min = screen.offsetTop;
        max = Number.parseInt(getStyle(screen, "height")) - 32;
        /*32 视为内容本身的高度*/
        console.log(`onresize handler: max = ${max}, min = ${min}`);
    };

    /* 对p初始化，随机设置高度 */
    function render(obj) {
        console.log("--------------render---------------");
        if (obj) {
            obj.style.top = randomPos() + 'px';
        } else {
            for (var i = 0; i < screen.children.length; i++) {
                (function (i) {
                    var _dom = screen.children[i];
                    console.log(`render: top = ${randomPos()}`);
                    _dom.style.top = randomPos() + 'px';
                })(i);
            }
        }

    }

    //screen已有弹幕运动初始化
    function moveInit() {
        for (let i = 0; i < screen.children.length; i++) {
            var dom = screen.children[i];
            move(dom);
        }
    }

    render();
    moveInit();
})();