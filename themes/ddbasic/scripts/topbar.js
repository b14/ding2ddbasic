(function($) {
  // User login
  Drupal.behaviors.user_login = {
    attach: function(context, settings) {
      var topbar_height;
      $('.topbar-link-user').click(function(evt) {
        evt.preventDefault();
        $('body').addClass('topbar-is-open');
        topbar_height = $('.topbar .pane-user-login').outerHeight(true);
        $('.topbar .topbar-inner').height(topbar_height);
        $('.topbar-menu').css('display', 'none');
      });
      $('.close-user-login').click(function(evt) {
        evt.preventDefault();
        $('body').removeClass('topbar-is-open');
        $('.topbar .topbar-inner').height('');
        // Set timeout to make shure login-button stays hidden untill animation is complete
        setTimeout(function(){
          $('.topbar-menu').css('display', 'block');
        }, 300);
      });
    }
  };

})(jQuery);