let prodPrice = document.querySelector("#prod-price");
let prodCount = document.querySelector("#prod-all-count");
let basket = JSON.parse(localStorage.getItem("basket"));

if (localStorage.getItem("basket") === null) {
  localStorage.setItem("basket", JSON.stringify([]));
  prodPrice.textContent = "0";
  prodCount.textContent = "0";
} else {
  let price = 0;
  basket.forEach((item) => {
    price += item.price * count;
  });
  prodPrice.innerText = price.toFixed(2);
  prodCount.innerText = basket.length;
}

fetch("db.json")
  .then((rest) => rest.json())
  .then((data) => {
    let html = "";
    data.products.forEach((item) => {
      html += `
      <div class="items">
            <div class="row align-items-center">
              <div class="col-lg-3">
                <img class="img-fluid" src="${item.image}" />
              </div>
              <div class="col-lg-6">
                <h4>${item.name}</h4>
              </div>
              <div class="col-lg-3">
                <div class="count">
                  <i class="fa-solid fa-circle-minus"></i>
                  <h3>${prodCount}</h3>
                  <i class="fa-solid fa-circle-plus"></i>
                </div>
              </div>
            </div>
          </div>

        `;
    });
    document.querySelector(".items-row").innerHTML = html;

    // let addBasket = document.querySelectorAll(".btns");
    // addBasket.forEach((btn) => {
    //   btn.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     if (localStorage.getItem("basket") === null) {
    //       localStorage.setItem("basket", JSON.stringify([]));
    //     }
    //     let basket = JSON.parse(localStorage.getItem("basket"));
    //     let data_id = e.target.getAttribute("data-id");
    //     let price_id = e.target.getAttribute("data-price");
    //     let exist = basket.find((p) => p.id == data_id);

    //     if (exist) {
    //       exist.count++;
    //     } else {
    //       basket.push({
    //         id: data_id,
    //         count: 1,
    //         price: price_id,
    //       });
    //     }

    //     localStorage.setItem("basket", JSON.stringify(basket));
    //   });
    // });
  });
