// Generated by CoffeeScript 1.6.3
(function(){(function(e,t){"use strict";var n;n={maxHeight:1440,maxWidth:2560,minHeight:240,minWidth:280,padding:0,init:function(){var e;e=this.cacheItems();return e?this.bindEvents():!1},cacheItems:function(){this.$videos=e(".dias-video-filler video, .dias-video-filler iframe");if(this.$videos.length<1)return!1;this.$videos.each(function(){var t;t=e(this);return t.data("parent",t.parent())});return this.$videos.css({left:"50%",top:"50%"})},bindEvents:function(){var n;n=this;this.$videos.bind("load loadedmetadata",function(){return n.cacheAspect(e(this))});t.bind("resize",function(){return n.videosResize()});return t.resize()},cacheAspect:function(e){var t,n;e.css({width:"100%",height:"auto"});n=e.width();t=e.height();e.data("ratio",n/t);return this.videoResize(e)},videoResize:function(e){var t,n,r,i,s,o,u;n=e.data("ratio");t=e.data("parent");r=t.height();i=t.width();n==null&&(n=e.width()/e.height());s=i/r;if(s<n){o=Math.min(Math.max(r,this.minHeight),this.maxHeight)-this.padding;u=o*n}else{o=Math.min(Math.max(i/n,this.minHeight),this.maxHeight)-this.padding;u=o*n}e.css({height:o,width:u,marginTop:-o/2,marginLeft:-u/2});return e},videosResize:function(){var t;t=this;return t.$videos.each(function(){return t.videoResize(e(this))})}};return n.init()})(jQuery,jQuery(window))}).call(this);