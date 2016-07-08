/*jshint forin:false, jquery:true, browser:true, indent:2, trailing:true, unused:false */

(function (scope, $) {
  Drupal.ajax.prototype.commands.ding_popup = function (ajax, response, status) {
    var $content = ddbasic.popupbar.set(response.name, response.data);
    Drupal.attachBehaviors($content);
  };

  Drupal.ajax.prototype.commands.ding_popup_close = function (ajax, response, status) {
    ddbasic.popupbar.close();
  };
}(this, jQuery));
