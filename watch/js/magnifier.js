function magnifier(magnifierAttr){

	var magnifier = {
			width : 400,
			height : 400,
			magnifier : ".magnifier",
			moveView : ".move-view",
			magnifierContainer : ".magnifier-container",
			container : ".magnifier-container > .images-cover",
			imgLine : ".magnifier-line > ul",
			view : ".magnifier-view",
			assembly : ".magnifier-btn"
		};

	//设置属性值
	if(typeof(magnifierAttr) == "object"){

		for( var n in magnifierAttr){

			magnifier[n] = magnifierAttr[n];
		}
	}

	var boxMagnifier = $(magnifier.magnifier),
		boxMagnifierContainer = boxMagnifier.find(magnifier.magnifierContainer)
		boxContainer = boxMagnifier.find(magnifier.container),
		boxImgLine = boxMagnifier.find(magnifier.imgLine),
		boxImgLineFind = boxImgLine.find(">*"),
		boxView = boxMagnifier.find(magnifier.view),
		boxMoveView = boxMagnifier.find(magnifier.moveView),
		boxAssembly = boxMagnifier.find(magnifier.assembly);

	//设置宽高
	boxMagnifierContainer.css({
		"width" : magnifier.width,
		"height" : magnifier.height
	});
	boxView.css({
		"width" : magnifier.width,
		"height" : magnifier.height
	});
	boxMagnifier.css({
		"width" : magnifier.width
	});
	//缩略图动作
	var lineLenght = boxImgLineFind.length,
		_index = 0;
	boxImgLineFind.hover(function(){

		_index = $(this).index();

		//显示图片
		showImg();

		//缩略图位置移动
		imgMove();
	});

	//按钮组动作
	boxAssembly.find(">*").on('click',function(){

		imgMove($(this).index());
	})

	//默认显示第一张
	showImg();

	//计算体积碰撞的变量
	var boxMoveViewWidth,
		boxMoveViewHeight,
		containerWidth,
		containerHeight,
		imgWidth,
		imgHieght,
		deviationXl,
		deviationXr,
		deviationYt,
		deviationYb,
		endX,endY,multiple,positionX,positionY;

	boxMagnifierContainer.on('mousemove',function(e){
		
		moveView(e);

	}).on('mouseleave',function(){

		boxMoveView.hide();
		boxView.hide();
	});

	function moveView(e){

		var X = (e.clientX-boxMagnifier.offset().left)-boxMoveViewWidth/2,
			Y = (e.clientY-boxMagnifier.offset().top + $(document).scrollTop())-boxMoveViewHeight/2;

		endX = (X > deviationXl) ? (X < deviationXr) ? X : deviationXr : deviationXl;
		endY = (Y > deviationYt) ? (Y < deviationYb) ? Y : deviationYb : deviationYt;
		
		//当Y轴超出容器
		endY = (endY > 0) ? (endY > (containerHeight-boxMoveViewHeight)) ? (containerHeight-boxMoveViewHeight) : endY : 0;
		boxMoveView.css({
			'left' : endX,
			'top' : endY,
			'display' : "block"
		});
		

		positionX = (endX - (magnifier.width-imgWidth)/2)*multiple;
		positionY = (endY - (magnifier.height-imgHieght)/2)*multiple;

		boxView.css({
			'background-position' : -positionX+"px "+(-positionY)+"px",
			'display' : "block"
		})
	}

	function showImg(){

		var img = boxImgLineFind.eq(_index).find("img");

		//移动盒子的宽高
		boxMoveViewWidth = boxMoveView.width();
		boxMoveViewHeight = boxMoveView.height();

		//承载容器的宽高
		containerWidth = boxMagnifier.width();
		containerHeight = boxMagnifier.height();

		boxContainer.empty().append(img.clone());
		boxImgLineFind.removeClass('active').eq(_index).addClass('active');

		//图片宽高
		img = boxContainer.find("img");
		imgWidth = img.width();
		imgHieght = img.height();

		//移动盒子与图片的倍数
		multiple = containerWidth / boxMoveViewWidth;

		//显示容器加载背景图
		boxView.css({

			'background-image' : "url("+img.attr('src')+")",
			'background-size' : imgWidth*multiple+"px "+imgHieght*multiple+"px"
		})

		//偏移量
		deviationXl = (magnifier.width - imgWidth) /2;
		deviationXr = magnifier.width - deviationXl - boxMoveViewWidth;
		deviationYt = (magnifier.height - imgHieght) /2;
		deviationYb = magnifier.height - deviationYt - boxMoveViewHeight;
	}


	function imgMove(_boole){

		(_boole) ? _index++ : _index--;

		var _deviation = Math.ceil(magnifier.width / boxImgLineFind.width() /2);

		(_index < 0) ? _index = 0 : (_index > lineLenght-_deviation) ? _index = lineLenght - _deviation : _index;

		boxImgLine.css({

			"left" : -(boxImgLineFind.width() * _index)+"px"
		});
	}
}