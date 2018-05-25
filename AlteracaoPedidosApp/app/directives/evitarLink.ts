// Handle global LINK click
angular.module('evitarLink', [])
.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope: any, elem: any, attrs: any) {
            scope = scope;
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e: any) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});