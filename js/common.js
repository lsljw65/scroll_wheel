$(document).ready(function(){
    var $sectionTop=0;
    var headerHeight;

    // banner 섹션 처리
    var bannerTop, bannerBoxHeight;
    var $vertical=0, bannerPosition=0;
    var $lastHeight, timeOut, $bannerContainer, windowHeight, wheelStart;

    // /////////////// 초기값 설정 /////////////////
    function init(){
        windowHeight=$(window).height();
        headerHeight=$("header").height();
        // console.log("window창의 높이 : "+windowHeight)
        // console.log("header 높이 : "+headerHeight)
        
        $("section").css({
            height:windowHeight-(headerHeight)
        })

        // banner 초기화
        bannerTop=$("#banner-detail").offset().top;
        $bannerContainer=$(".banner-detail-container").height();
        bannerBoxHeight=$(".box-wrap").height();
        $vertical=150;
        $lastHeight=bannerBoxHeight-$bannerContainer;
        // console.log("bannerBox : "+bannerBoxHeight)
        // console.log("$vertical : "+$vertical);
        // console.log("마지막 위치 : "+$lastHeight)
        // console.log("banner-deail-container : "+$(".banner-detail-container").height())
        
    }
    init();

    //  재설정
    $(window).resize(function(){
        init();
    })
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
            // console.log("$(this.hash).prev().height() : "+$(this.hash).prev().height())
            if($position<=index){

                // console.log("다음요소, 현재요소")
                $hash=$(this.hash).offset().top;
                
            }else{
                // console.log("이전요소")
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
            // console.log("스크롤 탑 : "+$scrollTop)
            $sectionTop=$(".section").eq(index).offset().top
            // console.log("섹션 탑 : "+$sectionTop)
            if($scrollTop+500>=$sectionTop){
            //    console.log("큽니다.")
            //    console.log("index : "+index)
               $position=index;
               $aniIndex=index;
            //    console.log("$position : "+$position)
               $active($position);
               $animation($aniIndex)
            }
        })
    })

    //  box-wrap wheel
    function boxWheel(){
        $(".box-wrap").on("DOMMouseScroll mousewheel", function(e){
            clearTimeout(timeOut);
            timeOut = setTimeout(function(){
                if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ){
                    // console.log("올리고 있음")
                    // console.log("bannerPosition : "+bannerPosition)
                    if(bannerPosition>0){

                        bannerPosition=bannerPosition-$vertical;
                    }else{
                        console.log("올림 끝남")
                        $(".box-wrap").off()
                        wheelStart=bannerPosition;
                    }

                }else{
                    // console.log("내리고 있음")
                    if(bannerPosition<$lastHeight){
                        bannerPosition=bannerPosition+$vertical; 
                        // console.log("bannerPosition : "+bannerPosition)
                       
                    }else{
                        console.log("내림 끝남")
                        $(".box-wrap").off()
                        wheelStart=bannerPosition;   
                    }
                    
                }
                $(".box-wrap").stop().animate({
                    top:-bannerPosition
                },800)
            },100)
            return false;
        })
        
    }

    boxWheel();

    $(window).scroll(function(){
        var $scrollTop=$(this).scrollTop()
        if( wheelStart<=0 || wheelStart>=$lastHeight){
            console.log("wheelStart : "+wheelStart)
            // $(".box-wrap").off()
            boxWheel()
        }

    })

    // ////////////////////////////////
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
    
