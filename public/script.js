// fetch products static
const generateProductHTML = (product) => {
  return `<div class="single-product-container">
              <p>${product.name}</p>
              ${
                product.onSale === true
                  ? `<p class="original-price">Original Price: ${product.originalPrice}</p>`
                  : ""
              }
              ${
                product.onSale === true
                  ? `<p>Sale Price: ${product.price}</p>`
                  : `<p>Price: ${product.price}</p>`
              }
              <p>Ratings: ${product.rating}</p>
              <p>Manufacturer: ${product.company}</p>
            </div>`;
};

const productsContainer = document.querySelector(".products"); // container of all fetched products
let queryObject = {}; // this will be the container to store all the queries

// function to fetch all products
const fetchProductsByQueries = async (pageNum) => {
  // if you use .query in your backend, you need to use params to send the json
  // after gathering all queries, time to perform the get method using axios
  const products = await axios.get("shopease/api/products", {
    params: queryObject,
  });
  
  console.log(queryObject)

  let html = "";
  if (products.data.products.length !== 0) {
    products.data.products.forEach((product) => {
      html += generateProductHTML(product);
    });
    productsContainer.innerHTML = html;
  } else {
    productsContainer.innerHTML = `${pageNum === undefined ? `<p>No products found</p>` : `<p>No products found in page: ${pageNum}</p>` }`;
  }
};
fetchProductsByQueries();

// jump to page button addEventListener
const jumpToPage = document.querySelector("#jumpToPage");
const pageNumberContainer = document.querySelector(".pageNum-container");

document.querySelector("#jumpToPageButton").addEventListener("click", () => {
  const pageNum = jumpToPage.value;
  pageNumberContainer.textContent = `Page: ${pageNum}`;

  // remove the jump to page value after sending the request
  jumpToPage.value = "";

  if (pageNum) {
    queryObject.pageParam = pageNum;
  }

  fetchProductsByQueries(pageNum);
});

// select or options addEventListener
const options = document.querySelectorAll("select");
options.forEach((option) => {
  option.addEventListener("change", (e) => {
    const fields = ["company", "onSale", "sort"];

    if (fields.includes(e.target.name)) {
      queryObject[e.target.name] = e.target.value;
      fetchProductsByQueries();
    }
  });
});

// search bar
const searchBar = document.querySelector("#search");
searchBar.addEventListener("keyup", (e) => {
  queryObject.name = searchBar.value; // Use the current value of the search bar
  fetchProductsByQueries(); // Call the fetch function to update the results
});
