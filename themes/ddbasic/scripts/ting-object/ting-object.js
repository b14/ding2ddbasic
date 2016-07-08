(function($) {
  
  //$(function () {
  //  // Set height for ting-object search results and each abstract
  //  var ting_object_search_result_height,
  //      abstract_height;
  //  
  //  $(window).bind('resize.ting_object_list_item_style', function (evt) {
  //    // Height of abstracts
  //    $('.ting-object.list-item-style .field-name-ting-abstract').each(function (delta, view) {
  //      abstract_height = $(this).children('.trimmed').outerHeight();
  //      $(this).height(abstract_height);
  //    });
  //
  //    // Height of search results
  //    $('.ting-object.list-item-style').each(function (delta, view) {
  //      ting_object_search_result_height = $(this).children('.inner').outerHeight();
  //      $(this).height(ting_object_search_result_height);
  //    });
  //
  //  });
  //  // When ajax is complete
  //  $(document).ajaxComplete(function() {
  //    $(window).triggerHandler('resize.ting_object_list_item_style');
  //  });
  //});
  //
  //// Call resize function when images is loaded
  //Drupal.behaviors.ting_object_height = {
  //  attach: function(context, settings) {
  //    $('.pane-search-result, .pane-ting-collection').imagesLoaded( function() {
  //      $(window).triggerHandler('resize.ting_object_list_item_style');
  //    });
  //  }
  //}
  //
  //// Hover functions for ting-object search results
  //Drupal.behaviors.ting_object_search_result_hover = {
  //  attach: function(context, settings) {
  //    $('.ting-object.list-item-style', context).mouseenter(function() {
  //      var $hovered = $(this),
  //          $abstract_height = $(this).find('.field-name-ting-abstract .full').outerHeight(true), 
  //          $subject_height = $(this).find('.subjects .inner').outerHeight(true);
  //      
  //      $(this).find('.field-name-ting-abstract').height($abstract_height);
  //      $(this).find('.subjects').height($subject_height);
  //      
  //      // Set timeout to make sure element is still above while it animates out
  //      setTimeout(function(){
  //        $('.ting-object.list-item-style').css('z-index', '');
  //        $hovered.css('z-index', '1');
  //      }, 300);
  //    });
  //    
  //    $('.ting-object.list-item-style', context).mouseleave(function() {
  //      var $abstract_height = $(this).find('.field-name-ting-abstract .trimmed').outerHeight(true);
  //      $(this).find('.field-name-ting-abstract').height($abstract_height);
  //      $(this).find('.subjects').height(0);
  //    });
  //  }
  //};
  
  // Ting search results, filter styling
  Drupal.behaviors.ding_ting_search_filters = {
    attach: function(context, settings) {
//       $('.page-search-ting .pane-search-backends, .page-search-ting .pane-ding-facetbrowser').addClass("hidden");
      $("<div class='expand-search'>Afgræns din søgning</div>").insertAfter($( ".pane-search-result-count" ));
      $('.page-search-ting').find('.mobile-hide').wrapAll("<div class='hide-wrap'></div>");
      
      $('.expand-search', context).click(function(){
          $(this).toggleClass('expanded');
          $(this).parent().find('.hide-wrap').slideToggle("fast");
      });
    }
  };
  // Hover functions for ting object teasers
  Drupal.behaviors.ding_ting_teaser_hover = {
    attach: function(context, settings) {
      $('.ting-object.view-mode-teaser > .inner .group_text', context).mouseenter(function() {
        var $hovered = $(this);
        // Set timeout to make shure element is still above while it animates out
        setTimeout(function(){
          $('.ting-object.view-mode-teaser > .inner .group_text').css('z-index', '');
          $hovered.css('z-index', '1000');
        }, 300);
      });
    }
  };

  // Shorten ting object teaser titles
  Drupal.behaviors.ding_ting_teaser_short_title = {
    attach: function(context, settings) {
      $('.ting-object.view-mode-teaser > .inner .field-name-ting-title h2').each(function(){
        this.innerText = ellipse(this.innerText, 45);
      });    
    }
  };
  
  function ellipse(str, max){
    return str.length > (max - 3) ? str.substring(0,max-3) + '...' : str; 
  }
  
/*
  // Hover functions to ensure title max width
  Drupal.behaviors.ding_ting_teaser_title_and_author_width = {
    attach: function(context, settings) {
       var containerWidth = $('.ting-object.view-mode-teaser > .inner .group_text').css('width');
        $('.ting-object.view-mode-teaser .field-name-ting-title h2, .ting-object.view-mode-teaser .field-name-ting-author').each(function(){
          $(this).css('max-width', containerWidth);
        });    
    }
  };
*/
  
  
  // Ting teaser slider
  // @TODO should only be a slider when "related material", not "materials"
  //Drupal.behaviors.ding_ting_teaser_slider = {
  //  attach: function(context, settings) {
  //    return;
  //    var slider = $('.field-type-ting-reference > .field-items', context);
  //
  //    slider.slick({
  //      infinite: false,
  //      slidesToShow: 4,
  //      slidesToScroll: 4,
  //      arrows: true,
  //      responsive: [
  //          {
  //            breakpoint: 1024,
  //            settings: {
  //              slidesToShow: 3,
  //              slidesToScroll: 3
  //              
  //            }
  //          },
  //          {
  //            breakpoint: 600,
  //            settings: {
  //              slidesToShow: 2,
  //              slidesToScroll: 2
  //            }
  //          },
  //          {
  //            breakpoint: 480,
  //            settings: {
  //              slidesToShow: 1,
  //              slidesToScroll: 1
  //            }
  //          }
  //        ]
  //     });
  //  }
  //};

  
  // Ting teaser image proportions
  Drupal.behaviors.ding_ting_teaser_image_width = {
    attach: function(context, settings) {
      var images = $('.ting-object.view-mode-teaser img');
      
      $(images).each(function() {
        var image = new Image();
        image.src = $(this).attr("src");
        var that = $(this);
        
        image.onload = function() {
          var img_height = this.height;
          var img_width = this.width;
          var img_format = img_width/img_height;
          var standart_form = 0.7692; /* format of our container */
            
          if(img_format >= standart_form) {
            that.addClass('scale-height');
          } else if (img_width < img_height) {
            that.addClass('scale-width');
          }
        };            
      });
    }
  };
  
  // Ting teaser image proportions
  Drupal.behaviors.ding_ting_object_list_mobile = {
    attach: function(context, settings) {
      $('.ting-object.view-mode-search-result .inner', context).each(function(){
        $(this).find('.field-name-ting-details-genre, .field-name-ting-abstract, .field-name-ting-series, .search-result--availability').addClass("hidden");
        $(this).find('.hidden').wrapAll("<div class='hide-wrap'></div>");
      });
      
      
      $('.search-result--heading-type', context).click(function(){
        if ($(window).width() < 600) { //@TODO change this to Phils resposinve script??
          $(this).toggleClass('js-toggled');
          $(this).parent().parent().find('.hide-wrap').slideToggle("fast");  
        }        
      });
    }
  };
  
  // Ting scroll to other formats
  Drupal.behaviors.ding_ting_object_scrollto_other_formats = {
    attach: function(context, settings) { 
      var other_formats_btn = $('a.other-formats', context),
          pane_ting_object_types = $('.pane-ting-ting-object-types', context),
          html = $('html, body');
      
      other_formats_btn.on('click', function(event){
        event.preventDefault();
        html.animate({
          scrollTop: pane_ting_object_types.offset().top - 148}, 400); 
      });
      
    }
  }

})(jQuery);