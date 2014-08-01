package io.github.jeffblaisdell

import org.joda.time.LocalDate

class BookUI {
    String id
    String title
    String author
    String isbn
    LocalDate publishedDate
    String coverImageUrl

    BookUI() {

    }

    BookUI(Book book) {
        this.id = book.id
        this.title = book.title
        this.author = book.author
        this.isbn = book.isbn
        this.publishedDate = book.publishedDate
    }
}
