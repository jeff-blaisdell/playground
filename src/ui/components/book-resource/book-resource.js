(function() {

    'use strict';

    var module = angular.module('blaisdell.resources.book', [
        'ngResource'
    ]);

    module.factory('Book',
        function($resource) {
            return $resource('/playground/api/books/:id',
                {},
                {
                    get: {
                        method: 'GET',
                        params: {
                            id: '@id'
                        }
                    },
                    list: {
                        method: 'GET',
                        isArray:true
                    }
                }
            );
        }
    );

})();
