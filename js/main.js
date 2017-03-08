/* ===================================================================
 * LIDE - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

    "use strict";

    var cfg = {     
        defAnimation   : "fadeInUp",    // 默认CSS动画        
        scrollDuration : 800,           // 平滑移动持续时间
        statsDuration  : 4000           // 数字增长持续时间
    },  
    $WIN = $(window);

        /* Preloader 
     * -------------------------------------------------- */

$WIN.on('load', function() {    
    // 页面刷新、加载时动画
    $('html, body').animate({ scrollTop: 0 }, 'normal');

    // 预加载 
    $("#loader").fadeOut("slow"); 
    $("#preloader").delay(200).fadeOut("slow");

    //isotope显示图片重置
    $("html,body").resize();

    //移动端取消动画
    if($(window).width()<768){
        $('.animate-this').removeClass('animate-this');
    }
});

//移动端nav按钮显示/隐藏
$('body,#nav-wrap a').on('click',function(e){
    if($('.collapse').hasClass('in')){
        // e.preventDefault();
        $('.collapse').fadeOut('800');
    }
    else{
        // e.preventDefault();
        $('.collapse').fadeIn('800'); 
    }
})

//页面上下滑动时nav栏显示/隐藏
var initTop = 0;
$(window).scroll(function(e) {
    var scrollTop = $(document).scrollTop();
    if(scrollTop > initTop){
       $(".navbar-fixed-top").removeClass("top-nav-collapse");
       if($(window).width()<768){
        $('.nav').fadeOut('fast');
       }
    } else {
       $(".navbar-fixed-top").addClass("top-nav-collapse");
       if($(window).width()<768){
        $('.nav').fadeIn('fast');
       }
    }
    initTop = scrollTop;    
});

//图片筛选插件isotope
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
    autoplayControls:false,
    actualSize:false,
    scale:0.5
});


//向下滚动动画
$('.smoothscroll').on('click',function(e){
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
})

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
    offset: '60%'
}); 

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

//animate-this Animation
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
        offset: '90%'
    }); 
}

//轮播图时间自定义
$('.carousel').carousel({
    interval: 4500
})

//返回顶部按钮显示
$(window).on('scroll', function() {
    if ($(window).scrollTop() >= 500) {
        $("#go-top").fadeIn(400);
    } else {
        $("#go-top").fadeOut(400);
    }
});


})(jQuery);
