(function($, $win) {
  'use strict';

  document.addEventListener('touchstart', function() {}, true);

  // Scroll funcitons ////////////////////////////////////////////////////////////////////////////
  //
  var diasScroll = {
    scrollPos: 0,
    MAX_MARGIN: 20,
    MIN_MARGIN: 0,
    init: function() {
      this.cacheItems();
      this.bindEvents();
    },

    cacheItems: function() {
      this.$win = $(window);
      this.$doc = $(document);
      this.$header = $('#float-header');
      this.$hero = $('#hero');

      this.MAX_MARGIN = parseInt(this.$header.css('marginTop'), 10);
    },

    bindEvents: function() {
      this.$win.scroll(function() {
        this.scrollPos = this.$doc.scrollTop();
        this.headSticking();
      }.bind(this));

      if (!this.$hero.length) {
        return;
      }

      this.$win.resize(this.cacheParallaxVars.bind(this));

      this.$win.resize();

      this.$win.scroll(this.heroParallax.bind(this));
    },

    headSticking: function() {
      var newMargin = Math.max(this.MAX_MARGIN - this.scrollPos, this.MIN_MARGIN);

      this.$header.css('marginTop', newMargin + 'px');
    },

    cacheParallaxVars: function() {
      this.heroOffset = this.$hero.offset().top;
      this.heroHeight = this.$hero.outerHeight();
      this.heroWindowHeight = $(window).height();
      this.heroSpeed = -0.5;
    },

    heroParallax: function() {
        // Check if above or below viewport
        var yBgPosition = Math.round((this.heroOffset - this.scrollPos) * this.heroSpeed);

        // Apply the Y Background Position to Set the Parallax Effect
        this.$hero.css('background-position', 'center ' + yBgPosition + 'px');
      }
  };

  diasScroll.init();

  $('body').on('click', '[href^="#"]', function(e) {
    var $this = $(this);
    var id = $this.attr('href').toString();
    var $item = $(id);

    if ($item.length) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: ($item.offset().top - 110)
      }, 600);
    }

  });

  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
    $('body').addClass('ios');
  }

  //
  // Scroll funcitons end ////////////////////////////////////////////////////////////////////////

  var $imageInProjectPage = $('#project-page');

  if ($imageInProjectPage.length) {

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

  if ($contact.length) {
    $win.scroll(function() {
      if ($contact.offset().top < $win.scrollTop() + $win.height() && $contact.offset().top + $contact.height() > $win.scrollTop()) {
        $menuItem.addClass('forced-current-menu-item');
      } else {
        $menuItem.removeClass('forced-current-menu-item');
      }
    });
  }

  var $testimonial = $('#testimonial .rotate');
  var $testimonialLength = $testimonial.length;

  if ($testimonialLength) {
    var counter = 0;
    setInterval(function() {
      if (counter >= $testimonialLength) {
        counter = 0;
      }

      $testimonial.eq(counter).fadeIn(1000).delay(5000).fadeOut(1000);
      counter++;
    }, 7000);
  }

  $('.carousel').slick();

}(jQuery, jQuery(window)));
