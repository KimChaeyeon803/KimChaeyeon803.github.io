$(document).ready(function(){
    
    // #banner 이미지슬라이드
    let $banner = $("#banner");
    let $imgSlide = $banner.find("ul");
    let $prev = $banner.find("#prev");
    let $next = $banner.find("#next");
    let $imageWidth = $("#banner>ul>li>a>img").width();

    let delay = 3500;
    let duration = 400;
    let timerId = 0;

    let bannerSliding = false;

    function slideNextImage() {
        if(bannerSliding) return;
        bannerSliding = true;

        $imgSlide.css({
            left: `-${$imageWidth}px`,
            transitionDuration: duration + "ms"
        });

        window.setTimeout(function () {
            $imgSlide.removeAttr("style")
                .children(":first").appendTo($imgSlide);

        bannerSliding = false;
        }, duration);
    }

    function slidePrevImage() {
        if(bannerSliding) return;
        bannerSliding = true;

        $imgSlide.prepend($imgSlide.children(":last"))
            .css("left", `-${$imageWidth}px`);

        window.setTimeout(function () {
            $imgSlide.css({
                left: 0,
                transitionDuration: duration + "ms"
            })

            window.setTimeout(function () {
                $imgSlide.removeAttr("style");
                bannerSliding = false;
            }, duration);

        }, 1);
    }

    timerId = window.setInterval(slideNextImage, delay);

    $banner.hover(
        function() { 
            window.clearInterval(timerId);
        },
        function() { 
            timerId = window.setInterval(slideNextImage, delay);
        }
    );

    $prev.on("click", slidePrevImage);
    $next.on("click", slideNextImage);


    // 카테고리 섹션, 오른쪽 각 메뉴 클릭 시 오른쪽 영역의 해당 제품 이미지(연출컷)
    // 왼쪽 영역의 해당 제품 이미지(맛 종류) 및 제품 설명 변경
    const menuItems = $("#product_list>li");
    const leftImages = $("#left-images>li");
    const rightImages = $("#right-images>li");
    const texts = $("#category_inner>h4");
    const descriptions = $("#category_txt>p");
    menuItems.each((index, item) => {
        $(item).children().on("click", () => {
            const target = item.getAttribute("data-target");
            //클릭하면 클릭한 인덱스에만 "active"활성화
            leftImages.removeClass("active");
            leftImages.eq(index).addClass("active");
            rightImages.removeClass("active");
            rightImages.eq(index).addClass("active");
            texts.removeClass("active");
            texts.eq(index).addClass("active");
            descriptions.removeClass("active");
            descriptions.eq(index).addClass("active");
        });
    });
    // #review 섹션에 #up-box, #bottom-box 각 각 이미지 슬라이딩형식넣어 무한 반복시키기
    let $upreview = $("#up-box");
    let $reviewSlide = $upreview.find("ul");
    
    // $upreview.append($reviewSlide.clone());
    
    function slideReviewImage() {
        $upreview.removeAttr("style");
        $upreview.animate({
            marginLeft: `-370px`
        }, delay,"linear",function() {
            $reviewSlide.children(":first").appendTo($reviewSlide);
            slideReviewImage();
        });
    }
    slideReviewImage();
    // timerId = window.setInterval(slideReviewImage, delay);
    
    let $bottomreview = $("#bottom-box");
    let $bottomSlide = $bottomreview.find("ul");

    
    function slideBottomImage() {
        $bottomSlide.children(":last").prependTo($bottomSlide);
        $bottomreview.removeAttr("style");
        $bottomreview.animate({
            marginLeft: `370px`
        }, delay,"linear",function() {
            // $bottomSlide.children(":last").prependTo($bottomSlide);
            slideBottomImage();
        });
    }
    slideBottomImage();

    // #notice섹션에서 #notice-indicator를 클릭 시 함수 실행
    // toggleClass("hidden")으로 클릭 시 "hidden" 클래스가 없으면 만들고 있으면 지우기
    // #notice-indicator 클릭 시 일부 ul 요소를 보여주거나 숨긴다.

    let $indicatorNoticeNumber = 1;
    let $indicatoreNoticeSpan = $("#notice-indicator>span");


    $("#notice-indicator>button").on("click", function(){
        $("#notice-banner>li").first().appendTo("#notice-banner");
        $("#notice-banner>li").each(function(index, item){
            $(item).toggleClass("hidden");
        })
    
        $("#notice>#notice-desc>.notice-txt").toggleClass("hidden");

        $indicatorNoticeNumber++;
        $indicatoreNoticeSpan.text(`${$indicatorNoticeNumber} / 2`);
        if ($indicatorNoticeNumber == 2) {
            $indicatorNoticeNumber = 0;
        }
    })
});