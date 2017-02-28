$(document).ready(function(){
	var imgArr = new Array('img0', 'img1', 'img2');
	var cur = 0;
	var widthImg = 1000;
	var direction = "";
	var slide = 0;
	 //import img into slide
	for (var i = 0; i < imgArr.length; i++) {
		imgCenter = '<img src="img/'+ imgArr[i] + '.jpg">';
		imgLeft = '<img src="img/'+ imgArr[getPrev(i)] + '.jpg">';
		imgRight = '<img src="img/'+ imgArr[getNext(i)] + '.jpg">';
		$('#main-slider').append(imgCenter);
		$('#imgleft').append(imgLeft);
		$('#imgright').append(imgRight);
		$('#choose').append('<li></li>');
	}
	runSlide();
	function goImg(index){
		$('#main-slider img').show();
		$('#main-slider').css('margin-left',(-1) * index * widthImg+"px");
		$('.select').removeClass('select');
		$('#choose li').eq(cur).addClass('select');

		//change boths side img
		$('#imgleft img').hide();
		$('#imgright img').hide();
		$('#imgleft img').eq(cur).show();
		$('#imgright img').eq(cur).show();
	}

	// move left
	function getPrev(index){
		var x = index - 1;
		if (x < 0) {
			return imgArr.length-1 ;
		}
		return x;
	}
	function goLeft(){
		cur = getPrev(cur);
		goImg(cur);
	}

	//move right
	function getNext(index){
		var y = index + 1;
		if (y >= imgArr.length) {
			return 0;
		}
		return y;
	}
	function goRight(){
		cur = getNext(cur);
		goImg(cur);
	}

	// set time to run slide
	var time = null;
	function runSlide(){
		if (direction == "left") {
			time = setInterval(function(){
				goLeft();
			}, 1500);
		}
		else{
			time = setInterval(function(){
				goRight();
			}, 1500);
		}
	}
	// see previous slide
	$('#prev').click(function(){
		clearInterval(time);
		goLeft();
		direction = "left";
		runSlide();
	});

	//see next slide
	$('#next').click(function(){
		clearInterval(time);
		goRight();
		direction = "right";
		runSlide();
	});

	//hover thumnail to see next and prev img
	hover();
	function hover(){
		$('#prev').mouseenter(function(){
			// clearInterval(time);
			$("#imgleft").show();
			
		});
		$('#next').mouseenter(function(){
			// clearInterval(time);
			$("#imgright").show();
		});
		$('#prev').mouseleave(function(){
			$("#imgleft").hide();
		});
		$('#next').mouseleave(function(){
			$("#imgright").hide();
		});
	}

	//choose img when click on dot
	$("#choose li").click(function(){
		cur = $("li").index($(this));
		clearInterval(time);
		goImg(cur);
		runSlide();
	});

	//stop run slide when hover into #box
	$("#box").mouseenter(function(){
		clearInterval(time);
	});

	//continue running slide
	$("#box").mouseleave(function(){
		// set up the direction
		if (direction == "left") {
			goLeft();
		}
		else{
			goRight();
		}
		runSlide();
	});

	// set up the option of see dot and see next/prev img
	$("#option").click(function(){
		// check the checked attribute
		if ($("#check-thumbnail:checked").length){
			hover();
		}
		else{
			$('#prev').unbind("mouseenter");
			$('#next').unbind("mouseenter");
		}
		if ($("#check-dot:checked").length){
			$('#choose').show();
		}
		else
		{
			$('#choose').hide();
		}
	});
});