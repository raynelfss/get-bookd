import unavailable from "../assets/book-cover-unavailable.jpg";

export function bookSearch(bookName) {
  let fetchPromise = Promise.resolve(
    fetch(`https://openlibrary.org/search.json?q=${bookName}`)
  ).then((response) => Promise.resolve(response.json()));
  return fetchPromise;
}

export function searchQuery(bookName) {
  let parsed = Promise.resolve(bookSearch(bookName))
    .then((searchResults) => {
      let obtainedBooks = [];
      searchResults.docs.forEach((element) => {
        obtainedBooks.push({
          title: element.title ? element.title : "Untitled",
          author: element.author_name ? element.author_name[0] : "Unknown",
          cover: element.cover_i
            ? `https://covers.openlibrary.org/b/id/${element.cover_i}-L.jpg`
            : unavailable,
          pages: element.number_of_pages_median,
          publish_date: element.publish_date !== undefined ? formatDate(element.publish_date[0]) : formatDate("Jan 1, 0001"),
          infopage: `https://openlibrary.org/${element.key}`,
          isbn: element.isbn ? element.isbn[0] : "Unknown",
        });
      });
      return obtainedBooks;
    })
    .then((result) => result);
  return parsed;
}

function formatDate(date) {
  let newDate = new Date(isNaN(date == undefined ?  "Jan 1, 0001" : Date.parse(date)) ? "Jan 1, 0001" : date);
  return newDate.toISOString().split("T")[0];
}
