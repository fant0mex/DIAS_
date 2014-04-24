/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);


}(jQuery);


/* **********************************************
     Begin dias_videoFill.js
********************************************** */

// Generated by CoffeeScript 1.6.3
(function(){(function(e,t){"use strict";var n;n={maxHeight:1440,maxWidth:2560,minHeight:240,minWidth:280,padding:0,init:function(){var e;e=this.cacheItems();return e?this.bindEvents():!1},cacheItems:function(){this.$videos=e(".dias-video-filler video, .dias-video-filler iframe");if(this.$videos.length<1)return!1;this.$videos.each(function(){var t;t=e(this);return t.data("parent",t.parent())});return this.$videos.css({left:"50%",top:"50%"})},bindEvents:function(){var n;n=this;this.$videos.bind("load loadedmetadata",function(){return n.cacheAspect(e(this))});t.bind("resize",function(){return n.videosResize()});return t.resize()},cacheAspect:function(e){var t,n;e.css({width:"100%",height:"auto"});n=e.width();t=e.height();e.data("ratio",n/t);return this.videoResize(e)},videoResize:function(e){var t,n,r,i,s,o,u;n=e.data("ratio");t=e.data("parent");r=t.height();i=t.width();n==null&&(n=e.width()/e.height());s=i/r;if(s<n){o=Math.min(Math.max(r,this.minHeight),this.maxHeight)-this.padding;u=o*n}else{o=Math.min(Math.max(i/n,this.minHeight),this.maxHeight)-this.padding;u=o*n}e.css({height:o,width:u,marginTop:-o/2,marginLeft:-u/2});return e},videosResize:function(){var t;t=this;return t.$videos.each(function(){return t.videoResize(e(this))})}};return n.init()})(jQuery,jQuery(window))}).call(this);

/* **********************************************
     Begin slick.js
********************************************** */

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

