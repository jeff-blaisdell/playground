describe('blaisdell.resources.book', function() {

    'use strict';

    var $rootScope, $httpBackend, Book;

    beforeEach(module('blaisdell.resources.book'));

    beforeEach(inject(function($injector) {
        $httpBackend        = $injector.get('$httpBackend');
        $rootScope          = $injector.get('$rootScope');
        Book                = $injector.get('Book');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get a book.', function() {

        var book = buildBooks()[0];

        $httpBackend.expectGET('/playground/api/books/1').respond(book);

        var result;

        Book.get({ id: book.id }).$promise.then(function(data) {
            result = data.title;
        });

        $httpBackend.flush();
        $rootScope.$apply();

        expect(result).toEqual(book.title);
    });

    it('should get a list of books.', function() {

        var books = buildBooks();

        $httpBackend.expectGET('/test-playground/api/books').respond(books);

        var result;

        Book.list().$promise.then(function(data) {
            result = data;
        });

        $httpBackend.flush();
        $rootScope.$apply();

        expect(result.length).toEqual(2);
        expect(result[0].title).toEqual(books[0].title);
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
            }
        ];
    }

});
