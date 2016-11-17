/**
 * 作者：zhaocunyang(vinent)
 * 时间：2016/11/17
 * */
(function($) {
	$.fn.drag = function(options) {
		var defaults = {//设置默认值
			"author":"vincent",
			"dragTopBtmFlag":true,//设置上下贴边引力动画
			"dragLeftRigFlag":true,//设置左右贴边引力动画
			"dragTop": 0,//初始top(值为距"dragMarginTop"的间距)
			"dragLeft": 0,//初始left
			"dragMarginTop": 0,//距header块元素的距离
			"dragMarginBottom": 0,//距footer块元素的距离
			"dragZIndex":2//设置层级
		}
		var ops = $.extend(defaults, options);
		//rem>>px转换
		if(typeof ops.dragMarginBottom == "string"){
			ops.dragTop = parseFloat(ops.dragTop)*parseFloat($("body").css('fontSize'))
		}
		if(typeof ops.dragLeft == "string"){
			ops.dragLeft = parseFloat(ops.dragLeft)*parseFloat($("body").css('fontSize'))
		}
		if(typeof ops.dragMarginTop == "string"){
			ops.dragMarginTop = parseFloat(ops.dragMarginTop)*parseFloat($("body").css('fontSize'))
		}
		if(typeof ops.dragMarginBottom == "string"){
			ops.dragMarginBottom = parseFloat(ops.dragMarginBottom)*parseFloat($("body").css('fontSize'))
		}
		var _this, _left, _top;
		$(this).css({
			"position": "fixed",
			"zIndex": ops.dragZIndex,
			"left": ops.dragLeft,
			"top": ops.dragTop + ops.dragMarginTop
		})
		$(this).on('touchstart', function(e) {
			var fDiv = "<div id='mFliexMark'></div>";//添加div兼容app穿透事件
			$("body").append(fDiv);
			$("#mFliexMark").css({
				"position": "fixed",
				"left": 0,
				"top": 0,
				"width": "100%",
				"height": "100%",
				"zIndex": ops.dragZIndex-1
			})
			_this = $(this);
			var fW = _this.width() / 2;
			var fH = _this.height() / 2;
			var touch = e.originalEvent.targetTouches[0];
			//touchmove
			$(document).on('touchmove', function(e) {
				var touch = e.originalEvent.targetTouches[0];
				_left = touch.clientX - fW;
				_top = touch.clientY - fH;
				if(_left <= 0) {
					_left = 0;
				} else if(_left >= $(window).width() - _this.width()) {
					_left = $(window).width() - _this.width();
				}
				if(_top <= ops.dragMarginTop) {
					_top = ops.dragMarginTop;
				} else if(
					_top >= $(window).height() - _this.height() - ops.dragMarginBottom) {
					_top = $(window).height() - _this.height() - ops.dragMarginBottom;
				}
				_this.css({
					"top": _top,
					"left": _left
				});
				e.preventDefault();
				e.stopPropagation();
			});
			$(document).on('touchend', function() {
				if(ops.dragTopBtmFlag == true){
					if(_top >= ($(window).height() - ops.dragMarginBottom - ops.dragMarginTop - fH) / 1.25) {
						_top = $(window).height() - _this.height() - ops.dragMarginBottom;
					} else if(_top < ($(window).height() - ops.dragMarginBottom - ops.dragMarginTop - fH) / 5) {
						_top = ops.dragMarginTop;
					}
				}
				if(ops.dragLeftRigFlag == true){
					if(_left >= $(window).width() / 2 - fW) {
						_left = $(window).width() - _this.width();;
					} else if(_left < $(window).width() / 2 - fW) {
						_left = 0;
					};
				}
				_this.animate({
					"top": _top,
					"left": _left
				}, 50);
				setTimeout(function() {
					$("#mFliexMark").remove()
				}, 350)
				$(document).off('touchmove', null);
				$(this).off('touchend', null)
			})
		})
	}
})(jQuery)