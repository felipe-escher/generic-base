(function() {
    var showErrorsModule: any;
  
    showErrorsModule = angular.module('ui.bootstrap.showErrors', []);
  
    showErrorsModule.directive('showErrors', [
      '$timeout', 'showErrorsConfig', '$interpolate', function($timeout: any, showErrorsConfig: any, $interpolate: any) {
        var getShowSuccess: any, getTrigger: any, linkFn: any;
        getTrigger = function(options: any) {
          var trigger: any;
          trigger = showErrorsConfig.trigger;
          if (options && (options.trigger != null)) {
            trigger = options.trigger;
          }
          return trigger;
        };
        getShowSuccess = function(options: any) {
          var showSuccess: any;
          showSuccess = showErrorsConfig.showSuccess;
          if (options && (options.showSuccess != null)) {
            showSuccess = options.showSuccess;
          }
          return showSuccess;
        };
        linkFn = function(scope: any, el: any, attrs: any, formCtrl: any) {
          var blurred: any, inputEl: any, inputName: any, inputNgEl: any, options: any, showSuccess: any, toggleClasses: any, trigger: any;
          blurred = false;
          options = scope.$eval(attrs.showErrors);
          showSuccess = getShowSuccess(options);
          trigger = getTrigger(options);
          inputEl = el[0].querySelector('.form-control[name]');
          inputNgEl = angular.element(inputEl);
          inputName = $interpolate(inputNgEl.attr('name') || '')(scope);
          if (!inputName) {
            throw "show-errors element has no child input elements with a 'name' attribute and a 'form-control' class";
          }
          inputNgEl.bind(trigger, function() {
            blurred = true;
            return toggleClasses(formCtrl[inputName].$invalid);
          });
          scope.$watch(function() {
            return formCtrl[inputName] && formCtrl[inputName].$invalid;
          }, function(invalid: any) {
            if (!blurred) {
              return;
            }
            return toggleClasses(invalid);
          });
          scope.$on('show-errors-check-validity', function() {
            return toggleClasses(formCtrl[inputName].$invalid);
          });
          scope.$on('show-errors-reset', function() {
            return $timeout(function() {
              el.removeClass('has-error');
              el.removeClass('has-success');
              return blurred = false;
            }, 0, false);
          });
          return toggleClasses = function(invalid: any) {
            el.toggleClass('has-error', invalid);
            if (showSuccess) {
              return el.toggleClass('has-success', !invalid);
            }
          };
        };
        return {
          restrict: 'A',
          require: '^form',
          compile: function(elem: any, attrs: any) {
            if (attrs['showErrors'].indexOf('skipFormGroupCheck') === -1) {
              if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
                throw "show-errors element does not have the 'form-group' or 'input-group' class";
              }
            }
            return linkFn;
          }
        };
      }
    ]);
  
    showErrorsModule.provider('showErrorsConfig', function(): any {
      var _showSuccess: any, _trigger: any;
      _showSuccess = false;
      _trigger = 'blur';
      this.showSuccess = function(showSuccess: any) {
        return _showSuccess = showSuccess;
      };
      this.trigger = function(trigger: any) {
        return _trigger = trigger;
      };
      this.$get = function() {
        return {
          showSuccess: _showSuccess,
          trigger: _trigger
        };
      };
    });
  
  }).call(this);
  