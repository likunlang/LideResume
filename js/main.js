/* ===================================================================
 * Howdy - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

	"use strict";

    var cfg = {     
        defAnimation   : "fadeInUp",    // default css animation        
        scrollDuration : 800,           // smoothscroll duration
        statsDuration  : 4000           // stats animation duration
    },  
    $WIN = $(window);

        /* Preloader 
     * -------------------------------------------------- */

$WIN.on('load', function() {    

    // force page scroll position to top at page refresh
    $('html, body').animate({ scrollTop: 0 }, 'normal');

  // will first fade out the loading animation 
    $("#loader").fadeOut("slow", function(){

    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(200).fadeOut("slow");

    $('html,body').resize();

  }); 
});


//jQuery to collapse the navbar on scroll
var initTop = 0;
$(window).scroll(function(e) {
    var scrollTop = $(document).scrollTop();
    if(scrollTop > initTop){
       $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
       $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
    initTop = scrollTop;
    
});

//图片筛选插件
if($('.isotopeWrapper').length){

    var $container = $('.isotopeWrapper');
    var $resize = $('.isotopeWrapper').attr('id');
    // initialize isotope
    
    $container.isotope({
        itemSelector: '.isotopeItem',
        resizable: false, // disable normal resizing
        masonry: {
            columnWidth: $container.width() / $resize
        }
        
    });

    $('#filter a').click(function(){
        $('#filter a').removeClass('current');
        $(this).addClass('current');
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            // animationOptions: {
            //     duration: 2000,
            //     easing: 'easeOutQuart',
            //     queue: false
            // }
        });	
        return false;
    });        
    $(window).smartresize(function(){
        $container.isotope({
            // update columnWidth to a percentage of container width
            masonry: {
                columnWidth: $container.width() / $resize
            }
        });
    });
}


//lightGallery灯箱插件设置
$('.portfolio-items').lightGallery({  
    showThumbByDefault: true,
    hash: false,
    selector: ".portfolio-item" ,  
    pause:3000
});

//向下滚动动画
$('.smoothscroll').on('click', function (e) {
        var target = this.hash,
        $target    = $(target);
        e.preventDefault();
        e.stopPropagation(); 
        $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, cfg.scrollDuration, 'swing').promise().done(function () {
        // check if menu is open
        window.location.hash = target;
      });
    });


//parallax  视差插件
if ($('.parallax').length){
    $(window).stellar({
        responsive:true,
        scrollProperty: 'scroll',
        parallaxElements: false,
        horizontalScrolling: false,
        horizontalOffset: 0,
        verticalOffset: 0
    });
}

//数字增长
var statSection = $(".stats"),
stats       = $(".stat-count");
statSection.waypoint({
handler: function(direction) {
if (direction === "down") { 
       stats.each(function () {
           var $this = $(this);
           //$(this).prop('Counter', 0)=== $({ Counter: 0 })
            $({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: cfg.statsDuration,
            easing: 'swing',
            step: function (curValue) {
                $this.text(Math.ceil(curValue)+'%');
                $this.parent().width(Math.ceil(curValue)+'%')
                }
            });
        });
}
// trigger once only
this.destroy();
},  
offset: "5%"   
});

// Intro Animation
$WIN.on('load', function() {     
    if (!$("html").hasClass('no-cssanimations')) {
        setTimeout(function(){
            $('.animate-intro').each(function(ctr) {
                var el = $(this),
               animationEfx = el.data('animate') || null;                                             

           if (!animationEfx) {
                animationEfx = cfg.defAnimation;                        
           }

            setTimeout( function () {
                    el.addClass(cfg.defAnimation+ ' animated');
                }, ctr * 200);
            });                     
        }, 200);
    } 
});


 /* Animations
    * ------------------------------------------------------- */

if (!$("html").hasClass('no-cssanimations')) {
    $('.animate-this').waypoint({
        handler: function(direction) {

            var defAnimationEfx = cfg.defAnimation;
            if ( direction === 'down' && !$(this.element).hasClass('animated')) {
                $(this.element).addClass('item-animate');
                setTimeout(function() {
                    $('body .animate-this.item-animate').each(function(ctr) {
                        var el       = $(this),
                        animationEfx = el.data('animate') || null;  

                if (!animationEfx) {
                        animationEfx = defAnimationEfx;                     
                   }
                    setTimeout( function () {
                            el.addClass(animationEfx + ' animated');
                            el.removeClass('item-animate');

                        }, ctr * 50);

                    });                             
                }, 100);
            }
            // trigger once only
        this.destroy(); 
        }, 
        offset: '88%'
    }); 
}

//轮播图时间自定义
$('.carousel').carousel({
    interval: 3000
})

//返回顶部
$(window).on('scroll', function() {
    if ($(window).scrollTop() >= 500) {
        $("#go-top").fadeIn(400);
    } else {
        $("#go-top").fadeOut(400);
    }
});

//navbar背景高亮
var sections = $("section");
    var navigation_links = $("#nav-wrap a");
    sections.waypoint({
      handler: function(direction) {
           var active_section;
            active_section = $(this.element);
            if (direction === "up") active_section = active_section.prev();
            var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
         navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");
        },
        offset: '55%'
    });

})(jQuery);