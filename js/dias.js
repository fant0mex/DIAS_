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

            if( $('body.home').length ) {
              ds.$win.scroll(function() {
                ds.homePageFade();
              });
            }
        },
        headSticking: function() {
            var ds = this,
              newMargin = Math.max(ds.MAX_MARGIN - ds.scrollPos, ds.MIN_MARGIN);

            ds.$header.css('marginTop', newMargin + 'px');
        },
        homePageFade: function() {
           var ds = this;

            if( ds.scrollPos > ds.MAX_MARGIN ) {
              ds.$header.addClass('show');
            } else {
              ds.$header.removeClass('show');
            }
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


$(document).ready(function(){
  $('.carousel').slick();
});


}(jQuery, jQuery(window)));