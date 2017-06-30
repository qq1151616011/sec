// JavaScript Document

(function($){
	$("#putBtn2").attr("value","1");
	var p=parseInt($("#putBtn2").attr("value"));
	$("#putBtn1").click(function(){
		p--;
		if(p=="0"){
			p=1;
		}
		
		$("#putBtn2").attr("value",p);
		
		var o=parseInt($("#putBtn4").html());
        
		var s=o*p;
		$("#putBtn5").html("￥"+s+".00");
		$("#p1").html(s+".00");
		
		});
		
		
		 $("#putBtn3").click(function(){
		
		p++;
		
		$("#putBtn2").attr("value",p);
		
		
		var o=parseInt($("#putBtn4").html());
        
		var s=o*p;
		$("#putBtn5").html("￥"+s+".00");
		$("#p1").html("￥"+s+".00");
		});
		var o=parseInt($("#putBtn4").html());
        
		var s=o*p;
		$("#putBtn5").html("￥"+s+".00");
		$("#p1").html("￥"+s+".00");
		$("#putBtn6").click(function(){
			var a=confirm("确定要删除吗");
			if(a==true){
				$("#putBtn7").css("display","none");
				
			
			$("#p1").html("00"+".00");}
			});
});
