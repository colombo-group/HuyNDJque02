var imgArr = new Array('img0', 'img1', 'img2');
var cur = 0;
var widthImg = 1000;
var direction = "";
var slide = 0;
var time = null; 
importSlide(imgArr);
runSlide();
function importSlide(arrayImg){
for (var i = 0; i < arrayImg.length; i++) {
	imgCenter = '<img src="img/'+ arrayImg[i] + '.jpg">';
	imgLeft = '<img src="img/'+ arrayImg[getPrev(i)] + '.jpg">';
	imgRight = '<img src="img/'+ arrayImg[getNext(i)] + '.jpg">';
	$('#main-slider').append(imgCenter);
	$('#imgleft').append(imgLeft);
	$('#imgright').append(imgRight);
	$('#choose').append('<li></li>');
}
}

function getPrev(index){
	var x = index - 1;
	if (x <= 0) {
		return 0;
	}
	return x;
}

function getNext(index){
	var y = index + 1;
	if (y >= imgArr.length) {
		return 0;
	}
	return y;
}

function goLeft(){
	cur = getPrev(cur);
	goImg(cur);
}

function goRight(){
	cur = getNext(cur);
	goImg(cur);
}

function goImg(index){
	$('#main-slider img').show();
	$('#main-slider').css('margin-left',(-1) * index * widthImg+"px");
	$('.select').removeClass('select');
	$('#choose li').eq(cur).addClass('select');

	//change boths side img
	$('#imgleft img').hide();
	$('#imgright img').hide();
	$('#imgleft img').show();
	$('#imgright img').show();
}

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

$('#prev').click(function(){
	clearInterval(time);
	goLeft();
	direction = "left";
	runSlide();
});

$('#next').click(function(){
	clearInterval(time);
	goRight();
	direction = "right";
	runSlide();
});
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



$("#choose li").click(function(){
	cur = $("li").index($(this));
	clearInterval(time);
	goImg(cur);
	runSlide();
});

$("#box").mouseenter(function(){
	clearInterval(time);
});

$("#box").mouseleave(function(){
	if (direction == "left") {
		goLeft();
	}
	else{
		goRight();
	}
	runSlide();
});

$("#option").click(function(){
	if ($("#check-thumbnail:checked").length) {
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
