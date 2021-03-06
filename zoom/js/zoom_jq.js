$(".small").on("mouseenter", function(){
    $(".mask").show();
    $(".big").show(); 
})

$(".small").on("mouseleave", function(){
    $(".mask").hide();
    $(".big").hide(); 
    $(".local span").html("");
})

$(".small").on("mousemove", function(event){
    // offset().left没包括border的1px
    let localX = event.pageX - $(".small").offset().left + 1;
    let localY = event.pageY - $(".small").offset().top + 1;

    // 将鼠标在图片中的坐标加到HTML中
    $(".local span").eq(0).html(localX);
    $(".local span").eq(1).html(localY);

    // 获取遮罩层mask的左上角坐标
    let maskX = localX - $(".mask").outerWidth(true) / 2;
    let maskY = localY - $(".mask").outerHeight(true) / 2;
 
    // 判断mask是否越界, 1\2个if判断是否左右溢出
    // 3\4 if判断 是否上下溢出
    if(maskX < 0) {
        maskX = 0;
    }
    if(maskX > $(".small").outerWidth(true) - $(".mask").outerWidth(true)){
        maskX = $(".small").outerWidth(true) - $(".mask").outerWidth(true);
    }
    if(maskY < 0) {
        maskY = 0;
    }
    if(maskY > $(".small").outerHeight(true) - $(".mask").outerHeight(true)){
        maskY = $(".small").outerHeight(true) - $(".mask").outerHeight(true);
    }

    $('.mask').css({
        left: maskX + "px",
        top: maskY + "px"
    })

    // 获取图片原生宽度 jquery 有点问题 
    // $(".big img").outerWidth(true) 获取的是外部宽度而非元素宽度.....!
    // 获取比例: 大图的宽度 / 缩略图显示的宽度 = 图片移动的距离 / 遮罩层mask移动的距离
    let ratio = parseInt($(".big img").css("width")) / $(".small").outerWidth(true); 

    let imgX = ratio * maskX;
    let imgY = ratio * maskY; 
 
    // 改变图片的margin, 使得局部显示的区域不同
    $(".big img").css({
        marginTop: -imgY + "px",
        marginLeft: -imgX + "px"
    })    
})

$(".items").children().on("mouseenter", function(){
    $(this).addClass("active").siblings().removeClass("active");
    let src = $(this).find("img").attr("src"); 
    $(".small").css({background: "url("+src+")"});
    
    let newSrc = src.replace(/mini/, "large"); 
    $(".big img").attr("src", newSrc);
})