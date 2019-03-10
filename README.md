# Paginator
### Create a simple pagination

For using we should call get element with id "paginator" or any.
And invoke renderPaginator on this element ```pg.renderPaginator();```
with parameters *page(usualy starts 1)*, *total pages*, and *callback* for render recive content, callback page recive one parameter - __current page__.

For example:
```
 var pg = document.getElementById('paginattor');
 pg.renderPaginator(1, 10, function(page) => {
     console.log(page);
 }); 
 ```
