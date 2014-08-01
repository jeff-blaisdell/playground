<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Books</title>
    <asset:stylesheet src="pages/book/book-app.css"/>
</head>

<body ng-app="blaisdell.pages.book.app">
<main ng-controller="BookCtrl">
    <section class="container">
        <book-viewer books="model.books"></book-viewer>
    </section>
</main>
<asset:javascript src="pages/book/book-app"/>
</body>
</html>