/* global window, document, define, jQuery, setInterval, clearInterval */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }

}(function ($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function () {
        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, responsiveSettings, breakpoint;

            _.defaults = {
                accessibility: true,
                arrows: true,
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: 50,
                cssEase: 'ease',
                dots: false,
                draggable: true,
                easing: 'linear',
                fade: false,
                infinite: true,
                lazyLoad: 'ondemand',
                onBeforeChange: null,
                onAfterChange: null,
                onInit : null,
                onReInit : null,
                pauseOnHover: true,
                placeholders: true,
                responsive: null,
                slide: 'div',
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
                swipe: true,
                touchMove: true,
                touchThreshold: 5,
                vertical: false
            };

            _.initials = {
                animating : false,
                autoPlayTimer : null,
                currentSlide : 0,
                currentLeft : null,
                direction : 1,
                dots : null,
                listWidth : null,
                listHeight : null,
                loadIndex : 0,
                nextArrow : null,
                prevArrow : null,
                slideCount : null,
                slideWidth : null,
                slideTrack : null,
                slides : null,
                sliding : false,
                slideOffset : 0,
                placeholderOffset : 0,
                swipeLeft : null,
                list : null,
                touchObject : {},
                transformsEnabled : false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.paused = false;
            _.positionProp = null;
            _.slider = $(element);
            _.slidesCache = null;
            _.cssTransitions = false;
            _.windowWidth = 0;
            _.windowTimer = null;

            _.options = $.extend({}, _.defaults, settings);

            _.originalSettings = _.options;
            responsiveSettings = _.options.responsive ||
                null;

            if (responsiveSettings && responsiveSettings.length > -1) {
                for (breakpoint in responsiveSettings) {
                    if (responsiveSettings.hasOwnProperty(breakpoint)) {
                        _.breakpoints.push(responsiveSettings[
                            breakpoint].breakpoint);
                        _.breakpointSettings[responsiveSettings[
                            breakpoint].breakpoint] =
                            responsiveSettings[breakpoint].settings;
                    }
                }
                _.breakpoints.sort(function (a, b) {
                    return b - a;
                });
            }

            _.autoPlay = $.proxy(_.autoPlay,
                _);
            _.autoPlayClear = $.proxy(_.autoPlayClear,
                _);
            _.changeSlide = $.proxy(_.changeSlide,
                _);
            _.setPosition = $.proxy(_.setPosition,
                _);
            _.swipeHandler = $.proxy(_.swipeHandler,
                _);
            _.dragHandler = $.proxy(_.dragHandler,
                _);
            _.keyHandler = $.proxy(_.keyHandler,
                _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator,
                _);

            _.instanceUid = instanceUid++;
            _.init();

        }

        return Slick;

    }());

    Slick.prototype.addSlide = function (markup, index, addBefore) {

        var _ = this,
            slideTrackChildren;

        if (typeof(index) === "boolean") {
            addBefore = index;
            index = null;
        }

        _.unload();

        slideTrackChildren = _.slideTrack.children(this.options.slide);

        if (typeof(index) === "number") {
            if (index === 0 && $(slideTrackChildren).length === 0) {
                $(markup).appendTo(_.slideTrack);
            } else if (index < 0 || (index >= $(slideTrackChildren).length && $(slideTrackChildren).length !== 0) ) {
                _.reinit();
                return false;
            } else if (addBefore) {
                $(markup).insertBefore($(slideTrackChildren.get(index)));
            } else {
                $(markup).insertAfter($(slideTrackChildren.get(index)));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.slideTrack);
            } else {
                $(markup).appendTo(_.slideTrack);
            }
        }

        _.slides = _.slideTrack.children(this.options.slide);

        _.slideTrack.children(this.options.slide).remove();

        _.slideTrack.append(_.slides);

        _.reinit();

    };

    Slick.prototype.animateSlide = function (targetLeft,
        callback) {

        var animProps = {}, _ = this;

        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.slideTrack.animate({
                    left: targetLeft
                }, _.options.speed,_.options.easing, callback);
            } else {
                _.slideTrack.animate({
                    top: targetLeft
                }, _.options.speed,_.options.easing, callback);
            }

        } else {

            if(_.cssTransitions === false) {

                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function (now) {
                        if (_.options.vertical === false) {
                            animProps[_.animType] = "translate(" +
                                now + "px, 0px)";
                            _.slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = "translate(0px," +
                                now + "px,0px)";
                            _.slideTrack.css(animProps);
                        }
                    },
                    complete: function () {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();

                if (_.options.vertical === false) {
                    animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)";
                } else {
                    animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)";
                }
                _.slideTrack.css(animProps);

                if(callback) {
                    setTimeout(function(){

                    _.disableTransition();

                    callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.applyTransition = function (slide) {

        var _ = this, transition,origin;

        transition = 'all ' + _.options.speed + 'ms ' + _.options.cssEase;
        if (_.options.vertical === false) {
            origin = (_.listWidth / 2) + ' 50%';
        } else {
            origin = '';
        }

        if (_.options.fade === false) {
            _.slideTrack.css({
                transition: transition,
                transformOrigin: origin
            });
        } else {
            $(_.slides.get(slide)).css({
                transition: transition
            });
        }

    };

    Slick.prototype.autoPlay = function () {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

        if(_.slideCount > _.options.slidesToShow && _.paused !== true) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator,
                _.options.autoplaySpeed);
        }

    };

    Slick.prototype.autoPlayClear = function () {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function () {

        var _ = this;

        if (_.options.infinite === false) {

            if (_.direction === 1) {

                if ((_.currentSlide + 1) === _.slideCount -
                    1) {
                    _.direction = 0;
                }

                _.slideHandler(_.currentSlide + _.options
                    .slidesToScroll);

            } else {

                if ((_.currentSlide - 1 === 0)) {

                    _.direction = 1;

                }

                _.slideHandler(_.currentSlide - _.options
                    .slidesToScroll);

            }

        } else {

            _.slideHandler(_.currentSlide + _.options.slidesToScroll);

        }

    };

    Slick.prototype.buildArrows = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.prevArrow = $(
                '<button type="button" tabIndex="-1">Previous</button>').appendTo(
                _.slider).addClass('slick-prev');
            _.nextArrow = $(
                '<button type="button" tabIndex="-1">Next</button>').appendTo(
                _.slider).addClass('slick-next');

            if (_.options.infinite !== true) {
                _.prevArrow.addClass('slick-disabled');
            }

        }

    };

    Slick.prototype.buildDots = function () {

        var _ = this, i, dotString;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            dotString = '<ul class="slick-dots">';

            for (i = 1; i <= _.slideCount; i += 1) {

                dotString += '<li><a href="javascript:void(0)" tabIndex="-1">' + i +
                    '</a></li>';
                if (_.options.placeholders === false && i +
                _.options.slidesToShow - (_.options.slidesToScroll - 1) > _.slideCount) {
                    break;
                }
            }

            dotString += "</ul>";

            _.dots = $(dotString).appendTo(
                _.slider);

            if (_.options.slidesToScroll > 1) {
                _.dots.find('li').hide();
                i = 0;
                while (i < _.slideCount) {
                    $(_.dots.find('li').get(i)).show();
                    i = i + _.options.slidesToScroll;
                }
            }

            _.dots.find('li').first().addClass(
                'slick-active');

        }

    };

    Slick.prototype.buildOut = function () {

        var _ = this;

        _.slides = _.slider.children(_.options.slide +
            ':not(.slick-cloned)').addClass(
            'slick-slide');
        _.slideCount = _.slides.length;
        _.slidesCache = _.slides;

        _.slider.addClass("slick-slider");

        _.slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.slider) :
            _.slides.wrapAll('<div class="slick-track"/>').parent();

        _.list = _.slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.slideTrack.css('opacity', 0);

        if(_.options.accessibility === true) {
            _.list.prop('tabIndex',0);
        }

        if(_.options.centerMode === true) {
            _.options.infinite = true;
            _.options.slidesToScroll = 1;
            if(_.options.slidesToShow % 2 === 0) {
                _.options.slidesToShow = 3;
            }
        }

        $('img[data-lazy]',_.slider).not('[src]').addClass('slick-loading');

        _.setupPlaceholders();

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.setSlideClasses(0);

        if (_.options.draggable === true) {
            _.list.addClass('draggable');
        }

    };

    Slick.prototype.checkResponsive = function () {

        var _ = this, breakpoint, targetBreakpoint;

        if (_.originalSettings.responsive && _.originalSettings
            .responsive.length > -1 && _.originalSettings.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if ($(window).width() < _.breakpoints[
                        breakpoint]) {
                        targetBreakpoint = _.breakpoints[
                            breakpoint];
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        _.options = $.extend({}, _.defaults,
                            _.breakpointSettings[
                                targetBreakpoint]);
                            _.refresh();
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    _.options = $.extend({}, _.defaults,
                        _.breakpointSettings[
                            targetBreakpoint]);
                        _.refresh();
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = $.extend({}, _.defaults,
                        _.originalSettings);
                        _.refresh();
                }
            }

        }

    };

    Slick.prototype.changeSlide = function (event) {

        var _ = this;

        switch (event.data.message) {

        case 'previous':
            _.slideHandler(_.currentSlide - _.options
                .slidesToScroll);
            break;

        case 'next':
            _.slideHandler(_.currentSlide + _.options
            .slidesToScroll);
            break;

        case 'index':
            _.slideHandler($(event.target).parent().index());
            break;

        default:
            return false;
        }

    };

    Slick.prototype.destroy = function () {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        $('.slick-cloned', _.slider).remove();
        $('.slick-placeholder', _.slider).remove();
        if (_.dots) {
            _.dots.remove();
        }
        if (_.prevArrow) {
            _.prevArrow.remove();
            _.nextArrow.remove();
        }
        _.slides.unwrap().unwrap();
        _.slides.removeClass(
            'slick-slide slick-active slick-visible').removeAttr('style');
        _.slider.removeClass('slick-slider');
        _.slider.removeClass('slick-initialized');

        _.list.off('.slick');
        $(window).off('.slick'+_.instanceUid);
    };

    Slick.prototype.disableTransition = function (slide) {

        var _ = this;

        if (_.options.fade === false) {
            _.slideTrack.css({
                transition: '',
                transformOrigin: ''
            });
        } else {
            $(_.slides.get(slide)).css({
                transition: ''
            });
        }

    };

    Slick.prototype.fadeSlide = function (slideIndex, callback) {

        var _ = this;

        if(_.cssTransitions === false) {

            $(_.slides.get(slideIndex)).css({zIndex: 1000});

            $(_.slides.get(slideIndex)).animate({
                opacity: 1
            }, _.options.speed,_.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            $(_.slides.get(slideIndex)).css({
                opacity: 1,
                zIndex: 1000
            });

            if(callback) {
                setTimeout(function(){

                _.disableTransition(slideIndex);

                callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.filterSlides = function (filter) {

        var _ = this;

        if(filter !== null) {

            _.unload();

            _.slideTrack.children(this.options.slide).remove();

            _.slidesCache.filter(filter).appendTo(_.slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.init = function () {

        var _ = this;

        if (!$(_.slider).hasClass('slick-initialized')) {

            $(_.slider).addClass('slick-initialized');
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.checkResponsive();
        }

        if (_.options.onInit !== null) {
            _.options.onInit.call(this, _);
        }

    };

    Slick.prototype.initArrowEvents = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.prevArrow.on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.nextArrow.on('click.slick', {
                message: 'next'
            }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function () {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li a', _.dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

    };

    Slick.prototype.initializeEvents = function () {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();

        if (_.options.swipe === true) {
            _.list.on('touchstart.slick', {
                action: 'start',
                kind: 'touch'
            }, _.swipeHandler);
            _.list.on('touchmove.slick', {
                action: 'move',
                kind: 'touch'
            }, _.swipeHandler);
            _.list.on('touchend.slick', {
                action: 'end',
                kind: 'touch'
            }, _.swipeHandler);
            _.list.on('touchcancel.slick', {
                action: 'end',
                kind: 'touch'
            }, _.swipeHandler);
        }

        if (_.options.draggable === true) {
            _.list.on('mousedown.slick', {
                action: 'start',
                kind: 'drag'
            }, _.swipeHandler);
            _.list.on('mousemove.slick', {
                action: 'move',
                kind: 'drag'
            }, _.swipeHandler);
            _.list.on('mouseup.slick', {
                action: 'end',
                kind: 'drag'
            }, _.swipeHandler);
            _.list.on('mouseleave.slick', {
                action: 'end',
                kind: 'drag'
            }, _.swipeHandler);
        }

        if (_.options.pauseOnHover === true && _.options.autoplay === true) {
            _.list.on('mouseenter.slick', _.autoPlayClear);
            _.list.on('mouseleave.slick', _.autoPlay);
        }

        _.list.on('keydown.slick', _.keyHandler);

        $(window).on('orientationchange.slick.slick'+_.instanceUid, function(){
            _.checkResponsive();
            _.setPosition();
        });

        $(window).on('resize.slick.slick'+_.instanceUid, function () {
            if ($(window).width !== _.windowWidth) {
                clearTimeout(_.windowDelay);
                _.windowDelay = window.setTimeout(function () {
                    _.windowWidth = $(window).width();
                    _.checkResponsive();
                    _.setPosition();
                }, 50);
            }
        });

		$(window).on('load.slick.slick'+_.instanceUid, _.setPosition);
    };

    Slick.prototype.initUI = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.prevArrow.show();
            _.nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.dots.show();

        }

        if (_.options.autoplay === true) {

            _.autoPlay();

        }

    };

    Slick.prototype.keyHandler = function (event) {

        var _ = this;

        if (event.keyCode === 37) {
            _.changeSlide({data: {message: 'previous'}});
        } else if (event.keyCode === 39) {
            _.changeSlide({data: {message: 'next'}});
        }

    };

    Slick.prototype.lazyLoad = function (){

        var _ = this, loadRange, cloneRange, rangeStart, rangeEnd;

        if (_.options.centerMode === true) {
            rangeStart = _.options.slidesToShow + _.currentSlide - 1;
            rangeEnd = rangeStart + _.options.slidesToShow + 2;
        } else {
            rangeStart = _.options.slidesToShow + _.currentSlide;
            rangeEnd = rangeStart + _.options.slidesToShow;
        }

        loadRange = _.slider.find('.slick-slide').slice(rangeStart,rangeEnd);

        $('img[data-lazy]',loadRange).not('[src]').each(function(){
            $(this).attr('src', $(this).attr('data-lazy')).removeClass('slick-loading');
        });

        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.slider.find('.slick-cloned').slice(0,_.options.slidesToShow);
            $('img[data-lazy]',cloneRange).not('[src]').each(function(){
                $(this).attr('src', $(this).attr('data-lazy')).removeClass('slick-loading');
            });
        } else if (_.currentSlide === 0) {
            cloneRange = _.slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            $('img[data-lazy]',cloneRange).not('[src]').each(function(){
                $(this).attr('src', $(this).attr('data-lazy')).removeClass('slick-loading');
            });
        }

    };

    Slick.prototype.loadSlider = function () {

        var _ = this;

        _.setPosition();

        _.slideTrack.css({
            opacity: 1
        });

        if (document.readyState !== "complete") {

            $(window).load(function () {

                _.slider.removeClass('slick-loading');

                _.initUI();

                if (_.options.lazyLoad === 'progressive') {
                    _.progressiveLazyLoad();
                }

            });

        } else {

            _.slider.removeClass('slick-loading');

            _.initUI();

            if (_.options.lazyLoad === 'progressive') {
                _.progressiveLazyLoad();
            }

        }

    };

    Slick.prototype.postSlide = function (index) {

        var _ = this;

        if (_.options.onAfterChange !== null && index !== _.currentSlide) {
            _.options.onAfterChange.call(this, _, index);
        }

        _.animating = false;

        _.currentSlide = index;

        _.setPosition();

        _.swipeLeft = null;

        _.updateDots();

        _.updateArrows();

        if (_.options.autoplay === true && _.paused === false) {
            _.autoPlay();
        }

        _.setSlideClasses(_.currentSlide);

    };

    Slick.prototype.progressiveLazyLoad = function () {

        var _ = this, imgCount, targetImage;

        imgCount = $('img[data-lazy]').not('[src]').length;

        if(imgCount > 0) {
            targetImage = $($('img[data-lazy]', _.slider).not('[src]').get(0));
            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function(){
                _.progressiveLazyLoad();
            });
        }

    };

    Slick.prototype.refresh = function () {

        var _ = this;

        _.destroy();

        $.extend(_, _.initials);

        _.init();

    };

    Slick.prototype.reinit = function () {

        var _ = this;

        _.slides = $(_.options.slide +
            ':not(.slick-cloned)', _.slideTrack).addClass(
            'slick-slide');

        _.slideCount = _.slides.length;

        if(_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        _.setProps();

        _.setupPlaceholders();

        _.setupInfinite();

        _.buildArrows();

        _.updateArrows();

        _.initArrowEvents();

        _.buildDots();

        _.updateDots();

        _.initDotEvents();

        _.setSlideClasses(0);

        _.setPosition();

        if (_.options.onReInit !== null) {
            _.options.onReInit.call(this, _);
        }

    };

    Slick.prototype.removeSlide = function (index, removeBefore) {

        var _ = this;

        if (typeof(index) === "boolean") {
            removeBefore = index;
            index = null;
        }

        _.unload();

        if (_.slideCount < 1) {
            return false;
        }

        if (typeof(index) === "number") {
            if (removeBefore === true) {
                --index;
            } else if (removeBefore === false) {
               ++index;
            }
        } else {
            if (removeBefore === true) {
                index = 0;
            } else {
                index = $(_.slideTrack.children(this.options.slide)).length - 1;
            }
        }

        if (index < 0 || index >= $(_.slideTrack.children(this.options.slide)).length) {
            _.reinit();
            return false;
        }

        $(_.slideTrack.children(this.options.slide).get(index)).remove();

        _.slides = _.slideTrack.children(this.options.slide);

        _.slideTrack.children(this.options.slide).remove();

        _.slideTrack.append(_.slides);

        _.reinit();

    };

    Slick.prototype.setCSS = function (position) {

        var _ = this, positionProps = {}, x, y;

        x = _.positionProp == 'left' ? position + 'px' : '0px';
        y = _.positionProp == 'top' ? position + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if(_.cssTransitions === false) {
                positionProps[_.animType] = "translate(" + x + ", " + y + ")";
                _.slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)";
                _.slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function () {

        var _ = this;

        if(_.options.centerMode === true) {
            _.list.find('.slick-slide').width(_.slideWidth);
        } else {
            _.list.find('.slick-slide').width(_.slideWidth);
        }


        if (_.options.vertical === false) {
            _.slideTrack.width(Math.ceil((_.slideWidth * _
                .slider.find('.slick-slide').length)));
            if(_.options.centerMode ===  true) {
                _.list.css({padding: ('0px ' + _.options.centerPadding + 'px')});
            }
        } else {
            _.list.height(_.slides.first().outerHeight());
            _.slideTrack.height(Math.ceil((_.listHeight * _
                .slider.find('.slick-slide').length)));
                if(_.options.centerMode ===  true) {
                _.list.css({padding: (_.options.centerPadding + 'px 0px')});
            }
        }

    };

    Slick.prototype.setFade = function () {

        var _ = this, targetLeft;

        _.slides.each(function (index,element) {
            targetLeft = (_.slideWidth * index) * -1;
            $(element).css({
                position: 'relative',
                left: targetLeft,
                top: 0,
                zIndex: 800,
                opacity: 0
            });
        });

        $(_.slides.get(_.currentSlide)).css({
            zIndex: 900,
            opacity: 1
        });

    };

    Slick.prototype.setPosition = function () {

        var _ = this, targetPosition, targetSlide;

        targetSlide = _.currentSlide;

        _.setValues();
        _.setDimensions();

        _.slideOffset = 0;

        if (_.options.infinite === true) {
            if(_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
            }
        }

        if (_.options.centerMode === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        }

        if (_.options.placeholders === false) {
            if(_.currentSlide + _.options.slidesToScroll >= _.slideCount - _.options.slidesToScroll) {
                _.slideOffset = _.slideOffset - ((_.slideWidth * _.placeholderOffset) * -1);
            }
        }

        if (_.options.fade === false) {
            if (_.options.vertical === false) {
                targetPosition = ((targetSlide *
                        _.slideWidth) * -1) + _.slideOffset;
            } else {
                targetPosition = ((targetSlide *
                        _.listHeight) * -1) - _.listHeight;
            }
            _.setCSS(targetPosition);
        } else {
            _.setFade();
        }

    };

    Slick.prototype.setProps = function () {

        var _ = this;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.slider.addClass('slick-vertical');
        } else {
            _.slider.removeClass('slick-vertical');
        }

        if ( document.body.style.WebkitTransition !== undefined ||
             document.body.style.MozTransition !== undefined ||
             document.body.style.msTransition !== undefined ) {
                _.cssTransitions = true;
        }

        if (document.body.style.MozTransform !== undefined) _.animType = 'MozTransform';
        if (document.body.style.webkitTransform !== undefined) _.animType = 'webkitTransform';
        if (document.body.style.msTransform !== undefined) _.animType = 'msTransform';

        _.transformsEnabled = (_.animType !== null);

    };

    Slick.prototype.setValues = function () {

        var _ = this;

        _.listWidth = _.list.width();
        _.listHeight = _.list.height();
        _.slideWidth = Math.ceil(_.listWidth / _.options
            .slidesToShow);

    };

    Slick.prototype.setSlideClasses = function (index) {

        var _ = this, centerOffset, allSlides, indexOffset;

        _.slider.find('.slick-slide').removeClass('slick-active').removeClass('slick-center');
        allSlides = _.slider.find('.slick-slide');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if(index >= centerOffset && index <= (_.slideCount - 1) -  centerOffset) {
                _.slides.slice(index - centerOffset, index + centerOffset + 1).addClass('slick-active');
            } else {
                indexOffset = _.options.slidesToShow + index;
                allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass('slick-active');
            }

            if(index === 0) {
                $(allSlides.get(allSlides.length - 1 - _.options.slidesToShow)).addClass('slick-center');
            } else if (index === _.slideCount - 1) {
                $(allSlides.get(_.options.slidesToShow)).addClass('slick-center');
            }

            $(_.slides.get(index)).addClass('slick-center');

        } else {

            if(index > 0 && index < (_.slideCount - _.options.slidesToShow)) {
                _.slides.slice(index, index + _.options.slidesToShow).addClass('slick-active');
            } else {
                indexOffset = _.options.slidesToShow + index;
                allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active');
            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function () {

        var _ = this, i, slideIndex, infiniteCount;

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if(_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                    infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.slides[slideIndex]).clone().prependTo(
                        _.slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.slides[slideIndex]).clone().appendTo(
                        _.slideTrack).addClass('slick-cloned');
                }

            }

        }

    };

    Slick.prototype.setupPlaceholders = function () {

        var _ = this, i, placeholders;

        if(_.options.fade === true || _.options.vertical === true) {
            _.options.slidesToShow = 1;
            _.options.slidesToScroll = 1;
            _.options.centerMode = false;
        }

        if(_.options.placeholders === false) {
            _.options.infinite = false;
            _.placeholderOffset = _.slideCount % _.options.slidesToScroll;
            return false;
        }

        if ((_.slideCount % _.options.slidesToScroll) !==
            0 && _.slideCount > _.options.slidesToShow) {

            placeholders = Math.abs(_.options.slidesToScroll -
                (_.slideCount % _.options.slidesToScroll)
            );
            for (i = 0; i < placeholders; i += 1) {
                $('<div/>').appendTo(_.slideTrack).addClass(
                    'slick-slide slick-placeholder');
            }
            _.slides = $('.slick-slide:not(.slick-cloned)',
                _.slider);
            _.slideCount = _.slides.length;
        }

    };

    Slick.prototype.slideHandler = function (index) {

        var targetSlide, animSlide, slideLeft, targetLeft = null,
            targetOffset, _ = this;

        if(_.animating === true) {
            return false;
        }

        targetSlide = index;
        targetOffset = _.slideOffset;

        if(_.options.placeholders === false) {
            if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
                if (targetSlide >= _.slideCount - _.options.slidesToShow) {
                    targetSlide = _.currentSlide;
                } else {
                    targetOffset = 0;
                }
            } else if (targetSlide + _.options.slidesToScroll >= _.slideCount -
                _.options.slidesToScroll) {
                targetOffset = ((_.placeholderOffset * _.slideWidth));
            }
        }

        if(_.options.vertical === false) {
            targetLeft = ((targetSlide * _.slideWidth) * -1) + targetOffset;
            slideLeft = ((_.currentSlide * _.slideWidth) * -1) + targetOffset;
        } else {
            targetLeft = ((targetSlide * _.listHeight) * -1) - _.listHeight;
            slideLeft = ((_.currentSlide * _.listHeight) * -1) - _.listHeight;
        }

        if (_.options.infinite === false && (index < 0 || index > (_.slideCount -1))) {
            targetSlide = _.currentSlide;
            _.animateSlide(slideLeft, function () {
                _.postSlide(targetSlide);
            });
            return false;
        }

        if (_.options.autoplay === true) {
            clearInterval(_.autoPlayTimer);
        }

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (targetSlide < 0) {
            animSlide = _.slideCount - _.options.slidesToScroll;
        } else if (targetSlide > (_.slideCount - 1)) {
            animSlide = 0;
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        if (_.options.onBeforeChange !== null && index !== _.currentSlide) {
            _.options.onBeforeChange.call(this, _, _.currentSlide);
        }

        if (_.options.fade === true) {
            _.fadeSlide(animSlide, function(){
                _.postSlide(animSlide);
            });
            return false;
        }
        _.animateSlide(targetLeft, function () {
            _.postSlide(animSlide);
        });

    };

    Slick.prototype.startLoad = function () {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.prevArrow.hide();
            _.nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.dots.hide();

        }

        _.slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function () {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return 'left';
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return 'left';
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return 'right';
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function (event) {

        var _ = this;

        _.list.removeClass('dragging');

        if(_.touchObject.curX === undefined) {
            return false;
        }

        if ((_.touchObject.fingerCount !== 0) && event.data.kind !== 'drag') {
            _.touchObject = {};
            return false;
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            $(event.target).on("click.slick", function (event) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
                $(event.target).off("click.slick");
            });

            switch (_.swipeDirection()) {
                case 'left':
                    _.slideHandler(_.currentSlide + _.options.slidesToScroll);
                    _.touchObject = {};
                break;

                case 'right':
                    _.slideHandler(_.currentSlide - _.options.slidesToScroll);
                    _.touchObject = {};
                break;
            }

        } else {
            _.slideHandler(_.currentSlide);
            _.touchObject = {};
        }

    };

    Slick.prototype.swipeHandler = function (event) {

        var _ = this;

        if(event.originalEvent !== undefined) {
            _.touchObject.fingerCount = event.originalEvent.touches !== undefined ?
                event.originalEvent.touches.length : 1;
        }

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        switch (event.data.action) {

        case 'start':
            _.swipeStart(event);
            break;

        case 'move':
            _.swipeMove(event);
            break;

        case 'end':
            _.swipeEnd(event);
            break;

        }

    };

    Slick.prototype.swipeMove = function (event) {

        var _ = this, curLeft, swipeDirection, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        curLeft = _.options.vertical === false ? ((_.currentSlide * _.slideWidth) * -1) +
                _.slideOffset : ((_.currentSlide * _.listHeight) * -1) -
                _.listHeight;

        if (_.options.placeholders === false && _.currentSlide +
            _.options.slidesToShow >= _.slideCount) {
            curLeft = ((_.currentSlide * _.slideWidth) * -1) + _.slideOffset;
        }

        if((!_.list.hasClass('dragging') && event.data.kind === 'drag') ||
            touches && touches.length !== 1){
            return false;
        }

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return false;
        }

        if(event.originalEvent !== undefined) {
            event.preventDefault();
        }

        positionOffset = _.touchObject.curX > _.touchObject.startX ? 1 : -1;

        if(_.options.vertical === false) {
            _.swipeLeft = curLeft + _.touchObject.swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (_.touchObject
                    .swipeLength * (_.listHeight / _.listWidth)) * positionOffset;
        }

        if(_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function (event) {

        var _ = this, touches;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if(event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.list.addClass('dragging');

    };

    Slick.prototype.unfilterSlides = function () {

        var _ = this;

        if(_.slidesCache !== null) {

            _.unload();

            _.slideTrack.children(this.options.slide).remove();

            _.slidesCache.appendTo(_.slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function () {

        var _ = this;

        $('.slick-cloned', _.slider).remove();
        $('.slick-placeholder', _.slider).remove();
        if (_.dots) {
            _.dots.remove();
        }
        if (_.prevArrow) {
            _.prevArrow.remove();
            _.nextArrow.remove();
        }
        _.slides.removeClass(
            'slick-slide slick-active slick-visible').removeAttr('style');

    };

    Slick.prototype.updateArrows = function () {

        var _ = this;

        if (_.options.arrows === true && _.options.infinite !==
            true && _.slideCount > _.options.slidesToShow) {
            if (_.currentSlide === 0) {
                _.prevArrow.addClass('slick-disabled');
                _.nextArrow.removeClass('slick-disabled');
            } else if (_.currentSlide >= (_.slideCount /
                _.options.slidesToScroll * _.options.slidesToShow
            ) - _.options.slidesToScroll) {
                _.nextArrow.addClass('slick-disabled');
                _.prevArrow.removeClass('slick-disabled');
            } else if (_.options.placeholders === false && _.currentSlide +
                _.options.slidesToShow >= _.slideCount) {
                _.nextArrow.addClass('slick-disabled');
                _.prevArrow.removeClass('slick-disabled');
            } else {
                _.prevArrow.removeClass('slick-disabled');
                _.nextArrow.removeClass('slick-disabled');
            }
        }

    };

    Slick.prototype.updateDots = function () {

        var _ = this;

        if(_.dots !== null) {

            _.dots.find('li').removeClass('slick-active');
            $(_.dots.find('li').get(_.currentSlide)).addClass(
                'slick-active');

        }

    };

    $.fn.slick = function (options) {
        var _ = this;
        return _.each(function (index, element) {

            element.slick = new Slick(element, options);

        });
    };

    $.fn.slickAdd = function (slide, slideIndex, addBefore) {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.addSlide(slide, slideIndex, addBefore);

        });
    };

    $.fn.slickFilter = function (filter) {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.filterSlides(filter);

        });
    };

    $.fn.slickGoTo = function (slide) {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.slideHandler(slide);

        });
    };

    $.fn.slickNext = function () {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.changeSlide({data: {message: 'next'}});

        });
    };

    $.fn.slickPause = function () {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.autoPlayClear();
           element.slick.paused = true;

        });
    };

    $.fn.slickPlay = function () {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.paused = false;
           element.slick.autoPlay();

        });
    };

    $.fn.slickPrev = function () {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.changeSlide({data: {message: 'previous'}});

        });
    };

    $.fn.slickRemove = function (slideIndex, removeBefore) {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.removeSlide(slideIndex, removeBefore);

        });
    };

    $.fn.slickSetOption = function (option, value, refresh) {
        var _ = this;
        return _.each(function (index, element) {

        element.slick.options[option] = value;

        if(refresh === true) {
            element.slick.unload();
            element.slick.reinit();
        }

        });
    };

    $.fn.slickUnfilter = function () {
        var _ = this;
        return _.each(function (index, element) {

           element.slick.unfilterSlides();

        });
    };

    $.fn.unslick = function () {
        var _ = this;
        return _.each(function (index, element) {

            element.slick.destroy();

        });
    };

}));

