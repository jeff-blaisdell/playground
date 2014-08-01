describe('blaisdell.components.book-viewer', function() {

    'use strict';

    var $compile, $scope;

    beforeEach(module('blaisdell.components.book-viewer'));

    beforeEach(inject(function($injector) {
        $compile = $injector.get('$compile');
        $scope = $injector.get('$rootScope').$new();
    }));

    it('should display a collection of books.', function() {

        var books = buildBooks();
        $scope.model = {
            books: books
        };
        $scope.$apply();
        var elem = angular.element('<book-viewer books="model.books"></book-viewer>');
        $compile(elem)($scope);
        $scope.$apply();

        expect(elem.find('.book').length).toBe(3);
    });

    function buildBooks() {
        return [
            {
                id: '1',
                title: 'Pride and Prejudice',
                author: 'Jane Austen'
            },
            {
                id: '2',
                title: 'Lord of the Flies',
                author: 'William Golding'
            },
            {
                id: '3',
                title: 'On the Road',
                author: 'Jack Kerouac'
            }
        ];
    }

});
