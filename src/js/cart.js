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
    price += item.price * item.count;
  });
  prodPrice.innerText = price.toFixed(2);
  prodCount.innerText = basket.length;
}

fetch("db.json")
  .then((rest) => rest.json())
  .then((data) => {
    let html = "";
    basket.forEach((item) => {
      let element = data.products.find((a) => {
        return a.id == item.id;
      });
      html += `
      <div class="items">
            <div class="row align-items-center">
              <div class="col-lg-3">
                <img class="img-fluid" src="${element.image}" />
              </div>
              <div class="col-lg-6">
                <h4>${element.name}</h4>
              </div>
              <div class="col-lg-3">
                <div class="count">
                  <i class="fa-solid fa-circle-minus"></i>
                  <h3>${item.count}</h3>
                  <i class="fa-solid fa-circle-plus"></i>
                </div>
              </div>
            </div>
          </div>

        `;
    });
    document.querySelector(".items-row").innerHTML = html;
  });
