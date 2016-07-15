//MISC - genereal events, that doesnt belong to own file

(function($) {
  // Profile dropdown
  Drupal.behaviors.misc = {
    attach: function(context, settings) {
      
      //
      //Add Event handler to frontpage openinghours on mobile
      //
      
      var pane_opening_hours = $('.front .pane-all-opening-hours .pane-title', context);
      pane_opening_hours
        .on('click', function(){
          if($('.is-mobile', context).is(':visible')) {
            $(this).siblings('.pane-content').slideToggle('fast');
          }
        })
        .siblings('.pane-content');
      
      //Topbar openinghours button
      var opening_hours_button = $('.topbar-menu a.topbar-link-opening-hours', context);
          
      
      opening_hours_button.on('click', function(event){
        if($('body').hasClass('front')) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: pane_opening_hours.offset().top - 164}, 400); 
        }
      })
      
      
      //
      //Make sure facet browser is open when item is selected
      //
      var facet_items = $('.js-facet-browser-toggle input[type=checkbox]');
      
      facet_items.each(function(){
        var $this = $(this);
        if($this.is(':checked')) {
          $this
            .closest('.fieldset-wrapper')
            .css({
              'display':'block',
            })
            .closest('fieldset')
            .removeClass('collapsed');
        }
      });
      
      //
      //Print button actions
      //
      
      $('a.print-button', context).on('click', function(){
        window.print();
      })
      
      //
      //Close messages
      //
      
      var pane_messages = $('.pane-page-messages'),
          close_messages_button = $('.close-messages-button', context);
      
      close_messages_button.on('click', function(){
        pane_messages.slideUp('fast');
      })
      
      
      
      
      
      //@TODO We inject a select all button here, since the basic theme dont provide one for loans, only for reservations and bookmarks. To enhance the user experience, and to streamline the design it is added js-time.
      //In future please add a select all select to the form.
      
      //
      //Add select all on loans
      //
      
      var loan_form_action_buttons = $('#ding-loan-loans-form > div > .action-buttons', context),
          all_select_all_checkboxes = $('#ding-loan-loans-form > div > .select-all .form-item:not(.form-disabled) label', context),
          all_material_items_checkboxes = $('#ding-loan-loans-form > div > .material-item .form-item:not(.form-disabled) label');
      
      //Add renew all button    
      loan_form_action_buttons.prepend('<div class="renew-all action-button"><a href="#">Forny alle</a></div>');
      
      //Cache new renew-all
      var renew_all = $('.renew-all', context);
          
      //Wrap action form, so it behaves as reservations and bookmarks
      loan_form_action_buttons.wrap('<div class="actions-container"></div>');
      
      //Add the checkbox with same markup as reservations/bookmarks to keep styling consistent
      loan_form_action_buttons.parent().prepend('<div class="select-all"><div class="form-item"><input type="checkbox" id="js-select-all" name="js-title" value="1" class="form-checkbox"><label class="option" for="js-title">Vælg alle</label></div></div>');
      
      //cache the newly added checkbox
      var select_all_new = $('#ding-loan-loans-form > div > .actions-container label', context);
      
      //Renew all handler
      renew_all.on('click', function(event){
        //Select all
        if(select_all_new.siblings('input').prop('checked') == false) {
          select_all_new.click();
        }
        //Submit form
        $('#ding-loan-loans-form', context).submit();
      })
      
      select_all_new.on('click', function(){
        var $this = $(this).siblings('input');
        
        if($this.prop('checked') == true) { //deselect all 
          all_select_all_checkboxes.each(function(){
            var $this = $(this);
            if($this.siblings('input').prop('checked') == true) {
              $this.click();
            }
          });
          $this.prop('checked', false);
          all_material_items_checkboxes.each(function(){
            var $this = $(this);
            if($this.siblings('input').prop('checked') == true) {
              $this.click();
            }
          });
          
        }
        else { //select all
          all_material_items_checkboxes.each(function(){
            var $this = $(this);
            if($this.siblings('input').prop('checked') == false) {
              $this.click();
            }
          });
          all_select_all_checkboxes.each(function(){
            var $this = $(this);
            if($this.siblings('input').prop('checked') == false) {
              $this.click();
            }
          });
          $this.prop('checked', true);
        }
      });
      
      all_material_items_checkboxes.on('click', function(){ //reset select all btn
        select_all_new.siblings('input').prop('checked', false);
        
      });
      
      all_select_all_checkboxes.on('click', function(){ //reset select all btn
        select_all_new.siblings('input').prop('checked', false);
      });
      
    }
  };

})(jQuery);