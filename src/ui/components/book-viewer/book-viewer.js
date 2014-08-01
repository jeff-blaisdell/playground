//= require components/templates/templates

(function() {
    'use strict';

    var module = angular.module('blaisdell.components.book-viewer', [
        'blaisdell.components.templates'
    ]);

    module.directive('bookViewer', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/book-viewer/book-viewer.html',
            scope: {
                books: '='
            },
            controller: function($scope) {

                $scope.getColumn = function(index) {
                  return (index % 3) + 1;
                };

            }
        };
    });
})();
