module showComCallback.Directives {
    'use strict';

    interface IShowCallbackScope extends ng.IScope {
        afterShow: () => void;
        afterHide: () => void;
    }

    export class ShowCallbackDirective implements ng.IDirective {
        private $animate: any;

        public restrict: string = 'A';
        public scope: any = {
            'showCallback': '=',
            'afterShow': '&',
            'afterHide': '&'
        };
        public link: (scope: IShowCallbackScope, element: ng.IAugmentedJQuery) => void;

        public static $inject: string[] = ['$animate'];
        constructor($animate: any) {
            this.$animate = $animate;
            ShowCallbackDirective.prototype.link = (scope: IShowCallbackScope, element: ng.IAugmentedJQuery) => {
                scope.$watch('showCallback', (show: any) => {
                    if (show) {
                        this.$animate.removeClass(element, 'ng-hide', { tempClasses: 'ng-hide-animate' }).then(scope.afterShow);
                    } else {
                        this.$animate.addClass(element, 'ng-hide', { tempClasses: 'ng-hide-animate' }).then(scope.afterHide);
                    }
                });
            };
        }

        public static Factory(): any {
            var directive: ($animate: any) => ShowCallbackDirective = ($animate: any) => {
                return new ShowCallbackDirective($animate);
            };
            directive.$inject = ['$animate'];
            return directive;
        };

    }

    angular
        .module('showComCallback', [])
        .directive('showCallback', ShowCallbackDirective.Factory());
}

