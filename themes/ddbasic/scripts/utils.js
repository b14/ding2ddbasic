/*jshint forin:false, jquery:true, browser:true, indent:2, trailing:true, unused:false */

(function (scope, $) {
  'use strict';

  var
    /** Breakpoint identifiers. */
    _bpi = {};

  if (scope.ddbasic === undefined) {
    scope.ddbasic = {};
  }

  /**
   *
   */
  scope.ddbasic.breakpoint = {
    /** */
    IN: true,
    
    /** */
    OUT: false,
    
    /** */
    NOP: null,

    /** */
    is: function (breakpoint, identifier) {
      var
        $checker = $('.is-' + breakpoint),
        result = $checker.is(':visible');

      if (identifier === undefined) {
        return result ? this.IN : this.OUT;
      }

      if (_bpi[identifier] !== result) {
        _bpi[identifier] = result;
        return result ? this.IN : this.OUT;
      }

      return this.NOP;
    },

    /**
     *
     */
    reset: function (identifier) {
      delete _bpi[identifier];
    }
  }

  $(window).on('resize', function () {
    switch (ddbasic.breakpoint.is('mobile', 'namegoeshere')) {
      case ddbasic.breakpoint.IN:
        console.log('IN: mobile');
        break;
      case ddbasic.breakpoint.OUT:
        console.log('OUT: mobile');
        break;
    }
  });

})(this, jQuery);
