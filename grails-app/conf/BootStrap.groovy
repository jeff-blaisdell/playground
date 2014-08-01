import io.github.jeffblaisdell.Book
import org.joda.time.LocalDate

class BootStrap {

    def init = { servletContext ->

        List<Book> books = [
            new Book(
                id: '1',
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                isbn: '0743273567',
                publishedDate: new LocalDate(1925, 4, 10)
            ),
            new Book(
                id: '2',
                title: 'The Grapes of Wrath',
                author: 'John Steinbeck',
                isbn: '0143039431',
                publishedDate: new LocalDate(1939, 4, 14)
            ),
            new Book(
                id: '3',
                title: '1984',
                author: 'George Orwell',
                isbn: '0451524934',
                publishedDate: new LocalDate(1949, 6, 8)
            ),
            new Book(
                id: '4',
                title: 'The Three Musketeers',
                author: 'Alexandre Dumas',
                isbn: '0679603328',
                publishedDate: new LocalDate(1844, 7, 1)
            ),
            new Book(
                id: '5',
                title: 'Lolita',
                author: 'Vladimir Nabokov',
                isbn: '0679727299',
                publishedDate: new LocalDate(1955, 9, 1)
            ),
            new Book(
                id: '6',
                title: 'Catch-22',
                author: 'Joseph Heller',
                isbn: '9781451626650',
                publishedDate: new LocalDate(1961, 11, 11)
            ),
            new Book(
                id: '7',
                title: 'Crime and Punishment',
                author: 'Fyodor Dostoevsky',
                isbn: '0679734503',
                publishedDate: new LocalDate(1866, 1, 1)
            ),
            new Book(
                id: '8',
                title: 'Beloved',
                author: 'Toni Morrison',
                isbn: '1400033411',
                publishedDate: new LocalDate(1987, 9, 1)
            ),
            new Book(
                id: '9',
                title: 'The Sound and the Fury',
                author: 'William Faulkner',
                isbn: '0393964817',
                publishedDate: new LocalDate(1929, 1, 1)
            ),
            new Book(
                id: '10',
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                isbn: '0446310786',
                publishedDate: new LocalDate(1960, 7, 11)
            ),
            new Book(
                id: '11',
                title: 'The Lord of the Rings',
                author: 'J.R.R. Tolkien',
                isbn: '0618640150',
                publishedDate: new LocalDate(1954, 7, 29)
            ),
            new Book(
                id: '12',
                title: 'One Hundred Years of Solitude',
                author: 'Gabriel Garcia Marquez',
                isbn: '0060883286',
                publishedDate: new LocalDate(1967, 1, 1)
            ),
            new Book(
                id: '13',
                title: 'Brave New World',
                author: 'Aldous Huxley',
                isbn: '0060850523',
                publishedDate: new LocalDate(1932, 1, 1)
            ),
            new Book(
                id: '14',
                title: 'To the Lighthouse',
                author: 'Virginia Woolf',
                isbn: '0156907399',
                publishedDate: new LocalDate(1927, 5, 5)
            ),
            new Book(
                id: '15',
                title: 'Invisible Man',
                author: 'Ralph Ellison',
                isbn: '0679732764',
                publishedDate: new LocalDate(1952, 1, 1)
            ),
            new Book(
                id: '16',
                title: 'Gone with the Wind',
                author: 'Margaret Mitchell',
                isbn: '0446365386',
                publishedDate: new LocalDate(1936, 6, 10)
            ),
            new Book(
                id: '17',
                title: 'Jane Eyre',
                author: 'Charlotte Bronte',
                isbn: '9781451626650',
                publishedDate: new LocalDate(1847, 10, 16)
            ),
            new Book(
                id: '18',
                title: 'On the Road',
                author: 'Jack Kerouac',
                isbn: '0143105469',
                publishedDate: new LocalDate(1957, 9, 5)
            ),
            new Book(
                id: '19',
                title: 'Pride and Prejudice',
                author: 'Jane Austen',
                isbn: '0486284735',
                publishedDate: new LocalDate(1813, 1, 28)
            ),
            new Book(
                id: '20',
                title: 'Lord of the Flies',
                author: 'William Golding',
                isbn: '0399501487',
                publishedDate: new LocalDate(1954, 9, 17)
            )
        ]

        Book.saveAll(books)

    }
    def destroy = {
    }
}
