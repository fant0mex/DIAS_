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


  var $testimonial = $('#testimonial .rotate');
  if( $testimonial.length ) {
    var counter = 0;
    setInterval(function(){
      if (counter >= $testimonial.length) {
          counter = 0;
    }
      console.log(counter);
    $testimonial.eq(counter).fadeIn(1000).delay(5000).fadeOut(1000);
    counter ++;
    }, 7000);

}




  $('.carousel').slick();

}(jQuery, jQuery(window)));