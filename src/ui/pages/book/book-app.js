//= require lib/angular
//= require components/book-resource/book-resource
//= require components/book-viewer/book-viewer
//= require components/ui-state-service/ui-state-service

(function() {

    'use strict';

    var module = angular.module('blaisdell.pages.book.app', [
        'blaisdell.components.book-viewer',
        'blaisdell.resources.book',
        'blaisdell.services.ui-state'
    ]);

    module.controller('BookCtrl', function($scope, Book, uiStateService) {

        uiStateService.loading();

        function init(books) {
            $scope.model.books = books;
            uiStateService.idle();
        }

        Book.list().$promise.then(init);

        $scope.model = {
            books: []
        };

    });

})();
