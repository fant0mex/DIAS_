(function ($, $win) {
  'use strict';

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
          ds.$hero = $('#hero');

          ds.MAX_MARGIN = parseInt(ds.$header.css('marginTop'), 10);
      },
      bindEvents: function() {
          var ds = this;

          ds.$win.scroll(function() {
              ds.scrollPos = ds.$doc.scrollTop();
              ds.headSticking();
          });

          if( ds.$hero.length ) {

            ds.$win.resize(function() {
              ds.cacheParallaxVars();
            });

            ds.$win.resize();

            ds.$win.scroll(function() {
              ds.heroParallax();
            });
          }
      },
      headSticking: function() {
          var ds = this,
            newMargin = Math.max(ds.MAX_MARGIN - ds.scrollPos, ds.MIN_MARGIN);

          ds.$header.css('marginTop', newMargin + 'px');
      },
      cacheParallaxVars: function() {
        var ds = this;

        ds.hero_offset = ds.$hero.offset().top;
        ds.hero_height = ds.$hero.outerHeight();
        ds.hero_windowHeight = $(window).height();
        ds.hero_speed = -0.5;
      },
      heroParallax: function() {
        var ds = this;

        // Check if above or below viewport

        var yBgPosition = Math.round((ds.hero_offset - ds.scrollPos) * ds.hero_speed);
          // Apply the Y Background Position to Set the Parallax Effect
          ds.$hero.css('background-position', 'center ' + yBgPosition + 'px');
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


  var $contact = $('#contact'),
      $menuItem = $('#menu-primary a[href$="#contact"]').parent();

  if( $contact.length ) {
    $win.scroll(function() {
      if ($contact.offset().top < $win.scrollTop() + $win.height() && $contact.offset().top + $contact.height() > $win.scrollTop()) {
        $menuItem.addClass('forced-current-menu-item');
      } else {
        $menuItem.removeClass('forced-current-menu-item');
      }
    });
  }


  var $testimonial = $('#testimonial'),
    $testimonials = $testimonial.find('.rotate'),
    testimonialLength = $testimonials.length,
    testimonialCounter = 0,
    setTestimonialHeight = function($items) {
      var maxHeight = 0;

      $items.each(function() {
        var $item = $(this),
          visible = $item.is(':visible');

        $items.addClass('hidden');
        $item.removeClass('hidden').show();

        var itemHeight = $testimonial.outerHeight(true);

        maxHeight = Math.max(itemHeight, maxHeight);

        $items.removeClass('hidden');

        if( !visible ) {
          $item.hide();
        }
      });

      $testimonial.css('minHeight', maxHeight + 'px');
    }, switchTestimonial = function() {
      if (testimonialCounter >= testimonialLength) {
          testimonialCounter = 0;
      }

      $testimonials.eq(testimonialCounter).fadeIn(1000).delay(5000).fadeOut(1000);
      testimonialCounter ++;

      setTimeout(switchTestimonial, 7100);
    };


  if( testimonialLength ) {
    var counter = 0;

    $win.resize(function() {
      setTestimonialHeight($testimonials);
    });

    $win.resize();

    switchTestimonial();
  }

  $('.carousel').slick();

}(jQuery, jQuery(window)));