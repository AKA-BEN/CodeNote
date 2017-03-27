// JavaScript Document

$(document).ready(function(){
	
	var x=0;//用于分辨当前到哪个li
	var i=0;//用于分辨自动播放的方向
	var c=$("#pic li").length;//获取图片的张数
	var w=$("#pic img").width();//获取图片的长度
	
	//点击左侧按钮向左移动
	$("#left-play").click(function(){
		if( x < c-1 ){
		    x++;
		};
	    var playW=-x*w;
		$("#pic").animate({left:playW},800);

	});
	//点击右侧按钮向右移动
	$("#right-play").click(function(){
		if(x>0){
			x--;
		};
		var playW=-x*w;
		$("#pic").animate({left:playW},800);
	});
	//定义一个自动播放的函数
	function autoPlay(){
		if(x>=c-1){
			i=1;
		}else if(x<=0){
			i=0;
		}
		if(i==0){
			x++;
		}else if(i==1){
			x--;
		}
		var playW=-x*w;
		$("#pic").animate({left:playW},800);
	}
	setInterval(autoPlay,4000);//定时播放
})
