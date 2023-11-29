(function ($) {
	"use strict";
    
    var livekitchenApp = {       
        /* ---------------------------------------------
         Preloader
         --------------------------------------------- */
        preloader: function() {
            var $window = $(window);
            $window.on("load", function() {
                var $body = $("body"),
                    $preloader = $(".preloader");
                $body.imagesLoaded(function() {
                    $preloader.delay(400).slideUp("slow", function() {
                        var $self = $(this);
                        $self.remove();
                    });
                });
            });
        },
        /* ---------------------------------------------
        Header Search
        --------------------------------------------- */    
        header_search: function() {
            var $searchSelector = $(".header-top .search-area .fa");
            $searchSelector.on("click", function (event) {
                event.stopPropagation();
                var $self = $(this);
                $self.next().slideToggle();
            });

            var $document = $(document),
                $searchTarget = $(".header-top .search-area .header-search");
            $document.on("click", function(e) {
                if (!$searchTarget.is(e.target) && $searchTarget.has(e.target).length === 0) {
                    $searchTarget.slideUp();
                }
            });
        }, 
        /* ---------------------------------------------
         Menu
         --------------------------------------------- */
        menu: function() {
            var $combinedmenu = $(".navigation .navbar-nav.mainmenu").clone();
            $combinedmenu.appendTo("#mobile-main-nav #main-mobile-container");


            var $submenu = $(".sub-menu"),
                $hasSubmenu = $(".mainmenu li").has(".sub-menu"),
                $subMenuMark = $("<span class='fa fa-angle-down'></span>"),
                $mobileNavClass = $("#main-mobile-container .main-navigation"),
                $mobileOverlay = $(".mobile-menu-main .menucontent.overlaybg, .mobile-menu-main .slideLeft"),
                $mobileNavContent = $('.mobile-menu-main .menucontent'),
                $mobileNavBar = $('#navtoggole-main');

            if ($hasSubmenu) {
                $submenu.prev().append($subMenuMark);
            }
            // Main Navigation Mobile
            // --------------------------------            
            $mobileNavClass.addClass('slideLeft');

            var menuopen_main = function () {
                    $mobileOverlay.removeClass('menuclose').addClass('menuopen');
                },
                menuclose_main = function () {
                    $mobileOverlay.removeClass('menuopen').addClass('menuclose');
                };
            $mobileNavBar.on('click', function () {
                if ($mobileNavContent.hasClass('menuopen')) {
                    $(menuclose_main);
                } else {
                    $(menuopen_main);
                }
            });
            $mobileNavContent.on('click', function () {
                if ($mobileNavContent.hasClass('menuopen')) {
                    $(menuclose_main);
                }
            });

            // Sub Menu
            // -------------------------------- 
            $hasSubmenu.prepend("<span class='menu-click'><i class='menu-arrow fa fa-plus'></i></span>");

            var $menuMobile = $(".menu-mobile"),
                $menuWrap = $(".menu-list");
            $menuMobile.on("click", function () {
                $menuWrap.slideToggle("slow");
            });

            var $mobileSubMenuOpen = $(".menu-click");
            $mobileSubMenuOpen.on("click", function () {
                var $self = $(this);
                $self.siblings(".sub-menu").slideToggle("slow");
                $self.children(".menu-arrow").toggleClass("menu-extend");
            });

            var $navRightIssue = $(".navigation .mainmenu li");
            $navRightIssue.on("mouseenter mouseleave", function (e) {
                var $self = $(this);
                if ($("ul", $self).length) {
                    var elm = $("ul:first", $self),
                        off = elm.offset(),
                        l = off.left,
                        w = elm.width(),
                        docW = $(".header-bottom > .container").width(),
                        isEntirelyVisible = (l + w <= docW);

                    if (!isEntirelyVisible) {
                        $self.addClass("right-side-menu");
                    } else {
                        $self.removeClass("right-side-menu");
                    }
                }
            });
        }, 

        /* ---------------------------------------------
        Magnifying Pop-up
        --------------------------------------------- */
        popup_window: function() {
            var $videoPopUp = $(".video-popup-btn"),
                $imagePopUp = $(".image-popup-btn");
            $videoPopUp.magnificPopup({
                disableOn: 700,
                type: "iframe",
                mainClass: "mfp-fade",
                preloader: false,
                removalDelay: 300,
                fixedContentPos: false
            });            
            $imagePopUp.magnificPopup({
                type: "image",
                mainClass: "mfp-fade"
            });
        },
        /* ---------------------------------------------
         Coming Soon
         --------------------------------------------- */
        coming_soon: function() {
            var $selector = $('.countdown-time');
            $selector.each(function(){
                var $this = $(this),
                    data_year = $this.attr('data-year'),
                    data_month = $this.attr('data-month'),
                    data_day = $this.attr('data-day'),
                    data_hour = $this.attr('data-hour'),
                    data_minutes = $this.attr('data-minutes');
                $this.syotimer({
                    year: data_year,
                    month: data_month,
                    day: data_day,
                    hour: data_hour,
                    minute: data_minutes
                });    
            });
        },
        
        /* ---------------------------------------------
        Main Slider
        --------------------------------------------- */
        main_slider: function() {
            var $mainSlider = $(".js-main-slider");
            if($mainSlider.length) {            
                $mainSlider.pogoSlider({
                    autoplay: true,
                    autoplayTimeout: 5000,
                    displayProgess: true,
                    preserveTargetSize: true,
                    targetWidth: 1000,
                    targetHeight: 450,
                    responsive: true
                }).data("plugin_pogoSlider");
            }
        },
        /* ---------------------------------------------
        Calendar
        --------------------------------------------- */
        calendar: function() {
            var $calender = $("input.calendar");
            $calender.pignoseCalendar({
                toggle: true,
                buttons: true 
            });
        },
        /* ---------------------------------------------
        Count To
        --------------------------------------------- */
        countto: function() {
            var $countTo = $(".count-data");
            $countTo.countTo();
        },
        
        /* ---------------------------------------------
         Home Version Grid Masonry
         --------------------------------------------- */
        grid_masonry: function() {
            var $container = $(".masonry-layout");
            $container.imagesLoaded(function () {
                $container.masonry({
                    itemSelector: ".grid"
                });
            });
        },
        /* ---------------------------------------------
         Home Version Grid Masonry
         --------------------------------------------- */
        cart_update: function() {
            var $quantity = $(".quantity");
            $quantity.on("click", ".plus", function(e) {
                var $self = $(this);
                var $input = $self.prev().prev("input.qty");
                var val = parseInt($input.val());
                $input.val(val + 1).change();
                return false; });
            $quantity.on("click", ".minus", function(e) {
                var $self = $(this);
                var $input = $self.prev("input.qty");
                var val = parseInt($input.val());
                if (val > 0) { $input.val(val - 1).change(); }
                return false;
            });
        },
        /* ---------------------------------------------
         livekitchen Facility
         --------------------------------------------- */
        livekitchen_facility: function() {  
            var $menuItemSlider =  $(".menu-item-slider");           
            $menuItemSlider.owlCarousel({
                center: false,
                items: 1,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: false,
                margin: 7,
                nav: false,
                dots: true
            });
        },

        /* ---------------------------------------------
         livekitchen Hospitality
         --------------------------------------------- */
        livekitchen_features: function() {
            var $ourFeaturesItem = $(".our-features-item");
            $ourFeaturesItem.owlCarousel({
                center: false,
                items: 3,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: false,
                margin: 30,
                nav: true,
                dots: false,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    800:{
                        items:2
                    },
                    1000:{
                        items:3
                    },
                    1200:{
                        items:3
                    },
                    1400:{
                        items:3
                    }
                }
            });
        },
        /* ---------------------------------------------
         livekitchen Single Room
         --------------------------------------------- */
        livekitchen_single_room: function() {
            var $sync1 = $(".shop-thumb-full"),
                $sync2 = $(".shop-thumb-list"),
                duration = 300;
            $sync1
                .owlCarousel({
                    rtl: false,
                    items: 1,
                    margin: 10,
                    nav : false,
                    owl2row: "true",
                    owl2rowTarget: "item"
                })
                .on("changed.owl.carousel", function (e) {
                    var syncedPosition = syncPosition(e.item.index);
                    if ( syncedPosition !== "stayStill" ) {
                        $sync2.trigger("to.owl.carousel", [syncedPosition, duration, true]);
                    }
                });
            $sync2
                .owlCarousel({
                    rtl: false,
                    margin: 15,
                    items: 3,
                    nav: false,
                    center: false,
                    dots: false,
                    responsive:{
                        0:{
                            items:2
                        },
                        500:{
                            items:2
                        },
                        600:{
                            items:3
                        },
                        800:{
                            items:3
                        },
                        1000:{
                            items:3
                        },
                        1200:{
                            items:3
                        },
                        1400:{
                            items:3
                        },
                    }
                })
                .on("initialized.owl.carousel", function() {
                   addClassCurrent(0);
                })
                .on("click", ".owl-item", function () {
                    $sync1.trigger("to.owl.carousel", [$(this).index(), duration, true]);

                });
                function addClassCurrent( index ) {
                    $sync2
                        .find(".owl-item.active")
                        .removeClass("current")
                        .eq( index )
                        .addClass("current");
                }
                addClassCurrent(0);
                function syncPosition( index ) {
                    addClassCurrent( index );
                    var itemsNo = $sync2.find(".owl-item").length;
                    var visibleItemsNo = $sync2.find(".owl-item.active").length;
                
                    if (itemsNo === visibleItemsNo) {
                        return "stayStill";
                    }
                    var visibleCurrentIndex = $sync2.find(".owl-item.active").index( $sync2.find(".owl-item.current") );
                    if (visibleCurrentIndex === 0 && index !== 0) {
                        return index - 1;
                    }
                    if (visibleCurrentIndex === (visibleItemsNo - 1) && index !== (itemsNo - 1)) {
                        return index - visibleItemsNo + 2;
                    }
                    return "stayStill";
                } 
        },
                 
        /* ---------------------------------------------
        Customer Reviews
         --------------------------------------------- */
        customer_reviews: function() {
            var $customerReview = $(".customer-reviews");
            $customerReview.owlCarousel({
                center: false,
                items: 2,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                singleItem: true,
                loop: true,
                margin: 30,
                nav: false,
                dots: true,
                responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    800:{
                        items:2
                    },
                    1000:{
                        items:2
                    },
                    1200:{
                        items:2
                    },
                    1400:{
                        items:2
                    },
                }
            });            
        },
        
        /* ---------------------------------------------
        Gallery Photo
        --------------------------------------------- */
        gallery_photo: function () {
            var $galleryItem = $(".gallery-item-content");
            $galleryItem.each(function(){
                var $this = $(this);
                $this.imagesLoaded(function () {
                    $this.isotope({
                        filter: "*",
                        animationOptions: {
                            duration: 1000,
                            easing: "linear",
                            queue: false,
                        }
                    });
                });

                var $filterMenu = $this.prev().find(".gallery-filter-menu li a");
                $filterMenu.on("click", function() {
                    var $self = $(this),
                        $selector = $self.attr("data-filter");
                        $this.isotope({ 
                            filter: $selector,
                            animationOptions: {
                                duration: 1000,
                                easing: "linear",
                                queue: false, 
                            }
                        });
                    $self.parents("ul").find("li").removeClass("current-tab");
                    $self.parent().addClass("current-tab");
                    return false;
                });
            });
        },
        
        /* ---------------------------------------------
         Mail Chip
         --------------------------------------------- */
        mailchip: function() {
            var $newsletter = $("#newsletter-form");
            if ($newsletter.length) {
                $newsletter.formchimp();
            }
        },
         
        /* ---------------------------------------------
         Widget Mobile fix
         --------------------------------------------- */
        widget_mobile: function () {
            function debouncer(func, timeout) {
                var timeoutID, timeout = timeout || 500;
                return function () {
                    var scope = this,
                        args = arguments;
                    clearTimeout(timeoutID);
                    timeoutID = setTimeout(function () {
                        func.apply(scope, Array.prototype.slice.call(args));
                    }, timeout);
                };
            }
            function resized() {
                var $getWidgetTitle = $(".widget .widget-title"),
                    $getWidgetTitleContent,
                    $windowWidthlocal = $(window).width();
                if ($windowWidthlocal <= 991) {
                    $getWidgetTitleContent = $getWidgetTitle.parent().nextAll().hide();
                    $getWidgetTitle.addClass("expand-margin");
                    $getWidgetTitle.on("click", function(e) {
                        e.stopImmediatePropagation();
                        var $selfLocal = $(this);
                        $selfLocal.toggleClass("expand");
                        $selfLocal.parent().nextAll().slideToggle();
                        return false;
                    });
                    $getWidgetTitle.each(function(){
                        var $selfLocal = $(this);
                        $selfLocal.parent().addClass("mb-widget");
                    });
                } else {
                    $getWidgetTitleContent = $getWidgetTitle.parent().nextAll().show();
                    $getWidgetTitle.removeClass("expand-margin");
                    $getWidgetTitle.each(function(){
                        var $selfLocal = $(this);
                        $selfLocal.parent().removeClass("mb-widget");
                    });
                }
            }
            resized();

            var $windowWidth = $(window).width(),
                $window = $(window);
            var prevW = window.innerWidth || $windowWidth;
            $window.resize(debouncer(function (e) {
                var currentW = window.innerWidth || $windowWidth;
                if (currentW !== prevW) {
                    resized();
                }
                prevW = window.innerWidth || $windowWidth;
            }));

            //Mobile Responsive
            var $extendBtn = $(".extend-btn .extend-icon");
            $extendBtn.on("click", function(e) {
                e.preventDefault();
                var $self = $(this);
                $self.parent().prev().toggleClass("mobile-extend");
                $self.parent().toggleClass("extend-btn");
                $self.toggleClass("up");
            });
        },
        /* ---------------------------------------------
         IPad Parallax Issue
        --------------------------------------------- */
        ipad_parallax: function() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream || /android/i.test(userAgent) || /windows phone/i.test(userAgent)) {
                $(".jarallax,.error-page-area").each(function(){
                    var $self = $(this);

                    var $getImage = $self.attr("data-jarallax");
                    var $objImage = $.parseJSON( $getImage );
                    
                    $self.css({
                        "background-image": "url("+ $objImage.imgSrc +")",
                        "background-size": "cover",
                        "background-repeat": "no-repeat",
                        "background-position": "center center"
                    });
                });
            }
        },
       
        /* ---------------------------------------------
         Maps
        --------------------------------------------- */
        maps: function() {
            if ($("#gmaps").length) {
                var map;
                map = new GMaps({
                    el: "#gmaps",
                    lat: 43.04446,
                    lng: -76.130791,
                    scrollwheel: false,
                    zoom: 10,
                    zoomControl: true,
                    panControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    overviewMapControl: false,
                    clickable: false
                });                
                var image = "images/map-icon.png";

                map.addMarker({
                    lat: 43.04446,
                    lng: -76.130791,
                    icon: image,
                    animation: google.maps.Animation.DROP,
                    verticalAlign: "bottom",
                    horizontalAlign: "center"
                });
                var styles = [
                  { 
                    stylers: [
                      { hue: "#BBE5C1" },
                      { saturation: -45 }
                    ]
                  },{
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [
                        { hue: "#FEFACD" },
                        { saturation: 50 },
                        { lightness: -10 }
                    ]
                  },{
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                        { hue: "#0090E5" },       
                        { lightness: -35 },
                        { visibility: "simplified" }
                    ]
                  },{
                    featureType: "road",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                  }
                ];
                map.setOptions({styles: styles});    
            }
        },
        
        /* ---------------------------------------------
         Scroll Top
         --------------------------------------------- */
        scroll_top:function scrolltop() {
            var $bodyElement = $("body"),
                $window = $(window),
                $scrollHtml = $("<a href='#top' id='scroll-top' class='topbutton btn-hide'><span class='glyphicon glyphicon-menu-up'></span></a>");

            $bodyElement.append($scrollHtml);

            var $scrolltop = $("#scroll-top");
            $window.on("scroll", function() {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop
                        .addClass("btn-show")
                        .removeClass("btn-hide");
                } else {
                    $scrolltop
                        .addClass("btn-hide")
                        .removeClass("btn-show");
                }
            });

            var $selectorAnchor = $("a[href='#top']");
            $selectorAnchor.on("click", function() {
                $("html, body").animate({
                    scrollTop: 0
                }, "normal");
                return false;
            });
        },
        
        /* ---------------------------------------------
         function initializ
         --------------------------------------------- */
        initializ: function() {
            livekitchenApp.preloader();
            livekitchenApp.header_search();           
            livekitchenApp.menu();           
            livekitchenApp.popup_window();  
            livekitchenApp.coming_soon();
            livekitchenApp.main_slider();           
            livekitchenApp.calendar();           
            livekitchenApp.countto();           
            livekitchenApp.grid_masonry();          
            livekitchenApp.cart_update();          
            livekitchenApp.livekitchen_facility();
            livekitchenApp.livekitchen_features();
            livekitchenApp.livekitchen_single_room();
            livekitchenApp.customer_reviews();
            livekitchenApp.gallery_photo();
            livekitchenApp.mailchip();            
            livekitchenApp.widget_mobile();
            livekitchenApp.ipad_parallax();
            livekitchenApp.maps();
            livekitchenApp.scroll_top();
        }
    };
    
    /* ---------------------------------------------
     Document ready function
     --------------------------------------------- */
    $(function() {
        livekitchenApp.initializ();
    });
})(jQuery);