(function($) {
  
  //
  // Remove extra teasers in event max-two-rows views when other teasers has image
  Drupal.behaviors.ding_event_view = {
    attach: function(context, settings) {
      var number_of_teasers = 0;
      $('.view-ding-event.max-two-rows .views-row').each(function( index ) {
        if($(this).find('.event-list-image').length) {
          number_of_teasers = number_of_teasers + 2;
        }
        else {
          number_of_teasers = number_of_teasers + 1;
        }
        if(number_of_teasers > 6) {
          $(this).remove();
        }
      });
    }
  };
  
  // Add masonry to event views
  $(function () {
    $(window).bind('resize.ding_event_masonry', function (evt) {
      switch (ddbasic.breakpoint.is('mobile', 'event_masonry')) {
        case ddbasic.breakpoint.IN:
          $('.view-ding-event .group-separator .view-elements').masonry('destroy');
          break;
        case ddbasic.breakpoint.OUT:
          $('.view-ding-event .group-separator .view-elements').masonry({
            itemSelector: '.views-row',
            columnWidth: '.grid-sizer',
            gutter: '.grid-gutter',
            percentPosition: true,
          });
          break;
      }
    });
  });
  
  // Call masonry resize when images are loaded
  Drupal.behaviors.ding_event_teaser_masonry = {
    attach: function(context, settings) {
      $('.view-ding-event .group-separator .view-elements', context).imagesLoaded( function() {
        $(window).triggerHandler('resize.ding_event_masonry');
      });
    }
  };
  
  
  $(function () {
    $(window).bind('resize.ding_event_flex_order', function (evt) {
      // Set flex order on rows in event max-two-rows views
      var rows = $('.view-ding-event.max-two-rows .view-elements .view-elements-inner > .views-row'),
          row_total = 0,
          row_order = 0,
          has_image,
          is_tablet = ddbasic.breakpoint.is('tablet', 'flex-order');
      
      if (is_tablet !== ddbasic.breakpoint.NOP) {
        if(rows.length < 4) {
          $('.view-ding-event.max-two-rows').addClass('no-flex');
        }
        else {
          $('.view-ding-event.max-two-rows').addClass('flex');
          console.log('4');
          rows.each(function( index ) {
            if ($(this).children('.node-teaser').hasClass('has-image')) {
              row_total = row_total + 2;
              has_image = true;
            } else {
              row_total = row_total + 1;
              has_image = false;
            }
            
            // If odd and has image
            if (row_total % (is_tablet == ddbasic.breakpoint.IN ? 3 : 2) == 1 && has_image == true) {
              row_order = row_order - 1;
            } 
            else {
              row_order = row_order + 1;
            }
            
            // Set css order on rows
            $(this).attr('style',  'order:' + row_order);
            
          });
        }
      }
    
    }).triggerHandler('resize.ding_event_flex_order');
  });
  
  $(function () {
    // Set and destroy slick slider on views
    var event_view_rows = $(".view-ding-event.max-two-rows .view-elements-inner > .views-row");
    $(window).bind('resize.ding_view_slide', function (evt) {
      switch (ddbasic.breakpoint.is('mobile', 'view_slide')) {
        case ddbasic.breakpoint.IN:
          // Event max-two-rows view
          $('.view-ding-event.max-two-rows').removeClass('flex');
          $('.view-ding-event.max-two-rows').addClass('no-flex');
          for(var i = 0; i < event_view_rows.length; i+=2) {
            event_view_rows.slice(i, i+2).wrapAll("<div class='two-slides'></div>"); // wrap slides in containers of 2
          }
          $('.view-ding-event.max-two-rows .view-elements-inner').slick({
            arrows: true,
            infinite: false,
            slidesToScroll: 1,
            slidesToShow: 1
          });
          
          // Slide-on-mobile views
          $('.view.slide-on-mobile .view-content').slick({
            arrows: true,
            infinite: false,
            slidesToScroll: 1,
            slidesToShow: 1
          });
          
          break;
        case ddbasic.breakpoint.OUT:
          // Event max-two-rows view
          $('.view-ding-event.max-two-rows .view-elements-inner.slick-initialized').slick('unslick');
          $('.two-slides .views-row').unwrap();
          if(event_view_rows.length > 3) {
            $('.view-ding-event.max-two-rows').removeClass('no-flex');
            $('.view-ding-event.max-two-rows').addClass('flex');
          } 
          
          // Slide-on-mobile views
          $('.view.slide-on-mobile .view-content.slick-initialized').slick('unslick');
          
          break;
      }
    }).triggerHandler('resize.ding_view_slide');
  });
  
})(jQuery);