/* **********************************************
     Begin dias.js
********************************************** */

(function ($, $win) {
  'use strict';

  // var $map = $('#map'),
  //     $chart = $("#myChart"),
  //     $contact = $('#contact-form>div'),
  //     touchDevice = 'ontouchstart' in window || 'onmsgesturechange' in window,
  //     MAXWIDTH = 1160;

  // if( touchDevice ) {
  //   $('html').addClass('touch-device');
  // }

  // if( $map.length ) {
  //   var map = L.map('map').setView([51.522755, -0.086504], 17);
  //   var t, i, n, o, s, a = document.getElementsByTagName("script"),
  //     r = /[\/^]dias-ck[\-\._]?([\w\-\._]*)\.js\??/;
  //   for (t = 0, i = a.length; i > t; t++)
  //     if (n = a[t].src, o = n.match(r)) s = n.split(r)[0], (s ? s + "/" : "");

  //   L.Icon.Default.imagePath = s + "/libs/leaflet/images";

  //   map.scrollWheelZoom.disable();

  //   L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
  //       maxZoom: 18
  //   }).addTo(map);

  //   var marker = L.marker([51.522555, -0.085304]).addTo(map);
  // }

  // if( $contact.length ) {
  //   // "complex" layout in contact page requires some JS
  //   // to make sure the contact form is aligned left with content
  //   // when the browser is wider than our max width
  //   $win.resize(function() {
  //     var left = 0,
  //         sideMargin = $win.width() - MAXWIDTH;

  //     if( sideMargin > 0 ) {
  //       left = sideMargin / 2;
  //     }

  //     $contact.css('paddingLeft', left + 'px');
  //   }).resize();
  // }

  document.addEventListener("touchstart", function(){}, true);

    // Scroll funcitons ////////////////////////////////////////////////////////////////////////////
    //
    var dias_scroll = {
        scrollPos: 0,
        MAX_MARGIN: 20,
        MIN_MARGIN: 0,
        init: function() {
            var ds = this;

            ds.cacheItems();
            ds.bindEvents();
        },
        cacheItems: function() {
            var ds = this;

            ds.$win = $(window);
            ds.$doc = $(document);
            ds.$header = $('#float-header');

            ds.MAX_MARGIN = parseInt(ds.$header.css('marginTop'), 10);
        },
        bindEvents: function() {
            var ds = this;

            ds.$win.scroll(function() {
                ds.scrollPos = ds.$doc.scrollTop();
                ds.headSticking();
            });
        },
        headSticking: function() {
            var ds = this,
              newMargin = Math.max(ds.MAX_MARGIN - ds.scrollPos, ds.MIN_MARGIN);

            ds.$header.css('marginTop', newMargin + 'px');
        }
    };

    dias_scroll.init();

    $('body').on('click', '[href^="#"]', function(e) {
        var $this = $(this),
            id = $this.attr('href').toString(),
            $item = $(id);

        if( $item.length ) {
          e.preventDefault();

          $('html, body').animate({
              scrollTop: ($item.offset().top - 110)
          }, 600);
        }

    });

    if( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ) {
      $('body').addClass('ios');
    }

    //
    // Scroll funcitons end ////////////////////////////////////////////////////////////////////////

    var $imageInProjectPage = $('#project-page');

    if( $imageInProjectPage.length ) {

      $imageInProjectPage.find('p img').each(function() {
        $(this).closest('p').addClass('image-container clearfix');
      });

      $imageInProjectPage.find('iframe').each(function() {
        var $this = $(this);
        $this.wrap('<div class="embed-container">').closest('p').addClass('image-container');
      });
    }


    var $contact = $('#contact');

    var $menuItem = $('#menu-primary a[href$="#contact"]').parent();

    if( $contact.length ) {
    $contact.scroll(function() {
      if ($contact.offset().top < $(window).scrollTop() + $(document).height() && $contact.offset().top + $contact.height() > $(window).scrollTop()) {
        $menuItem.addClass('current-menu-item');
      });
    }
  }


$(document).ready(function(){
  $('.carousel').slick();
});




}(jQuery, jQuery(window)));