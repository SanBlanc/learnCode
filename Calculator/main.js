/**
 * Created by San on 2016/9/23.
 */

(function () {
    var show = document.querySelector('#show');
    var cells = document.querySelectorAll('.grid-cell');
    var label = document.querySelector('#show');

    var arr = []; // 存储当前所有输入的值，在屏幕中显示出来
    var contArr = []; // 运算符数组
    var numArr = []; //存储运算的数据
    var k = 0; // 标志运算符位置

    for (var i = 0; i < cells.length; i++) {
        (function (i) {
            var item = cells[i];
            item.onclick = function (e) {
                e = e || window.event;
                generator(item.innerText);
                e.stopPropagation();
                e.cancelBubble = true;
            }
        })(i);
    }

    /**
     * 初始化所有数组
     */
    function reset() {
        arr = [];
        numArr = [];
        contArr = [];
        k = 0;
    }

    function generator(value) {
        var result = 0;
        switch (value) {
            case 'AC':
                // all clear，清除寄存器中的数值
                reset();
                result = '';
                clearStorage();
                break;
            case 'CE':
                // 清除当前输入的数值
                reset();
                result = 0;
                break;
            case 'Ans':
                // 上次计算结果
                result += getLast();
                break;
            case '=':
                console.log(arr);
                result = render(); // 执行计算
                saveLast(result);
                reset();
                break;
            default:
                arr.push(value); // 将数据添加到数组，在屏幕中显示出来
                result = arr.join().replace(/,+/g, "");
                break;
        }
        label.textContent = result;
    }
    /**
     * 判断value是否是字符
     */
    function isNum(value) {
        var re = /[0-9.%]/;
        // var re = /[+-\\*/]/;
        return re.test(value);
    }

    function initData() {
        contArr = [];
        numArr = [];

        var num = '';
        var isRe = false; // 标志位，重复运算符只存储最后一个
        arr.forEach(function (value, index) {
            // 是否是运算符
            if (!isNum(value)) {
                if (!isRe) {
                    contArr.push(value);
                    isRe = true;
                } else {
                    contArr.pop(); //删除最后一个
                    contArr.push(value); //重新添加
                }
                if (num) {
                    numArr.push(num);
                    num = '';
                }
            } else {
                num += value;
                isRe = false;
            }

        });
        if (num) numArr.push(num);

        console.log('运算符数组：' + contArr);
        console.log('运算数据数组：' + numArr);
    }

    function render() {
        var result = 0;
        var isFirst = true; // 是否是第一次计算，并且没有保留上一次的值
        // 如果arr的第一个数据不是数值而是操作符，那么result保留上一次的结果
        if (!isNum(arr[0])) {
            isFirst = false;
            result = getLast(); //初始值为上一次的结果
        }
        initData(); // 初始化各个数据
        var num = 0;
        for (let i = 0; i < numArr.length; i++) {
            num = getNumber(numArr[i]);
            if (i == 0) {
                result = calc(result, num, isFirst);
            } else {
                result = calc(result, num);
            }
        }
        console.log('计算结果为：' + result);
        return result;
    }



    /**
     * 运算，两个数之间，逐个选择运算符数组的元素
     */
    function calc(a, b, isFirst) {
        var result = 0;
        if (typeof a != 'number' || typeof b != 'number') {
            console.warn(a + '类型：' + typeof a);
            console.warn(b + '类型：' + typeof b);
            console.error('不是数值，请重试！');
            return 0;
        }
        // isFirst 第一次计算并且计算中没有用上一次的值，没有运算符
        if (isFirst) {
            result = a + b;
            console.log(`第一次计算：calc: ${a} + ${b} = ${result}`);
            return result;
        }
        switch (contArr[k]) {
            case '+':
                result = a + b;
                console.log(`calc: ${a} + ${b} = ${result}`);
                break;
            case '-':
                result = a - b;
                console.log(`calc: ${a} - ${b} = ${result}`);
                break;
            case '*':
                result = a * b;
                console.log(`calc: ${a} * ${b} = ${result}`);
                break;
            case '/':
                result = a / b;
                result = result.toFixed(2); // 保留两位小数
                console.log(`calc: ${a} / ${b} = ${result}`);
                break;
            default:
                console.error('没有这个运算符，请检查数据！' + contArr[k]);
                break;
        }
        k < contArr.length ? k++ : k = 0;
        return result;
    }


    function getNumber(value) {
        var num = Number.parseFloat(value);
        if (value.indexOf('%') != -1) {
            num /= 100;
        }
        num = num.toFixed(2); // 只保留两位小数，toFixed的返回值是字符串 - -!
        // console.log(value + "输出" + num);
        return Number.parseFloat(num);
    }


    /**
     * 在 数据库中存储上一个值
     */
    function saveLast(value) {
        console.warn('存储到数据库' + value);
        sessionStorage.setItem('last', value);
    }
    /**
     * 返回存储的上一个值
     */
    function getLast() {
        console.info('获取上一次的结果');
        var data = sessionStorage.getItem('last');
        if (data) {
            return Number.parseFloat(data);
        }
        return 0;
    }

    function clearStorage() {
        console.warn('清除数据库中的数据！');
        sessionStorage.clear(); // 清除所有数据
        // sessionStorage.removeItem();//清除指定数据
    }


})();