//MISC - genereal events, that doesnt belong to own file

(function($) {
  // Profile dropdown
  Drupal.behaviors.misc = {
    attach: function(context, settings) {
      
      //Add Event handler to frontpage openinghours on mobile
      $(window).bind('resize.ding_toggle_opening_hours', function (evt) {
        //Cache element
        var pane_opening_hours = $('.front .pane-all-opening-hours .pane-title', context);
              
        switch (ddbasic.breakpoint.is('mobile', 'toggle_opening_hours')) {
          case ddbasic.breakpoint.IN:
            pane_opening_hours
              .on('click', function(){
                $(this).siblings('.pane-content').slideToggle('fast');
              })
              .siblings('.pane-content')
              .css({
                'display':'none',
              });
            break;
          
          case ddbasic.breakpoint.OUT:
            pane_opening_hours
              .off('click')
              .siblings('.pane-content')
              .css({
                'display':'block',
              });
            break;
        }
      }).triggerHandler('resize.ding_toggle_opening_hours');
      
      
      //Make sure facet browser is open when item is selected
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
      
      
      //@TODO We inject a select all button here, since the basic theme dont provide one for loans, only for reservations and bookmarks. To enhance the user experience, and to streamline the design it is added js-time.
      //In future please add a select all select to the form.
      
      //Add select all on loans
      
      var loan_form_action_buttons = $('#ding-loan-loans-form > div > .action-buttons', context),
          all_select_all_checkboxes = $('#ding-loan-loans-form > div > .select-all .form-item:not(.form-disabled) label', context),
          all_material_items_checkboxes = $('#ding-loan-loans-form > div > .material-item .form-item:not(.form-disabled) label');
          
          
      //Wrap action form, so it behaves as reservations and bookmarks
      loan_form_action_buttons.wrap('<div class="actions-container"></div>');
      
      //Add the checkbox with same markup as reservations/bookmarks to keep styling consistent
      loan_form_action_buttons.parent().prepend('<div class="select-all"><div class="form-item"><input type="checkbox" id="js-select-all" name="js-title" value="1" class="form-checkbox"><label class="option" for="js-title">Vælg alle</label></div></div>');
      
      //cache the newly added checkbox
      var select_all_new = $('#ding-loan-loans-form > div > .actions-container label', context);
      
      
      select_all_new.on('click', function(){
        var $this = $(this).siblings('input');
        
        if($this.prop('checked') == true) { //delect all 
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