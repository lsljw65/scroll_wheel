$(document).ready(function(){
    var $sectionTop=0;
    var headerHeight;
    // /////////////// 초기값 설정 /////////////////
    function init(){
        windowHeight=$(window).height();
        headerHeight=$("header").height();
        console.log("window창의 높이 : "+windowHeight)
        console.log("header 높이 : "+headerHeight)
        
        $("section").css({
            height:windowHeight-(headerHeight)
        })
        
    }
    init();
    // ////////////// 네비 버튼 //////////////////
    var $navBool=true;
    $(".navBt").click(function(){
        if($navBool){
        $(this).addClass("bt-background")
        $(".nav-list").addClass("nav-position")
        $navBool=false;
        }else{
        $(".nav-list").removeClass("nav-position")
        $(this).removeClass("bt-background")
        $navBool=true;
        }
    })

    // ///////////////해시 네비게이션 //////////////
    var $position=0;
    $(".nav-list a").each(function(index){
        $(this).click(function(){
            console.log("$(this.hash).prev().height() : "+$(this.hash).prev().height())
            if($position<=index){

                console.log("다음요소, 현재요소")
                $hash=$(this.hash).offset().top;
                
            }else{
                console.log("이전요소")
                if(index<=0){
                    $hash=0
                }else{
                    var count=$position-index
                    $hash=$(this.hash).offset().top-($(this.hash).prev().height()*count)-headerHeight
                }               
            }
            $("html,body").stop().animate({
                scrollTop:$hash
            },1000)
            $position=index
            $active($position)
            $navBool=true;
        })
    });

    function $active(activePosition){
        $(".nav-list a").removeClass("clickActive")
        $(".nav-list a").eq(activePosition).addClass("clickActive")
        $(".nav-list").removeClass("nav-position")
    }
    

    $(window).resize(function(){
        init();
    })

    $(".section").each(function(index){
        // console.log("index : "+index)
        $(window).scroll(function(){
            var $scrollTop=$(this).scrollTop()
            console.log("스크롤 탑 : "+$scrollTop)
            $sectionTop=$(".section").eq(index).offset().top
            console.log("섹션 탑 : "+$sectionTop)
            if($scrollTop+500>=$sectionTop){
               console.log("큽니다.")
               console.log("index : "+index)
               $position=index;
               $aniIndex=index;
               console.log("$position : "+$position)
               $active($position);
               $animation($aniIndex)
            }else{
                $aniIndex=index-1;
            }
        })
    })
    var $aniIndex=0;
    function $animation(){
        $(".section").eq($aniIndex-1).find(".about-container").removeClass("aboutActive");
        $(".section").eq($aniIndex).find(".about-container").addClass("aboutActive")

        $(".section").eq($aniIndex-1).find(".web-box").removeClass("webActive");
        $(".section").eq($aniIndex+1).find(".web-box").removeClass("webActive");
        for(i=0; i<$(".section .web-box").length; i++){
            $(".section").eq($aniIndex).find(".web-box").addClass("webActive");
        }
    }
    $animation();
    
})//jqeuery 끝
    
