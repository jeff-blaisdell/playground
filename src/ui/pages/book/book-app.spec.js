describe('blaisdell.pages.book.app', function () {

    'use strict';

    var $scope, $httpBackend, $controller, uiStateService, Book;

    beforeEach(module('blaisdell.pages.book.app'));

    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $controller = $injector.get('$controller');
        uiStateService = $injector.get('uiStateService');
        $httpBackend = $injector.get('$httpBackend');
        Book = $injector.get('Book');

        spyOn(uiStateService, 'loading').and.callThrough();
        spyOn(uiStateService, 'idle').and.callThrough();

    }));

    afterEach(function () {

    });

    it('should initialize book viewer app.', function() {

        var books = buildBooks();
        $httpBackend.when('GET', '/playground/api/books').respond(books);
        createBookCtrl();


        $httpBackend.flush();

        $scope.$digest();

        expect(uiStateService.loading).toHaveBeenCalled();
        expect(uiStateService.idle).toHaveBeenCalled();
        expect($scope.model.books.length).toEqual(2);
        expect($scope.model.books[1].title).toEqual(books[1].title);

    });

    function createBookCtrl() {
        var params = {
            $scope: $scope,
            Book: Book,
            uiStateService: uiStateService
        };

        var ctrl = $controller('BookCtrl', params);
        $scope.$apply();

        return ctrl;
    }

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
            }
        ];
    }

});
