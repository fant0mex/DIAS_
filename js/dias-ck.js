(function(e,t){"use strict";var n=e("#map"),r=e("#myChart"),i=e("#contact-form>div"),s=e(".our-work"),o=1160;if(n.length){var u=L.map("map").setView([51.522755,-0.086504],17);u.scrollWheelZoom.disable();L.tileLayer("http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png",{maxZoom:18}).addTo(u);var a=L.marker([51.522555,-0.085304]).addTo(u)}if(r.length)var f=r.get(0).getContext("2d"),l=new Chart(f);i.length&&t.resize(function(){var e=0,n=t.width()-o;n>0&&(e=n/2);i.css("paddingLeft",e+"px")}).resize();s.length&&s.each(function(){e(this).hoverdir()})})(jQuery,jQuery(window));