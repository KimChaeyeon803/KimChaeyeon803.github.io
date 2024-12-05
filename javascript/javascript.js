$(function() { 
    let $html = $("html").animate({scrollTop:0});
    let $section = $("section");

    // 기본 wheel 이벤트 제거
    window.addEventListener("wheel", function(event) { 
        event.preventDefault(); 
    }, {passive:false});

    // 기본 keydown 이벤트 제거
    window.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowDown":
            case "ArrowUp":
            case "PageDown":
            case "PageUp":
            case " ":
                event.preventDefault();
        }
    });


    // 페이지 단위로 스크롤 이동
    $(window).on({
        wheel:function(event) {

            if($html.is(":animated")) return;

            let currentScrollTop = $(window).scrollTop();

            let sectionHeight = $section.innerHeight();

            let distance = 0;

            let wheelArrow = event.originalEvent.deltaY;

            let over = currentScrollTop % sectionHeight; 

            if(wheelArrow > 0) {
               distance = currentScrollTop + (sectionHeight - over);
            }
            else {
                if(over == 0) distance = currentScrollTop - sectionHeight;
                else distance = currentScrollTop - over;

            }

            $html.animate({scrollTop: distance}, 200);
        },

        keydown: function(event) {

            if($html.is(":animated")) return;

            let currentScrollTop = $(window).scrollTop();

            let sectionHeight = $section.innerHeight();

            let distance = 0;

            let over = currentScrollTop % sectionHeight; 

            switch(event.key) {
                case "ArrowDown": case "SectionDown": case " ":
                    distance = currentScrollTop + sectionHeight - over;
                    break;
                case "ArrowUp": case "SectionUp":
                    if(over == 0) distance = currentScrollTop - sectionHeight;
                    else distance = currentScrollTop - over;
                    break;

                default: return;
            }
            
            $html.animate({scrollTop:distance}, 200);
        }   
    });


    // 이미지 클릭시 화면에 크게 보이도록 표시
    let $overlay = $("#overlay");
    let $photo = $overlay.find(".photo");
    let duration = 400;

    $("#container .grid-item img").on("click", function (event) {
        event.preventDefault();

        let path = $(this).attr("src"); 
        $photo.attr("src", path);  

        $overlay.fadeIn(duration);
    });

    $overlay.on("click", function () {
        $overlay.fadeOut(duration);
    });



    // 장점 섹션에 스크롤링 되었을 때(도달했을 때) 위에서 아래로 떨어지며 쌓이는 효과 시작
    // 맨 하단의 텍스트 박스부터 시간에 따라 차례대로 떨어지면서 위로 쌓이는 효과 구현
    // 작성 순서는 1- 10이나, 효과는 10 - 1 순서로 구현
    // 효과가 구현되는 동안 일정 시간의 텀을 두고 차례대로 실행
    // 동시에 시작하지 않고 순차적으로 떨어져 쌓이도록 함
    
    let $targetSection = $("#content10"); 
    let textBoxes = $(".text-boxes").toArray().reverse(); 
    let animationTriggered = false;

    $(window).on("scroll", function () {
        let sectionOffset = $targetSection.offset().top; // 섹션의 상단 위치
        let scrollPosition = $(window).scrollTop(); // 현재 스크롤 위치

        // 현재 스크롤위치가 섹션상단위치가 되면 애니메이션 시작
        if (scrollPosition == sectionOffset && !animationTriggered) {
            animationTriggered = true; 

            textBoxes.forEach(function (box, index) {

                $(box).addClass("on").css({
                    "animation-delay": index * 0.6 + "s", 
                });
            });
        }
    });

    // let textBoxes = $(".text-boxes").toArray().reverse();
    // textBoxes.forEach(function (box, index) {
    //     $(box).css({
    //         "animation-delay": (index * 0.5) + "s"
    //     });

    //     setTimeout(function () {
    //         $(box).addClass("visible");
    //     }, index * 500);
    // });

});


