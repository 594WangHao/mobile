/*
 * @Author: jordiawang
 * @Date: 2017-08-18 00:44:53
 * @Last Modified by: jordiawang
 * @Last Modified time: 2017-08-18 01:42:34
 */
;
(function () {
    var Touch = function (el, option) {
        this.element = el;
        this.option = option;

        this.points = {
            length: 0
        };

        this.element.addEventListener("touchstart", this.start.bind(this), false);
        this.element.addEventListener("touchmove", this.move.bind(this), false);
        this.element.addEventListener("touchend", this.end.bind(this), false);
        // this.element.addEventListener("touchcancel", this.cancel.bind(this), false);
    }

    Touch.prototype.start = function (evt) {
        var touches = evt.touches;
        for (var i = 0; i < touches.length; i++) {

            var touchItem = touches[i];

            this.points[touchItem.identifier] = {
                x: touchItem.pageX,
                y: touchItem.pageY,
                time: evt.timeStamp,
                deltaX: 0,
                deltaY: 0,
                deltaTime: 0,
                isNew: false
            };

            this.points.length += 1;
        }
        (this.option.touchStart || function () {}).call(this, evt);
    }


    Touch.prototype.move = function (evt) {
        var touches = evt.touches;

        for (var i = 0; i < touches.length; i++) {
            var touchItem = touches[i];
            var id = touchItem.identifier;

            if (id in this.points) {
                this.points[id].deltaX = touchItem.pageX - this.points[id].x;
                this.points[id].deltaY = touchItem.pageY - this.points[id].y;
                this.points[id].deltaTime = touchItem.timeStamp - evt.time;
                this.points[id].x = touchItem.pageX;
                this.points[id].y = touchItem.pageY;
                this.points[id].time = touchItem.timeStamp;
            } else {
                this.points[id] = {
                    x: touchItem.pageX,
                    y: touchItem.pageY,
                    time: evt.timeStamp,
                    deltaX: 0,
                    deltaY: 0,
                    deltaTime: 0,
                    isNew: true
                }
                this.points.length += 1;
            }
        }

        (this.option.touchMove || function () {}).call(this, evt);
    }

    Touch.prototype.end = function (evt) {console.log(evt.changedTouches[0].pageX, this.points[0].x)
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            var touchItem = touches[i];
            var id = touchItem.identifier;

            if (id in this.points) {
                // this.points[id].deltaX = touchItem.pageX - this.points[id].x;
                // this.points[id].deltaY = touchItem.pageY - this.points[id].y;
                // this.points[id].deltaTime = evt.timeStamp - this.points[id].time;
                // this.points[id].x = touchItem.pageX;
                // this.points[id].y = touchItem.pageY;
                // this.points[id].time = touchItem.timeStamp;
            } else {
                this.points[id] = {
                    x: touchItem.pageX,
                    y: touchItem.pageY,
                    time: evt.timeStamp,
                    deltaX: 0,
                    deltaY: 0,
                    deltaTime: 0,
                    isNew: true
                }
                this.points.length += 1;
            }
        }

        (this.option.touchEnd || function () {}).call(this, evt);

    }

    window.Touch = Touch;
})()