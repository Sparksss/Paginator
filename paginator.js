/**
 * add pagination
 *
 * @param {number} page - current page
 * @param {number} count - count of pages
 * @param {requestCallback} callback - The callback that handles the response
 */
Element.prototype.renderPaginator = function(page, count, callback) {
  var currentPage = +page;
  var totalPages = +count;
  var previousPage = currentPage;
  var pagesBefore = 2;
  var pagesAfter = 3;

  if (isNaN(currentPage) || isNaN(totalPages)) {
    throw "Error: parameters is not a number!";
  }

  if(totalPages === 1) {
    return false;
  }
  var elem = this;

  /**
   * Create pages(range from 1 to 5)
   * @param {number} min - min of render range
   * @param {number} max - max of count renderd elements
   * @param {number} page - current page
   * @returns {DocumentFragment} - fragment contains buttons for select page
   */
  var createPages = function(min, max, page) {
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
   * @returns {HTMLAnchorElement} last page
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
   *@param {number} currentPage - current page
   *@param {number} totalPages - all pages
   */
  var render = function(currentPage, totalPages) {

    selectedPage = currentPage;

    if(totalPages < 6) {
      return elem.appendChild(createPages(1, totalPages + 1, currentPage));
    }

    var min = currentPage - pagesBefore > 0 ? currentPage - pagesBefore :  0;
    var max = currentPage + pagesAfter > totalPages ? (currentPage + pagesAfter) - ((currentPage + pagesAfter) - totalPages)  : currentPage + pagesAfter;

    if(currentPage + pagesAfter > totalPages) {
      page = totalPages;
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
        case totalPages:
        max++;
        break;
      default:
        min = currentPage - 2;
    }

    if(totalPages <= 5) {
      max = totalPages + 1;
    }

    var fr = createPages(min, max, currentPage);

    if(currentPage < totalPages && totalPages > 5) {
      fr.appendChild(createCountPage(totalPages));
    }

    elem.appendChild(fr);
  };

  render(currentPage, totalPages);

  this.addEventListener("click", function(event) {
    event.preventDefault();
    var page = +event.target.dataset.page;
    if(previousPage === page || isNaN(page)) {
      return false;
    }
    previousPage = page;
    elem.innerHTML = "";
    render(+page, +count);
    callback(page);
  });
};

var pg = document.getElementById('paginator');
pg.renderPaginator('1', 12, (page) => console.log(page));
