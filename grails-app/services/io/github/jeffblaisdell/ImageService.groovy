package io.github.jeffblaisdell

class ImageService {
    private static final String COVER_IMAGE_URL = 'http://covers.openlibrary.org/b/isbn/#{isbn}-M.jpg'

    String getCoverImageUrl(String isbn) {
        return COVER_IMAGE_URL.replaceAll('#\\{isbn\\}', isbn)
    }
}
