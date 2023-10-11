let basket = JSON.parse(localStorage.getItem("basket"));
let cartNum = document.querySelector(".cartNumber");

if (localStorage.getItem("basket") === null) {
  localStorage.setItem("basket", JSON.stringify([]));
}

document.querySelector(".cart-icon").addEventListener("click", function () {
  location.assign("http://127.0.0.1:5500/cart.html");
});

fetch("db.json")
  .then((rest) => rest.json())
  .then((data) => {
    let html = "";
    data.products.forEach((item) => {
      html += `
        <div class="card">
            <div class="card-img">
              <a href="#">
                <img src="${item.image}" />
              </a>
            </div>
            <div class="card-text">
              <a class="snack" href="#">${item.category}</a>
              <h2>
                <a href="#">${item.name}</a>
              </h2>
              <div class="product-rate">
                <div class="rate"></div>
                <span>(4.0)</span>
              </div>
              <div class="nest-food">
                <span>By</span>
                <a href="#">${item.firm}</a>
              </div>
              <div class="card-bottom">
                <div class="price">
                  <span class="new-price">${item.price}$</span>
                  <span class="old-price">${item.old}$</span>
                </div>
                <div class="add-cart">
                  <a class="btns" data-price="${item.price}" data-id="${item.id}"href="#"
                    ><i
                      class="fa-solid fa-cart-shopping cart-icon"
                      style="color: #3ab77e"
                    ></i>
                    Add
                  </a>
                </div>
              </div>
            </div>
          </div>

        `;
    });
    document.querySelector(".allCards").innerHTML = html;
    let addBasket = document.querySelectorAll(".btns");
    addBasket.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (localStorage.getItem("basket") === null) {
          localStorage.setItem("basket", JSON.stringify([]));
        }
        let data_id = e.target.getAttribute("data-id");
        let price_id = e.target.getAttribute("data-price");
        let exist = basket.find((p) => p.id == data_id);

        if (exist) {
          exist.count++;
        } else {
          basket.push({
            id: data_id,
            count: 1,
            price: price_id,
          });
        }

        let price = 0;
        basket.forEach((item) => {
          price += item.price * item.count;
        });

        localStorage.setItem("basket", JSON.stringify(basket));

        cartNum.innerText = basket.length;
      });
    });
  });
