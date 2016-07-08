(function (scope, $) {
  // Tablet & mobile menu functions
  Drupal.behaviors.menu = {
    attach: function(context, settings) {
      var topbar_link_user = $('a.topbar-link-user', context),
          close_user_login = $('.close-user-login', context),
          mobile_menu_btn = $('a.topbar-link-menu', context),
          search_btn = $('a.topbar-link-search', context),
          scrolled,
          first_level_expanded = $('.main-menu-wrapper > .main-menu > .expanded > a', context),
          second_level_expanded = $('.main-menu-wrapper > .main-menu > .expanded > .main-menu > .expanded > a', context),
          body = $('body', context);
          
      mobile_menu_btn.on('click', function(evt){
        evt.preventDefault();
        body.toggleClass('mobile-menu-is-open');
        body.removeClass('mobile-search-is-open pane-login-is-open mobile-usermenu-is-open');
        body.toggleClass('overlay-is-active');
        if(body.hasClass('mobile-menu-is-open')) {
          body.addClass('overlay-is-active');
        } else {
          body.removeClass('overlay-is-active');
        }

        // Make a function
        //if(body.hasClass('mobile-menu-is-open')) {
        //  scrolled = body.scrollTop();
        //  body.css({
        //    'top': -scrolled,
        //    'position': 'fixed'
        //  });
        //} else {
        //  body.css('position', '');
        //  body.scrollTop(scrolled);
        //} 

      });
      
      search_btn.on('click', function(evt){
        evt.preventDefault();
        body.toggleClass('mobile-search-is-open');
        body.removeClass('mobile-menu-is-open pane-login-is-open mobile-usermenu-is-open');
        if(body.hasClass('mobile-search-is-open')) {
          body.addClass('overlay-is-active');
        } else {
          body.removeClass('overlay-is-active');
        }
      });
          
      topbar_link_user.on('click', function(evt) {
        evt.preventDefault();
        body.toggleClass('pane-login-is-open');
        body.removeClass('mobile-menu-is-open mobile-search-is-open mobile-usermenu-is-open');
        if(body.hasClass('pane-login-is-open')) {
          body.addClass('overlay-is-active');
        } else {
          body.removeClass('overlay-is-active');
        }
      });
      
      close_user_login.on('click', function(evt) {
        evt.preventDefault();
        body.removeClass('pane-login-is-open');
        body.removeClass('overlay-is-active');
      });
      
      first_level_expanded.on('click', function(evt) {
        if($('.is-tablet').is(':visible')) {
          evt.preventDefault();
          first_level_expanded.not($(this)).parent().children('.main-menu').slideUp(200);
          $(this).parent().children('.main-menu').slideToggle(200);
        }
      });
      
      second_level_expanded.on('click', function(evt) {
        if($('.is-tablet').is(':visible')) {
          evt.preventDefault();
          second_level_expanded.not($(this)).removeClass('open');
          second_level_expanded.not($(this)).parent().children('.main-menu').slideUp(200);
          $(this).toggleClass('open');
          $(this).parent().children('.main-menu').slideToggle(200);
        }
      });
    }
  };

})(this, jQuery);