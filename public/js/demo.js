;(function () {

    var banner = document.querySelector('.banner');
    var bannerList = document.querySelector('.banner-list');
    var bannerListItems = document.querySelectorAll('.banner-list li');
    var bannerDots = document.querySelectorAll('.banner-dots li')

    var curIndex = 0;
    var x1 = 0;
    var preX = 0;
    var time1 = 0;
    var timeout = 0;

    var interval = setInterval(function () {
        slide('Left');
    }, 1000)

    banner.addEventListener('touchstart', start, false);
    banner.addEventListener('touchmove', move, false);
    banner.addEventListener('touchend', end, false);

    function start(evt) {
        time1 = evt.timeStamp;
        x1 = evt.touches[0].pageX;
        preX = x1;
        clearInterval(interval)
        moveItem();
    }

    function move(evt) {
        evt.preventDefault();
        var deltaX = evt.touches[0].pageX - preX;
        preX = evt.touches[0].pageX;

        var curX = parseFloat(getComputedStyle(bannerList).transform.split(',')[4]);
        var newX = curX + deltaX;
        bannerList.style.transform = 'translateX(' + newX + 'px)'

    }

    function end(evt) {
        var x2 = evt.changedTouches[0].pageX;
        var time2 = evt.timeStamp;
        var len = Math.abs(x2 - x1);
        var direction = (x2 - x1) > 0 ? 'Right' : 'Left';
        if (len > (10 * Rem / 2) || (time2 - time1 < 300 && len > 30)) {
            slide(direction);
        } else {
            reset(direction);
        }
        interval = setInterval(function () {
            slide('Left');
        }, 1000)
    }


    function moveItem() {
        bannerList.style.transition = '';
        if (curIndex === 0) {
            bannerListItems[4].style.transform = 'translateX(' + (-10 * 5) + 'rem)';
        } else if (curIndex === 4) {
            bannerListItems[0].style.transform = 'translateX(' + (10 * 5) + 'rem)';
        }
    }

    function slide(direction) {
        moveItem();
        if (direction === 'Left') {
            curIndex += 1;
        } else {
            curIndex -= 1;
        }
        bannerList.style.transform = 'translateX(' + (-10 * curIndex) + 'rem)';
        bannerList.style.transition = '0.4s ease all';

        setTimeout(function () {
            side();
        }, 400);
    }

    function reset(direction) {

        bannerList.style.transition = '0.4s all ease';
        bannerList.style.transform = 'translateX(' + (curIndex * -10) + 'rem)';
        setActive();

    }

    function setActive() {
        for (var i = 0; i < bannerDots.length; i++) {
            bannerDots[i].className = '';

        }
        bannerDots[curIndex].className = 'active';
    }

    function side() {
        bannerList.style.transition = '';

        for (var i = 0; i < bannerListItems.length; i++) {
            var item = bannerListItems[i];
            item.style.transform = 'translateX(0rem)';


            if (curIndex < 0) {
                curIndex = 4;
                bannerList.style.transform = 'translateX(' + -10 * 4 + 'rem)';
            } else if (curIndex > 4) {
                curIndex = 0;
                bannerList.style.transform = 'translateX(0rem)';
            }
            setActive();
        }

    }
})();


// zepto点击穿透原因：touchend响应250ms无操作后触发singleTap，在上层元素第一时间隐藏后触发了下层的click事件
// 解决办法:
//  1. 使用透明层遮挡
//  2. 下层设置css pointer-events:none 取消
//  3. 取消click事件，用touchend进行模拟，参考fastclick
// if (typeof layer.onclick === 'function') {

//     // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
//     // - the old one won't work if passed to addEventListener directly.
//     oldOnClick = layer.onclick;
//     layer.addEventListener('click', function (event) {
//         oldOnClick(event);
//     }, false);
//     layer.onclick = null;
// }