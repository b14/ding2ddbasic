(function($) {
  
  $(function () {
    // Set height for event teasers
    var ding_event_teaser_height;
    $(window).bind('resize.ding_event_teaser', function (evt) {
      $('.node-ding-event.node-teaser').each(function (delta, view) {
        ding_event_teaser_height = $(this).children('.inner').outerHeight();
        $(this).height(ding_event_teaser_height);
      });
      
    }).triggerHandler('resize.ding_event_teaser');
  });
  
  // Hover functions for event teasers
  Drupal.behaviors.ding_event_teaser_hover = {
    attach: function(context, settings) {
      $('.node-ding-event.node-teaser > .inner', context).mouseenter(function() {
        var $hovered = $(this);
        // Set timeout to make shure element is still above while it animates out
        setTimeout(function(){
          $('.node-ding-event.node-teaser > .inner').css('z-index', '');
          $hovered.css('z-index', '1');
        }, 300);
      });
    }
  };
  
})(jQuery);