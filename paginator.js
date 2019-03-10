/**
 * Добавляет Пагинацию
 *
 * @param page
 * @param count
 * @param callback
 */
Element.prototype.renderPaginator = function(page, count, callback) {
  var currentPage = +page;
  var totalPages = +count;
  if (!currentPage || !totalPages || +totalPages == 1) {
    return false;
  }
  var elem = this;

  /**
   * Create pages(range from 1 to 5)
   */
  var createPaginator = function(min, max, page) {
    var fragment = document.createDocumentFragment();
    for (min; min < max; min++) {
      var a = document.createElement("a");
      a.href = "#";
      a.textContent = min;
      a.dataset.page = min;
      if (page !== min) {
        a.classList.add("page_button_paginator");
      } else {
        a.classList.add("page_button_paginator", "active");
      }
      fragment.appendChild(a);
    }
    return fragment;
  };

  /**
   * Create count of pages
   * @param {number} count
   */
  var createCountPage = function(count) {
    var lastPage = document.createElement("a");
    lastPage.href = "#";
    lastPage.dataset.page = count;
    lastPage.textContent = count;
    lastPage.classList.add("page_button_paginator");
    return lastPage;
  };

  /**
   * render pagination on page
   *
   */
  var render = function(currentPage, totalPages) {

    if(totalPages < 6) {
      return elem.appendChild(createPaginator(1, totalPages + 1, currentPage));
    }

    var min = 0;
    var max = currentPage + 3 > totalPages ? (currentPage + 3) - ((currentPage + 3) - totalPages)  : currentPage + 3;

    if(currentPage + 3 > totalPages) {
      page += page - totalPages;
    }

    switch(currentPage) {
      case 1:
        min = currentPage;
        max += 2; 
        break;
      case 2:
        min = currentPage - 1;
        max += 1;
        break;
      default:
        min = currentPage - 2;
    }

    if(totalPages <= 5) {
      max = totalPages + 1;
    }

    var fr = createPaginator(min, max, currentPage);

    if(currentPage < totalPages && totalPages > 5) {
      fr.appendChild(createCountPage(totalPages));
    }

    elem.appendChild(fr);
  };

  render(currentPage, totalPages);

  this.addEventListener("click", function(event) {
    event.preventDefault();
    var page = +event.target.dataset.page;
    if(isNaN(page)) return false;
    callback(page);
    elem.innerHTML = "";
    render(page, +count);
  });
};

var pg = document.getElementById('paginator');
pg.renderPaginator(1, 6, (page) => console.log(page));
