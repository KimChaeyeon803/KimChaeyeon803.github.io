$(document).ready(function () {

    // 메뉴 슬라이딩
    $('#navi>li').on('mouseover', function () {
        $(this).find('.submenu').stop().slideDown(300);
    });

    $('#navi>li').on('mouseout', function () {
        $(this).find('.submenu').stop().slideUp(300);
    });


    // #banner 이미지 슬라이드
    // 일정시간마다 #banner 요소 내의 ul 요소를 #banner 너비만큼 왼쪽으로 이동
    // #prev 버튼 누르면 마지막 요소를 첫번째 요소로 이동
    // #next 버튼 누르면 다음 이미지가 보이도록 ul 요소 이동
    let $banner = $("#banner");
    let $imgSlide = $banner.find("ul");
    let $prev = $banner.find("#prev");
    let $next = $banner.find("#next");
    let $imageWidth = $("#banner>ul>li>a>img").width();

    let delay = 3000;
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
    // window.setInterval(slideNextImage, delay);

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
    

    // #classic_book섹션에서 #indicator의 화살표 클릭 시 이전, 다음 ul 요소로 넘어갈 수 있도록 설정 
    // 화살표 클릭에 따라 숫자 증감 표시
    let $classicBook = $("#classic_book");
    let $bookSlide = $classicBook.find("ul");
    let $prevButton = $("#indicator>button:first-child");
    let $nextButton = $("#indicator>button:last-child");
    let $bookWidth = $classicBook.children("li").outerWidth(true);
    let $indicatorNumber = 1;
    let $indicatorSpan = $("#indicator>span");

    function slideNextBook() {
        $bookSlide.css({
            left: `-${$bookWidth}px`,
            transitionDuration: duration + "ms"
        });

        $bookSlide.removeAttr("style")
        .children(":first").appendTo($bookSlide);
        
        $indicatorNumber++;
        if ($indicatorNumber > 8) {
            $indicatorNumber = 1;
        }
        $indicatorSpan.text(`${$indicatorNumber} / 8`);
    }

    function slidePrevBook() {
        $bookSlide.prepend($bookSlide.children(":last")).css({left:0});

        $indicatorNumber--;
        if ($indicatorNumber < 1) {
            $indicatorNumber = 8;
        }
        $indicatorSpan.text(`${$indicatorNumber} / 8`);
    }

    $prevButton.on("click", slidePrevBook);
    $nextButton.on("click", slideNextBook);
    

    // #event섹션에서 #indicator_event를 클릭 시 함수 실행
    // toggleClass("hidden")으로 클릭 시 "hidden" 클래스가 없으면 만들고 있으면 지우기
    // #indicator_event 클릭 시 일부 ul 요소를 보여주거나 숨긴다.

    let $indicatorEventNumber = 1;
    let $indicatoreEventSpan = $("#indicator_event>span");


    $("#indicator_event>button").on("click", function(){
        $("#eventlist>ul>li").each(function(index, item){
            $(item).toggleClass("hidden");
        })
        

        $indicatorEventNumber++;
        $indicatoreEventSpan.text(`${$indicatorEventNumber} / 2`);
        if ($indicatorEventNumber == 2) {
            $indicatorEventNumber = 0;
        }
    })

});
