package io.github.jeffblaisdell.api

import grails.converters.JSON
import grails.test.mixin.TestFor
import io.github.jeffblaisdell.Book
import io.github.jeffblaisdell.BookService
import io.github.jeffblaisdell.BookUI
import org.codehaus.groovy.grails.web.json.JSONArray
import org.codehaus.groovy.grails.web.json.JSONElement
import org.joda.time.LocalDate
import spock.lang.Specification

@TestFor(BookController)
class BookControllerSpec extends Specification {

    BookService bookService

    def setup() {
        bookService = Mock(BookService)
        controller.bookService = bookService
    }

    def 'it should return a list of books when index action is invoked.'() {

        given: 'Prepare date for our test.'
        BookUI book = new BookUI(
            id: 1,
            author: 'Tom Clancy',
            title: 'Patriot Games'
        )
        List<Book> books = [book]

        when: 'Invoke our test case.'
        controller.index()
        JSONArray jsonArray = JSON.parse(response.contentAsString)

        then: 'Check results of test.'

        // The getBooks method of the BookService should be invoked once during the lifetime of the test.
        // And when it is called we want it to return the books variable defined above.
        1 * bookService.getBooks() >> books

        // No other mocked methods should be invoked.
        0 * _

        // It will return a list of one book.
        assert jsonArray.size() == 1

        // and the author should equal the author of the book we have defined above.
        assert jsonArray.get(0).author == book.author
    }

    def 'it should return a single book when show action is invoked with an id.'() {

        given: 'Prepare date for our test.'
        BookUI book = new BookUI(
            id: 1,
            author: 'Tom Clancy',
            title: 'Patriot Games'
        )

        when: 'Invoke our test case.'
        params.id = book.id
        controller.show()
        JSONElement jsonElement = JSON.parse(response.contentAsString)

        then: 'Check results of test.'

        // The getBook method of the BookService should be invoked with the same id as the book variable defined above.
        // And when it is called we want it to return the book variable defined above.
        1 * bookService.getBook(
            book.id
        ) >> book

        // No other mocked methods should be invoked.
        0 * _

        // The id attribute of the response should equal the id of the book variable defined above.
        assert jsonElement.id == book.id

        // The title attribute of the response should equal the title of the book variable defined above.
        assert jsonElement.title == book.title
    }

}
