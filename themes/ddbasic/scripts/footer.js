(function($) {
  /**
   * Close button for Cookies pop-up
   */
  Drupal.behaviors.mobile_footer = {
    attach: function(context, settings) {
      $('.footer .footer-inner > .panel-pane .pane-title', context).click(function(){
        $(this).parent().find(".pane-content").slideToggle("fast");
      });
    }
  };
})(jQuery);