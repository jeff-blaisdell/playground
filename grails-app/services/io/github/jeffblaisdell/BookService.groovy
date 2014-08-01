package io.github.jeffblaisdell

class BookService {

    static transactional = false

    ImageService imageService

    List<BookUI> getBooks() {
        List<Book> books = Book.list()
        List<BookUI> bookUIs = books?.collect {
            return decorateBook(it)
        }
        return bookUIs
    }

    BookUI getBook(String id) {
        Book book = Book.findById(id)
        return decorateBook(book)
    }

    private BookUI decorateBook(Book book) {
        BookUI bookUI = new BookUI(book)
        bookUI.coverImageUrl = imageService.getCoverImageUrl(book.isbn)
        return bookUI
    }

}
