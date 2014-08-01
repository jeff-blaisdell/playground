package io.github.jeffblaisdell

import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(BookViewerController)
class BookViewerControllerSpec extends Specification {

    def 'it should render the book viewer.'() {
        when:
        controller.index()

        then:
        view == '/bookViewer/index'
    }

}
