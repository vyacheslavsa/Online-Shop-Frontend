import { shopingCart } from "./scriptMain.js";

const deleteProduct = (id) => {
  const indexElem = shopingCart.findIndex((item) => item.productID === id);
  shopingCart.splice(indexElem, 1);
  renderShopingMenu();
};

export const renderShopingMenu = () => {
  const contentSopingMenu = document.querySelector(".shopping_cart__content");
  const shopingCartPrice = document.querySelector(".shopping_cart__price");

  let element = "";

  if (shopingCart.length > 0) {
    shopingCart.map((item) => {
      element += `
      <div class="shopping_cart__item" id=${item.productID}>
        <p>${item.name}</p>
        <div>
          <p>${item.count}</p>
          <img class="shopping_cart__delete_icon" src="./i/trash_icon.png"  />
        </div>
      </div>
      `;
      contentSopingMenu.innerHTML = element;
    });
  } else {
    contentSopingMenu.innerHTML = "";
  }

  let priceShopingCard = [];
  let priceResult = 0;

  if (shopingCart.length) {
    priceShopingCard = shopingCart.map((item) => item.price * item.count);
    priceResult = priceShopingCard.reduce((acc, cur) => acc + cur);
  }

  shopingCartPrice.innerHTML = `Итого: ${priceResult} руб.`;

  const allDeleteButtons = document.querySelectorAll(
    ".shopping_cart__delete_icon"
  );
  for (let i = 0; i < allDeleteButtons.length; i++) {
    allDeleteButtons[i].addEventListener("click", () => {
      deleteProduct(allDeleteButtons[i].parentNode.parentNode.id);
    });
  }
};
