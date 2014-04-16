/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */+function(e){"use strict";function i(r){e(t).remove();e(n).each(function(){var t=s(e(this)),n={relatedTarget:this};if(!t.hasClass("open"))return;t.trigger(r=e.Event("hide.bs.dropdown",n));if(r.isDefaultPrevented())return;t.removeClass("open").trigger("hidden.bs.dropdown",n)})}function s(t){var n=t.attr("data-target");if(!n){n=t.attr("href");n=n&&/#[A-Za-z]/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")}var r=n&&e(n);return r&&r.length?r:t.parent()}var t=".dropdown-backdrop",n="[data-toggle=dropdown]",r=function(t){e(t).on("click.bs.dropdown",this.toggle)};r.prototype.toggle=function(t){var n=e(this);if(n.is(".disabled, :disabled"))return;var r=s(n),o=r.hasClass("open");i();if(!o){"ontouchstart"in document.documentElement&&!r.closest(".navbar-nav").length&&e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click",i);var u={relatedTarget:this};r.trigger(t=e.Event("show.bs.dropdown",u));if(t.isDefaultPrevented())return;r.toggleClass("open").trigger("shown.bs.dropdown",u);n.focus()}return!1};r.prototype.keydown=function(t){if(!/(38|40|27)/.test(t.keyCode))return;var r=e(this);t.preventDefault();t.stopPropagation();if(r.is(".disabled, :disabled"))return;var i=s(r),o=i.hasClass("open");if(!o||o&&t.keyCode==27){t.which==27&&i.find(n).focus();return r.click()}var u=" li:not(.divider):visible a",a=i.find("[role=menu]"+u+", [role=listbox]"+u);if(!a.length)return;var f=a.index(a.filter(":focus"));t.keyCode==38&&f>0&&f--;t.keyCode==40&&f<a.length-1&&f++;~f||(f=0);a.eq(f).focus()};var o=e.fn.dropdown;e.fn.dropdown=function(t){return this.each(function(){var n=e(this),i=n.data("bs.dropdown");i||n.data("bs.dropdown",i=new r(this));typeof t=="string"&&i[t].call(n)})};e.fn.dropdown.Constructor=r;e.fn.dropdown.noConflict=function(){e.fn.dropdown=o;return this};e(document).on("click.bs.dropdown.data-api",i).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",n,r.prototype.toggle).on("keydown.bs.dropdown.data-api",n+", [role=menu], [role=listbox]",r.prototype.keydown)}(jQuery);+function(e){"use strict";var t=function(n,r){this.options=e.extend({},t.DEFAULTS,r);this.$window=e(window).on("scroll.bs.affix.data-api",e.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",e.proxy(this.checkPositionWithEventLoop,this));this.$element=e(n);this.affixed=this.unpin=this.pinnedOffset=null;this.checkPosition()};t.RESET="affix affix-top affix-bottom";t.DEFAULTS={offset:0};t.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(t.RESET).addClass("affix");var e=this.$window.scrollTop(),n=this.$element.offset();return this.pinnedOffset=n.top-e};t.prototype.checkPositionWithEventLoop=function(){setTimeout(e.proxy(this.checkPosition,this),1)};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var n=e(document).height(),r=this.$window.scrollTop(),i=this.$element.offset(),s=this.options.offset,o=s.top,u=s.bottom;this.affixed=="top"&&(i.top+=r);typeof s!="object"&&(u=o=s);typeof o=="function"&&(o=s.top(this.$element));typeof u=="function"&&(u=s.bottom(this.$element));var a=this.unpin!=null&&r+this.unpin<=i.top?!1:u!=null&&i.top+this.$element.height()>=n-u?"bottom":o!=null&&r<=o?"top":!1;if(this.affixed===a)return;this.unpin&&this.$element.css("top","");var f="affix"+(a?"-"+a:""),l=e.Event(f+".bs.affix");this.$element.trigger(l);if(l.isDefaultPrevented())return;this.affixed=a;this.unpin=a=="bottom"?this.getPinnedOffset():null;this.$element.removeClass(t.RESET).addClass(f).trigger(e.Event(f.replace("affix","affixed")));a=="bottom"&&this.$element.offset({top:n-u-this.$element.height()})};var n=e.fn.affix;e.fn.affix=function(n){return this.each(function(){var r=e(this),i=r.data("bs.affix"),s=typeof n=="object"&&n;i||r.data("bs.affix",i=new t(this,s));typeof n=="string"&&i[n]()})};e.fn.affix.Constructor=t;e.fn.affix.noConflict=function(){e.fn.affix=n;return this};e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this),n=t.data();n.offset=n.offset||{};n.offsetBottom&&(n.offset.bottom=n.offsetBottom);n.offsetTop&&(n.offset.top=n.offsetTop);t.affix(n)})})}(jQuery);+function(e){"use strict";var t=function(n,r){this.$element=e(n);this.options=e.extend({},t.DEFAULTS,r);this.transitioning=null;this.options.parent&&(this.$parent=e(this.options.parent));this.options.toggle&&this.toggle()};t.DEFAULTS={toggle:!0};t.prototype.dimension=function(){var e=this.$element.hasClass("width");return e?"width":"height"};t.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in"))return;var t=e.Event("show.bs.collapse");this.$element.trigger(t);if(t.isDefaultPrevented())return;var n=this.$parent&&this.$parent.find("> .panel > .in");if(n&&n.length){var r=n.data("bs.collapse");if(r&&r.transitioning)return;n.collapse("hide");r||n.data("bs.collapse",null)}var i=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[i](0);this.transitioning=1;var s=function(){this.$element.removeClass("collapsing").addClass("collapse in")[i]("auto");this.transitioning=0;this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)return s.call(this);var o=e.camelCase(["scroll",i].join("-"));this.$element.one(e.support.transition.end,e.proxy(s,this)).emulateTransitionEnd(350)[i](this.$element[0][o])};t.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in"))return;var t=e.Event("hide.bs.collapse");this.$element.trigger(t);if(t.isDefaultPrevented())return;var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight;this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");this.transitioning=1;var r=function(){this.transitioning=0;this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};if(!e.support.transition)return r.call(this);this.$element[n](0).one(e.support.transition.end,e.proxy(r,this)).emulateTransitionEnd(350)};t.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var n=e.fn.collapse;e.fn.collapse=function(n){return this.each(function(){var r=e(this),i=r.data("bs.collapse"),s=e.extend({},t.DEFAULTS,r.data(),typeof n=="object"&&n);!i&&s.toggle&&n=="show"&&(n=!n);i||r.data("bs.collapse",i=new t(this,s));typeof n=="string"&&i[n]()})};e.fn.collapse.Constructor=t;e.fn.collapse.noConflict=function(){e.fn.collapse=n;return this};e(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(t){var n=e(this),r,i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""),s=e(i),o=s.data("bs.collapse"),u=o?"toggle":n.data(),a=n.attr("data-parent"),f=a&&e(a);if(!o||!o.transitioning){f&&f.find('[data-toggle=collapse][data-parent="'+a+'"]').not(n).addClass("collapsed");n[s.hasClass("in")?"addClass":"removeClass"]("collapsed")}s.collapse(u)})}(jQuery);+function(e){"use strict";function t(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in t)if(e.style[n]!==undefined)return{end:t[n]};return!1}e.fn.emulateTransitionEnd=function(t){var n=!1,r=this;e(this).one(e.support.transition.end,function(){n=!0});var i=function(){n||e(r).trigger(e.support.transition.end)};setTimeout(i,t);return this};e(function(){e.support.transition=t()})+function(e){var t=function(t,n){this.$element=e(t);this.$indicators=this.$element.find(".carousel-indicators");this.options=n;this.paused=this.sliding=this.interval=this.$active=this.$items=null;this.options.pause=="hover"&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.DEFAULTS={interval:5e3,pause:"hover",wrap:!0};t.prototype.cycle=function(t){t||(this.paused=!1);this.interval&&clearInterval(this.interval);this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval));return this};t.prototype.getActiveIndex=function(){this.$active=this.$element.find(".item.active");this.$items=this.$active.parent().children();return this.$items.index(this.$active)};t.prototype.to=function(t){var n=this,r=this.getActiveIndex();if(t>this.$items.length-1||t<0)return;return this.sliding?this.$element.one("slid.bs.carousel",function(){n.to(t)}):r==t?this.pause().cycle():this.slide(t>r?"next":"prev",e(this.$items[t]))};t.prototype.pause=function(t){t||(this.paused=!0);if(this.$element.find(".next, .prev").length&&e.support.transition){this.$element.trigger(e.support.transition.end);this.cycle(!0)}this.interval=clearInterval(this.interval);return this};t.prototype.next=function(){if(this.sliding)return;return this.slide("next")};t.prototype.prev=function(){if(this.sliding)return;return this.slide("prev")};t.prototype.slide=function(t,n){var r=this.$element.find(".item.active"),i=n||r[t](),s=this.interval,o=t=="next"?"left":"right",u=t=="next"?"first":"last",a=this;if(!i.length){if(!this.options.wrap)return;i=this.$element.find(".item")[u]()}if(i.hasClass("active"))return this.sliding=!1;var f=e.Event("slide.bs.carousel",{relatedTarget:i[0],direction:o});this.$element.trigger(f);if(f.isDefaultPrevented())return;this.sliding=!0;s&&this.pause();if(this.$indicators.length){this.$indicators.find(".active").removeClass("active");this.$element.one("slid.bs.carousel",function(){var t=e(a.$indicators.children()[a.getActiveIndex()]);t&&t.addClass("active")})}if(e.support.transition&&this.$element.hasClass("slide")){i.addClass(t);i[0].offsetWidth;r.addClass(o);i.addClass(o);r.one(e.support.transition.end,function(){i.removeClass([t,o].join(" ")).addClass("active");r.removeClass(["active",o].join(" "));a.sliding=!1;setTimeout(function(){a.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(r.css("transition-duration").slice(0,-1)*1e3)}else{r.removeClass("active");i.addClass("active");this.sliding=!1;this.$element.trigger("slid.bs.carousel")}s&&this.cycle();return this};var n=e.fn.carousel;e.fn.carousel=function(n){return this.each(function(){var r=e(this),i=r.data("bs.carousel"),s=e.extend({},t.DEFAULTS,r.data(),typeof n=="object"&&n),o=typeof n=="string"?n:s.slide;i||r.data("bs.carousel",i=new t(this,s));typeof n=="number"?i.to(n):o?i[o]():s.interval&&i.pause().cycle()})};e.fn.carousel.Constructor=t;e.fn.carousel.noConflict=function(){e.fn.carousel=n;return this};e(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=e.extend({},i.data(),n.data()),o=n.attr("data-slide-to");o&&(s.interval=!1);i.carousel(s);(o=n.attr("data-slide-to"))&&i.data("bs.carousel").to(o);t.preventDefault()});e(window).on("load",function(){e('[data-ride="carousel"]').each(function(){var t=e(this);t.carousel(t.data())})})}(jQuery)}(jQuery);(function(){(function(e,t){"use strict";var n;n={maxHeight:1440,maxWidth:2560,minHeight:240,minWidth:280,padding:0,init:function(){var e;e=this.cacheItems();return e?this.bindEvents():!1},cacheItems:function(){this.$videos=e(".dias-video-filler video, .dias-video-filler iframe");if(this.$videos.length<1)return!1;this.$videos.each(function(){var t;t=e(this);return t.data("parent",t.parent())});return this.$videos.css({left:"50%",top:"50%"})},bindEvents:function(){var n;n=this;this.$videos.bind("load loadedmetadata",function(){return n.cacheAspect(e(this))});t.bind("resize",function(){return n.videosResize()});return t.resize()},cacheAspect:function(e){var t,n;e.css({width:"100%",height:"auto"});n=e.width();t=e.height();e.data("ratio",n/t);return this.videoResize(e)},videoResize:function(e){var t,n,r,i,s,o,u;n=e.data("ratio");t=e.data("parent");r=t.height();i=t.width();n==null&&(n=e.width()/e.height());s=i/r;if(s<n){o=Math.min(Math.max(r,this.minHeight),this.maxHeight)-this.padding;u=o*n}else{o=Math.min(Math.max(i/n,this.minHeight),this.maxHeight)-this.padding;u=o*n}e.css({height:o,width:u,marginTop:-o/2,marginLeft:-u/2});return e},videosResize:function(){var t;t=this;return t.$videos.each(function(){return t.videoResize(e(this))})}};return n.init()})(jQuery,jQuery(window))}).call(this);(function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){"use strict";var t=window.Slick||{};t=function(){function n(n,r){var i=this,s,o;i.defaults={accessibility:!0,arrows:!0,autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:50,cssEase:"ease",dots:!1,draggable:!0,easing:"linear",fade:!1,infinite:!0,lazyLoad:"ondemand",onBeforeChange:null,onAfterChange:null,onInit:null,onReInit:null,pauseOnHover:!0,placeholders:!0,responsive:null,slide:"div",slidesToShow:1,slidesToScroll:1,speed:300,swipe:!0,touchMove:!0,touchThreshold:5,vertical:!1};i.initials={animating:!1,autoPlayTimer:null,currentSlide:0,currentLeft:null,direction:1,dots:null,listWidth:null,listHeight:null,loadIndex:0,nextArrow:null,prevArrow:null,slideCount:null,slideWidth:null,slideTrack:null,slides:null,sliding:!1,slideOffset:0,placeholderOffset:0,swipeLeft:null,list:null,touchObject:{},transformsEnabled:!1};e.extend(i,i.initials);i.activeBreakpoint=null;i.animType=null;i.animProp=null;i.breakpoints=[];i.breakpointSettings=[];i.paused=!1;i.positionProp=null;i.slider=e(n);i.slidesCache=null;i.cssTransitions=!1;i.windowWidth=0;i.windowTimer=null;i.options=e.extend({},i.defaults,r);i.originalSettings=i.options;s=i.options.responsive||null;if(s&&s.length>-1){for(o in s)if(s.hasOwnProperty(o)){i.breakpoints.push(s[o].breakpoint);i.breakpointSettings[s[o].breakpoint]=s[o].settings}i.breakpoints.sort(function(e,t){return t-e})}i.autoPlay=e.proxy(i.autoPlay,i);i.autoPlayClear=e.proxy(i.autoPlayClear,i);i.changeSlide=e.proxy(i.changeSlide,i);i.setPosition=e.proxy(i.setPosition,i);i.swipeHandler=e.proxy(i.swipeHandler,i);i.dragHandler=e.proxy(i.dragHandler,i);i.keyHandler=e.proxy(i.keyHandler,i);i.autoPlayIterator=e.proxy(i.autoPlayIterator,i);i.instanceUid=t++;i.init()}var t=0;return n}();t.prototype.addSlide=function(t,n,r){var i=this,s;if(typeof n=="boolean"){r=n;n=null}i.unload();s=i.slideTrack.children(this.options.slide);if(typeof n=="number")if(n===0&&e(s).length===0)e(t).appendTo(i.slideTrack);else{if(n<0||n>=e(s).length&&e(s).length!==0){i.reinit();return!1}r?e(t).insertBefore(e(s.get(n))):e(t).insertAfter(e(s.get(n)))}else r===!0?e(t).prependTo(i.slideTrack):e(t).appendTo(i.slideTrack);i.slides=i.slideTrack.children(this.options.slide);i.slideTrack.children(this.options.slide).remove();i.slideTrack.append(i.slides);i.reinit()};t.prototype.animateSlide=function(t,n){var r={},i=this;if(i.transformsEnabled===!1)i.options.vertical===!1?i.slideTrack.animate({left:t},i.options.speed,i.options.easing,n):i.slideTrack.animate({top:t},i.options.speed,i.options.easing,n);else if(i.cssTransitions===!1)e({animStart:i.currentLeft}).animate({animStart:t},{duration:i.options.speed,easing:i.options.easing,step:function(e){if(i.options.vertical===!1){r[i.animType]="translate("+e+"px, 0px)";i.slideTrack.css(r)}else{r[i.animType]="translate(0px,"+e+"px,0px)";i.slideTrack.css(r)}},complete:function(){n&&n.call()}});else{i.applyTransition();i.options.vertical===!1?r[i.animType]="translate3d("+t+"px, 0px, 0px)":r[i.animType]="translate3d(0px,"+t+"px, 0px)";i.slideTrack.css(r);n&&setTimeout(function(){i.disableTransition();n.call()},i.options.speed)}};t.prototype.applyTransition=function(t){var n=this,r,i;r="all "+n.options.speed+"ms "+n.options.cssEase;n.options.vertical===!1?i=n.listWidth/2+" 50%":i="";n.options.fade===!1?n.slideTrack.css({transition:r,transformOrigin:i}):e(n.slides.get(t)).css({transition:r})};t.prototype.autoPlay=function(){var e=this;e.autoPlayTimer&&clearInterval(e.autoPlayTimer);e.slideCount>e.options.slidesToShow&&e.paused!==!0&&(e.autoPlayTimer=setInterval(e.autoPlayIterator,e.options.autoplaySpeed))};t.prototype.autoPlayClear=function(){var e=this;e.autoPlayTimer&&clearInterval(e.autoPlayTimer)};t.prototype.autoPlayIterator=function(){var e=this;if(e.options.infinite===!1)if(e.direction===1){e.currentSlide+1===e.slideCount-1&&(e.direction=0);e.slideHandler(e.currentSlide+e.options.slidesToScroll)}else{e.currentSlide-1===0&&(e.direction=1);e.slideHandler(e.currentSlide-e.options.slidesToScroll)}else e.slideHandler(e.currentSlide+e.options.slidesToScroll)};t.prototype.buildArrows=function(){var t=this;if(t.options.arrows===!0&&t.slideCount>t.options.slidesToShow){t.prevArrow=e('<button type="button" tabIndex="-1">Previous</button>').appendTo(t.slider).addClass("slick-prev");t.nextArrow=e('<button type="button" tabIndex="-1">Next</button>').appendTo(t.slider).addClass("slick-next");t.options.infinite!==!0&&t.prevArrow.addClass("slick-disabled")}};t.prototype.buildDots=function(){var t=this,n,r;if(t.options.dots===!0&&t.slideCount>t.options.slidesToShow){r='<ul class="slick-dots">';for(n=1;n<=t.slideCount;n+=1){r+='<li><a href="javascript:void(0)" tabIndex="-1">'+n+"</a></li>";if(t.options.placeholders===!1&&n+t.options.slidesToShow-(t.options.slidesToScroll-1)>t.slideCount)break}r+="</ul>";t.dots=e(r).appendTo(t.slider);if(t.options.slidesToScroll>1){t.dots.find("li").hide();n=0;while(n<t.slideCount){e(t.dots.find("li").get(n)).show();n+=t.options.slidesToScroll}}t.dots.find("li").first().addClass("slick-active")}};t.prototype.buildOut=function(){var t=this;t.slides=t.slider.children(t.options.slide+":not(.slick-cloned)").addClass("slick-slide");t.slideCount=t.slides.length;t.slidesCache=t.slides;t.slider.addClass("slick-slider");t.slideTrack=t.slideCount===0?e('<div class="slick-track"/>').appendTo(t.slider):t.slides.wrapAll('<div class="slick-track"/>').parent();t.list=t.slideTrack.wrap('<div class="slick-list"/>').parent();t.slideTrack.css("opacity",0);t.options.accessibility===!0&&t.list.prop("tabIndex",0);if(t.options.centerMode===!0){t.options.infinite=!0;t.options.slidesToScroll=1;t.options.slidesToShow%2===0&&(t.options.slidesToShow=3)}e("img[data-lazy]",t.slider).not("[src]").addClass("slick-loading");t.setupPlaceholders();t.setupInfinite();t.buildArrows();t.buildDots();t.setSlideClasses(0);t.options.draggable===!0&&t.list.addClass("draggable")};t.prototype.checkResponsive=function(){var t=this,n,r;if(t.originalSettings.responsive&&t.originalSettings.responsive.length>-1&&t.originalSettings.responsive!==null){r=null;for(n in t.breakpoints)t.breakpoints.hasOwnProperty(n)&&e(window).width()<t.breakpoints[n]&&(r=t.breakpoints[n]);if(r!==null)if(t.activeBreakpoint!==null){if(r!==t.activeBreakpoint){t.activeBreakpoint=r;t.options=e.extend({},t.defaults,t.breakpointSettings[r]);t.refresh()}}else{t.activeBreakpoint=r;t.options=e.extend({},t.defaults,t.breakpointSettings[r]);t.refresh()}else if(t.activeBreakpoint!==null){t.activeBreakpoint=null;t.options=e.extend({},t.defaults,t.originalSettings);t.refresh()}}};t.prototype.changeSlide=function(t){var n=this;switch(t.data.message){case"previous":n.slideHandler(n.currentSlide-n.options.slidesToScroll);break;case"next":n.slideHandler(n.currentSlide+n.options.slidesToScroll);break;case"index":n.slideHandler(e(t.target).parent().index());break;default:return!1}};t.prototype.destroy=function(){var t=this;t.autoPlayClear();t.touchObject={};e(".slick-cloned",t.slider).remove();e(".slick-placeholder",t.slider).remove();t.dots&&t.dots.remove();if(t.prevArrow){t.prevArrow.remove();t.nextArrow.remove()}t.slides.unwrap().unwrap();t.slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style");t.slider.removeClass("slick-slider");t.slider.removeClass("slick-initialized");t.list.off(".slick");e(window).off(".slick"+t.instanceUid)};t.prototype.disableTransition=function(t){var n=this;n.options.fade===!1?n.slideTrack.css({transition:"",transformOrigin:""}):e(n.slides.get(t)).css({transition:""})};t.prototype.fadeSlide=function(t,n){var r=this;if(r.cssTransitions===!1){e(r.slides.get(t)).css({zIndex:1e3});e(r.slides.get(t)).animate({opacity:1},r.options.speed,r.options.easing,n)}else{r.applyTransition(t);e(r.slides.get(t)).css({opacity:1,zIndex:1e3});n&&setTimeout(function(){r.disableTransition(t);n.call()},r.options.speed)}};t.prototype.filterSlides=function(e){var t=this;if(e!==null){t.unload();t.slideTrack.children(this.options.slide).remove();t.slidesCache.filter(e).appendTo(t.slideTrack);t.reinit()}};t.prototype.init=function(){var t=this;if(!e(t.slider).hasClass("slick-initialized")){e(t.slider).addClass("slick-initialized");t.buildOut();t.setProps();t.startLoad();t.loadSlider();t.initializeEvents();t.checkResponsive()}t.options.onInit!==null&&t.options.onInit.call(this,t)};t.prototype.initArrowEvents=function(){var e=this;if(e.options.arrows===!0&&e.slideCount>e.options.slidesToShow){e.prevArrow.on("click.slick",{message:"previous"},e.changeSlide);e.nextArrow.on("click.slick",{message:"next"},e.changeSlide)}};t.prototype.initDotEvents=function(){var t=this;t.options.dots===!0&&t.slideCount>t.options.slidesToShow&&e("li a",t.dots).on("click.slick",{message:"index"},t.changeSlide)};t.prototype.initializeEvents=function(){var t=this;t.initArrowEvents();t.initDotEvents();if(t.options.swipe===!0){t.list.on("touchstart.slick",{action:"start",kind:"touch"},t.swipeHandler);t.list.on("touchmove.slick",{action:"move",kind:"touch"},t.swipeHandler);t.list.on("touchend.slick",{action:"end",kind:"touch"},t.swipeHandler);t.list.on("touchcancel.slick",{action:"end",kind:"touch"},t.swipeHandler)}if(t.options.draggable===!0){t.list.on("mousedown.slick",{action:"start",kind:"drag"},t.swipeHandler);t.list.on("mousemove.slick",{action:"move",kind:"drag"},t.swipeHandler);t.list.on("mouseup.slick",{action:"end",kind:"drag"},t.swipeHandler);t.list.on("mouseleave.slick",{action:"end",kind:"drag"},t.swipeHandler)}if(t.options.pauseOnHover===!0&&t.options.autoplay===!0){t.list.on("mouseenter.slick",t.autoPlayClear);t.list.on("mouseleave.slick",t.autoPlay)}t.list.on("keydown.slick",t.keyHandler);e(window).on("orientationchange.slick.slick"+t.instanceUid,function(){t.checkResponsive();t.setPosition()});e(window).on("resize.slick.slick"+t.instanceUid,function(){if(e(window).width!==t.windowWidth){clearTimeout(t.windowDelay);t.windowDelay=window.setTimeout(function(){t.windowWidth=e(window).width();t.checkResponsive();t.setPosition()},50)}});e(window).on("load.slick.slick"+t.instanceUid,t.setPosition)};t.prototype.initUI=function(){var e=this;if(e.options.arrows===!0&&e.slideCount>e.options.slidesToShow){e.prevArrow.show();e.nextArrow.show()}e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&e.dots.show();e.options.autoplay===!0&&e.autoPlay()};t.prototype.keyHandler=function(e){var t=this;e.keyCode===37?t.changeSlide({data:{message:"previous"}}):e.keyCode===39&&t.changeSlide({data:{message:"next"}})};t.prototype.lazyLoad=function(){var t=this,n,r,i,s;if(t.options.centerMode===!0){i=t.options.slidesToShow+t.currentSlide-1;s=i+t.options.slidesToShow+2}else{i=t.options.slidesToShow+t.currentSlide;s=i+t.options.slidesToShow}n=t.slider.find(".slick-slide").slice(i,s);e("img[data-lazy]",n).not("[src]").each(function(){e(this).attr("src",e(this).attr("data-lazy")).removeClass("slick-loading")});if(t.currentSlide>=t.slideCount-t.options.slidesToShow){r=t.slider.find(".slick-cloned").slice(0,t.options.slidesToShow);e("img[data-lazy]",r).not("[src]").each(function(){e(this).attr("src",e(this).attr("data-lazy")).removeClass("slick-loading")})}else if(t.currentSlide===0){r=t.slider.find(".slick-cloned").slice(t.options.slidesToShow*-1);e("img[data-lazy]",r).not("[src]").each(function(){e(this).attr("src",e(this).attr("data-lazy")).removeClass("slick-loading")})}};t.prototype.loadSlider=function(){var t=this;t.setPosition();t.slideTrack.css({opacity:1});if(document.readyState!=="complete")e(window).load(function(){t.slider.removeClass("slick-loading");t.initUI();t.options.lazyLoad==="progressive"&&t.progressiveLazyLoad()});else{t.slider.removeClass("slick-loading");t.initUI();t.options.lazyLoad==="progressive"&&t.progressiveLazyLoad()}};t.prototype.postSlide=function(e){var t=this;t.options.onAfterChange!==null&&e!==t.currentSlide&&t.options.onAfterChange.call(this,t,e);t.animating=!1;t.currentSlide=e;t.setPosition();t.swipeLeft=null;t.updateDots();t.updateArrows();t.options.autoplay===!0&&t.paused===!1&&t.autoPlay();t.setSlideClasses(t.currentSlide)};t.prototype.progressiveLazyLoad=function(){var t=this,n,r;n=e("img[data-lazy]").not("[src]").length;if(n>0){r=e(e("img[data-lazy]",t.slider).not("[src]").get(0));r.attr("src",r.attr("data-lazy")).removeClass("slick-loading").load(function(){t.progressiveLazyLoad()})}};t.prototype.refresh=function(){var t=this;t.destroy();e.extend(t,t.initials);t.init()};t.prototype.reinit=function(){var t=this;t.slides=e(t.options.slide+":not(.slick-cloned)",t.slideTrack).addClass("slick-slide");t.slideCount=t.slides.length;t.currentSlide>=t.slideCount&&t.currentSlide!==0&&(t.currentSlide=t.currentSlide-t.options.slidesToScroll);t.setProps();t.setupPlaceholders();t.setupInfinite();t.buildArrows();t.updateArrows();t.initArrowEvents();t.buildDots();t.updateDots();t.initDotEvents();t.setSlideClasses(0);t.setPosition();t.options.onReInit!==null&&t.options.onReInit.call(this,t)};t.prototype.removeSlide=function(t,n){var r=this;if(typeof t=="boolean"){n=t;t=null}r.unload();if(r.slideCount<1)return!1;typeof t=="number"?n===!0?--t:n===!1&&++t:n===!0?t=0:t=e(r.slideTrack.children(this.options.slide)).length-1;if(t<0||t>=e(r.slideTrack.children(this.options.slide)).length){r.reinit();return!1}e(r.slideTrack.children(this.options.slide).get(t)).remove();r.slides=r.slideTrack.children(this.options.slide);r.slideTrack.children(this.options.slide).remove();r.slideTrack.append(r.slides);r.reinit()};t.prototype.setCSS=function(e){var t=this,n={},r,i;r=t.positionProp=="left"?e+"px":"0px";i=t.positionProp=="top"?e+"px":"0px";n[t.positionProp]=e;if(t.transformsEnabled===!1)t.slideTrack.css(n);else{n={};if(t.cssTransitions===!1){n[t.animType]="translate("+r+", "+i+")";t.slideTrack.css(n)}else{n[t.animType]="translate3d("+r+", "+i+", 0px)";t.slideTrack.css(n)}}};t.prototype.setDimensions=function(){var e=this;e.options.centerMode===!0?e.list.find(".slick-slide").width(e.slideWidth):e.list.find(".slick-slide").width(e.slideWidth);if(e.options.vertical===!1){e.slideTrack.width(Math.ceil(e.slideWidth*e.slider.find(".slick-slide").length));e.options.centerMode===!0&&e.list.css({padding:"0px "+e.options.centerPadding+"px"})}else{e.list.height(e.slides.first().outerHeight());e.slideTrack.height(Math.ceil(e.listHeight*e.slider.find(".slick-slide").length));e.options.centerMode===!0&&e.list.css({padding:e.options.centerPadding+"px 0px"})}};t.prototype.setFade=function(){var t=this,n;t.slides.each(function(r,i){n=t.slideWidth*r*-1;e(i).css({position:"relative",left:n,top:0,zIndex:800,opacity:0})});e(t.slides.get(t.currentSlide)).css({zIndex:900,opacity:1})};t.prototype.setPosition=function(){var e=this,t,n;n=e.currentSlide;e.setValues();e.setDimensions();e.slideOffset=0;e.options.infinite===!0&&e.slideCount>e.options.slidesToShow&&(e.slideOffset=e.slideWidth*e.options.slidesToShow*-1);e.options.centerMode===!0&&(e.slideOffset+=e.slideWidth*Math.floor(e.options.slidesToShow/2)-e.slideWidth);e.options.placeholders===!1&&e.currentSlide+e.options.slidesToScroll>=e.slideCount-e.options.slidesToScroll&&(e.slideOffset=e.slideOffset-e.slideWidth*e.placeholderOffset*-1);if(e.options.fade===!1){e.options.vertical===!1?t=n*e.slideWidth*-1+e.slideOffset:t=n*e.listHeight*-1-e.listHeight;e.setCSS(t)}else e.setFade()};t.prototype.setProps=function(){var e=this;e.positionProp=e.options.vertical===!0?"top":"left";e.positionProp==="top"?e.slider.addClass("slick-vertical"):e.slider.removeClass("slick-vertical");if(document.body.style.WebkitTransition!==undefined||document.body.style.MozTransition!==undefined||document.body.style.msTransition!==undefined)e.cssTransitions=!0;document.body.style.MozTransform!==undefined&&(e.animType="MozTransform");document.body.style.webkitTransform!==undefined&&(e.animType="webkitTransform");document.body.style.msTransform!==undefined&&(e.animType="msTransform");e.transformsEnabled=e.animType!==null};t.prototype.setValues=function(){var e=this;e.listWidth=e.list.width();e.listHeight=e.list.height();e.slideWidth=Math.ceil(e.listWidth/e.options.slidesToShow)};t.prototype.setSlideClasses=function(t){var n=this,r,i,s;n.slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center");i=n.slider.find(".slick-slide");if(n.options.centerMode===!0){r=Math.floor(n.options.slidesToShow/2);if(t>=r&&t<=n.slideCount-1-r)n.slides.slice(t-r,t+r+1).addClass("slick-active");else{s=n.options.slidesToShow+t;i.slice(s-r+1,s+r+2).addClass("slick-active")}t===0?e(i.get(i.length-1-n.options.slidesToShow)).addClass("slick-center"):t===n.slideCount-1&&e(i.get(n.options.slidesToShow)).addClass("slick-center");e(n.slides.get(t)).addClass("slick-center")}else if(t>0&&t<n.slideCount-n.options.slidesToShow)n.slides.slice(t,t+n.options.slidesToShow).addClass("slick-active");else{s=n.options.slidesToShow+t;i.slice(s,s+n.options.slidesToShow).addClass("slick-active")}n.options.lazyLoad==="ondemand"&&n.lazyLoad()};t.prototype.setupInfinite=function(){var t=this,n,r,i;if(t.options.infinite===!0&&t.options.fade===!1){r=null;if(t.slideCount>t.options.slidesToShow){t.options.centerMode===!0?i=t.options.slidesToShow+1:i=t.options.slidesToShow;for(n=t.slideCount;n>t.slideCount-i;n-=1){r=n-1;e(t.slides[r]).clone().prependTo(t.slideTrack).addClass("slick-cloned")}for(n=0;n<i;n+=1){r=n;e(t.slides[r]).clone().appendTo(t.slideTrack).addClass("slick-cloned")}}}};t.prototype.setupPlaceholders=function(){var t=this,n,r;if(t.options.fade===!0||t.options.vertical===!0){t.options.slidesToShow=1;t.options.slidesToScroll=1;t.options.centerMode=!1}if(t.options.placeholders===!1){t.options.infinite=!1;t.placeholderOffset=t.slideCount%t.options.slidesToScroll;return!1}if(t.slideCount%t.options.slidesToScroll!==0&&t.slideCount>t.options.slidesToShow){r=Math.abs(t.options.slidesToScroll-t.slideCount%t.options.slidesToScroll);for(n=0;n<r;n+=1)e("<div/>").appendTo(t.slideTrack).addClass("slick-slide slick-placeholder");t.slides=e(".slick-slide:not(.slick-cloned)",t.slider);t.slideCount=t.slides.length}};t.prototype.slideHandler=function(e){var t,n,r,i=null,s,o=this;if(o.animating===!0)return!1;t=e;s=o.slideOffset;o.options.placeholders===!1&&(o.currentSlide>=o.slideCount-o.options.slidesToShow?t>=o.slideCount-o.options.slidesToShow?t=o.currentSlide:s=0:t+o.options.slidesToScroll>=o.slideCount-o.options.slidesToScroll&&(s=o.placeholderOffset*o.slideWidth));if(o.options.vertical===!1){i=t*o.slideWidth*-1+s;r=o.currentSlide*o.slideWidth*-1+s}else{i=t*o.listHeight*-1-o.listHeight;r=o.currentSlide*o.listHeight*-1-o.listHeight}if(o.options.infinite===!1&&(e<0||e>o.slideCount-1)){t=o.currentSlide;o.animateSlide(r,function(){o.postSlide(t)});return!1}o.options.autoplay===!0&&clearInterval(o.autoPlayTimer);o.currentLeft=o.swipeLeft===null?r:o.swipeLeft;t<0?n=o.slideCount-o.options.slidesToScroll:t>o.slideCount-1?n=0:n=t;o.animating=!0;o.options.onBeforeChange!==null&&e!==o.currentSlide&&o.options.onBeforeChange.call(this,o,o.currentSlide);if(o.options.fade===!0){o.fadeSlide(n,function(){o.postSlide(n)});return!1}o.animateSlide(i,function(){o.postSlide(n)})};t.prototype.startLoad=function(){var e=this;if(e.options.arrows===!0&&e.slideCount>e.options.slidesToShow){e.prevArrow.hide();e.nextArrow.hide()}e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&e.dots.hide();e.slider.addClass("slick-loading")};t.prototype.swipeDirection=function(){var e,t,n,r,i=this;e=i.touchObject.startX-i.touchObject.curX;t=i.touchObject.startY-i.touchObject.curY;n=Math.atan2(t,e);r=Math.round(n*180/Math.PI);r<0&&(r=360-Math.abs(r));return r<=45&&r>=0?"left":r<=360&&r>=315?"left":r>=135&&r<=225?"right":"vertical"};t.prototype.swipeEnd=function(t){var n=this;n.list.removeClass("dragging");if(n.touchObject.curX===undefined)return!1;if(n.touchObject.fingerCount!==0&&t.data.kind!=="drag"){n.touchObject={};return!1}if(n.touchObject.swipeLength>=n.touchObject.minSwipe){e(t.target).on("click.slick",function(t){t.stopImmediatePropagation();t.stopPropagation();t.preventDefault();e(t.target).off("click.slick")});switch(n.swipeDirection()){case"left":n.slideHandler(n.currentSlide+
n.options.slidesToScroll);n.touchObject={};break;case"right":n.slideHandler(n.currentSlide-n.options.slidesToScroll);n.touchObject={}}}else{n.slideHandler(n.currentSlide);n.touchObject={}}};t.prototype.swipeHandler=function(e){var t=this;e.originalEvent!==undefined&&(t.touchObject.fingerCount=e.originalEvent.touches!==undefined?e.originalEvent.touches.length:1);t.touchObject.minSwipe=t.listWidth/t.options.touchThreshold;switch(e.data.action){case"start":t.swipeStart(e);break;case"move":t.swipeMove(e);break;case"end":t.swipeEnd(e)}};t.prototype.swipeMove=function(e){var t=this,n,r,i,s;s=e.originalEvent!==undefined?e.originalEvent.touches:null;n=t.options.vertical===!1?t.currentSlide*t.slideWidth*-1+t.slideOffset:t.currentSlide*t.listHeight*-1-t.listHeight;t.options.placeholders===!1&&t.currentSlide+t.options.slidesToShow>=t.slideCount&&(n=t.currentSlide*t.slideWidth*-1+t.slideOffset);if(!t.list.hasClass("dragging")&&e.data.kind==="drag"||s&&s.length!==1)return!1;t.touchObject.curX=s!==undefined?s[0].pageX:e.clientX;t.touchObject.curY=s!==undefined?s[0].pageY:e.clientY;t.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(t.touchObject.curX-t.touchObject.startX,2)));r=t.swipeDirection();if(r==="vertical")return!1;e.originalEvent!==undefined&&e.preventDefault();i=t.touchObject.curX>t.touchObject.startX?1:-1;t.options.vertical===!1?t.swipeLeft=n+t.touchObject.swipeLength*i:t.swipeLeft=n+t.touchObject.swipeLength*(t.listHeight/t.listWidth)*i;if(t.options.fade===!0||t.options.touchMove===!1)return!1;if(t.animating===!0){t.swipeLeft=null;return!1}t.setCSS(t.swipeLeft)};t.prototype.swipeStart=function(e){var t=this,n;if(t.touchObject.fingerCount!==1||t.slideCount<=t.options.slidesToShow){t.touchObject={};return!1}e.originalEvent!==undefined&&e.originalEvent.touches!==undefined&&(n=e.originalEvent.touches[0]);t.touchObject.startX=t.touchObject.curX=n!==undefined?n.pageX:e.clientX;t.touchObject.startY=t.touchObject.curY=n!==undefined?n.pageY:e.clientY;t.list.addClass("dragging")};t.prototype.unfilterSlides=function(){var e=this;if(e.slidesCache!==null){e.unload();e.slideTrack.children(this.options.slide).remove();e.slidesCache.appendTo(e.slideTrack);e.reinit()}};t.prototype.unload=function(){var t=this;e(".slick-cloned",t.slider).remove();e(".slick-placeholder",t.slider).remove();t.dots&&t.dots.remove();if(t.prevArrow){t.prevArrow.remove();t.nextArrow.remove()}t.slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style")};t.prototype.updateArrows=function(){var e=this;if(e.options.arrows===!0&&e.options.infinite!==!0&&e.slideCount>e.options.slidesToShow)if(e.currentSlide===0){e.prevArrow.addClass("slick-disabled");e.nextArrow.removeClass("slick-disabled")}else if(e.currentSlide>=e.slideCount/e.options.slidesToScroll*e.options.slidesToShow-e.options.slidesToScroll){e.nextArrow.addClass("slick-disabled");e.prevArrow.removeClass("slick-disabled")}else if(e.options.placeholders===!1&&e.currentSlide+e.options.slidesToShow>=e.slideCount){e.nextArrow.addClass("slick-disabled");e.prevArrow.removeClass("slick-disabled")}else{e.prevArrow.removeClass("slick-disabled");e.nextArrow.removeClass("slick-disabled")}};t.prototype.updateDots=function(){var t=this;if(t.dots!==null){t.dots.find("li").removeClass("slick-active");e(t.dots.find("li").get(t.currentSlide)).addClass("slick-active")}};e.fn.slick=function(e){var n=this;return n.each(function(n,r){r.slick=new t(r,e)})};e.fn.slickAdd=function(e,t,n){var r=this;return r.each(function(r,i){i.slick.addSlide(e,t,n)})};e.fn.slickFilter=function(e){var t=this;return t.each(function(t,n){n.slick.filterSlides(e)})};e.fn.slickGoTo=function(e){var t=this;return t.each(function(t,n){n.slick.slideHandler(e)})};e.fn.slickNext=function(){var e=this;return e.each(function(e,t){t.slick.changeSlide({data:{message:"next"}})})};e.fn.slickPause=function(){var e=this;return e.each(function(e,t){t.slick.autoPlayClear();t.slick.paused=!0})};e.fn.slickPlay=function(){var e=this;return e.each(function(e,t){t.slick.paused=!1;t.slick.autoPlay()})};e.fn.slickPrev=function(){var e=this;return e.each(function(e,t){t.slick.changeSlide({data:{message:"previous"}})})};e.fn.slickRemove=function(e,t){var n=this;return n.each(function(n,r){r.slick.removeSlide(e,t)})};e.fn.slickSetOption=function(e,t,n){var r=this;return r.each(function(r,i){i.slick.options[e]=t;if(n===!0){i.slick.unload();i.slick.reinit()}})};e.fn.slickUnfilter=function(){var e=this;return e.each(function(e,t){t.slick.unfilterSlides()})};e.fn.unslick=function(){var e=this;return e.each(function(e,t){t.slick.destroy()})}});(function(e,t){"use strict";document.addEventListener("touchstart",function(){},!0);var n={scrollPos:0,MAX_MARGIN:20,MIN_MARGIN:0,init:function(){var e=this;e.cacheItems();e.bindEvents()},cacheItems:function(){var t=this;t.$win=e(window);t.$doc=e(document);t.$header=e("#float-header");t.MAX_MARGIN=parseInt(t.$header.css("marginTop"),10)},bindEvents:function(){var e=this;e.$win.scroll(function(){e.scrollPos=e.$doc.scrollTop();e.headSticking()})},headSticking:function(){var e=this,t=Math.max(e.MAX_MARGIN-e.scrollPos,e.MIN_MARGIN);e.$header.css("marginTop",t+"px")}};n.init();e("body").on("click",'[href^="#"]',function(t){var n=e(this),r=n.attr("href").toString(),i=e(r);if(i.length){t.preventDefault();e("html, body").animate({scrollTop:i.offset().top-110},600)}});navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&e("body").addClass("ios");var r=e("#project-page");if(r.length){r.find("p img").each(function(){e(this).closest("p").addClass("image-container clearfix")});r.find("iframe").each(function(){var t=e(this);t.wrap('<div class="embed-container">').closest("p").addClass("image-container")})}e(document).ready(function(){e(".carousel").slick()})})(jQuery,jQuery(window));