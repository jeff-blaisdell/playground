class UrlMappings {

	static mappings = {
        "/api/books"(controller: 'book', action: "index")
        "/api/books/$id"(controller: 'book', action: "show")
        "/"(controller: 'bookViewer', action: "index")
        "500"(view:'/error')
	}
}
