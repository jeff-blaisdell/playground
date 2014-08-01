package io.github.jeffblaisdell.api

import grails.rest.RestfulController
import io.github.jeffblaisdell.Book
import io.github.jeffblaisdell.BookService
import io.github.jeffblaisdell.BookUI

class BookController extends RestfulController {

    static responseFormats = ['json']

    BookService bookService

    BookController() {
        super(Book, true)
    }

    @Override
    def index() {
        List<BookUI> books = bookService.getBooks()
        respond books
    }

    @Override
    def show() {
        BookUI book = bookService.getBook(params.id as String)
        if(book == null) {
            render status:404
        } else {
            respond book
        }
    }
}
