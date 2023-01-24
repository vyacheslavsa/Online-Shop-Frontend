import data from "./data.js";
import { productsBoard } from "./scriptMain.js";
import { bottomFooter } from "./scriptMain.js";
import { collectProduct } from "./scriptModal.js";
import { renderIngredients } from "./scriptModal.js";
import { shopingCart } from "./scriptMain.js";
import { renderShopingMenu } from "./scriptShopingMenu.js";

export const addProductInShoppingCard = (product) => {
  const findElement = shopingCart.find(
    (item) => item.productID === product.productID
  );

  if (findElement) {
    findElement.count += product.count;
  } else {
    shopingCart.push({ ...product });
  }

  renderShopingMenu();
};

export const addEventOnIncDec = (className) => {
  const currentElement = document.querySelectorAll(className);
  for (let i = 0; i < currentElement.length; i++) {
    currentElement[i].addEventListener("click", () => {
      const result = data.menu.find(
        (item) =>
          item.productID ===
          currentElement[i].parentNode.parentNode.parentNode.id
      );
      className === ".product_inc"
        ? result.count++
        : result.count > 1 && result.count--;
      currentElement[i].parentNode.childNodes[3].innerHTML = result.count;
    });
  }
};

export const linkLogo = (currentCategory) => {
  switch (currentCategory) {
    case "doner":
      return "/i/markets/doner.png";
    case "subway":
      return "/i/markets/subway_logo.png";
    case "sfc":
      return "/i/markets/south_fried_chicken.png";
    default:
      return "";
  }
};

export const renderProducts = (currentCategory = "pizza") => {
  const currentProducts = data.menu.filter(
    (item) => item.category === currentCategory
  );

  let element = "";

  currentProducts.map((product) => {
    const isSandwiches = product.category === "sandwiches";
    product.count = 1;
    element += `
          <article class="product_card" id=${product.productID}>
              <div class=${
                product.market
                  ? "product_card__logo__show"
                  : "product_card__logo__hide"
              }>
                  <img src=${linkLogo(product.market)} />
              </div>
              <div class="product_card__image">
                <img src=${product.image} alt="no_image" />
              </div>
              <div class="product_card__name">
                  <p>${product.name}</p>
              </div>
              <div class=${
                product.description
                  ? "product_card__description__show"
                  : "product_card__description__hide"
              }>
                  <a>${product.description}</a>
              </div>
              ${
                isSandwiches
                  ? "<p></p>"
                  : `<p class="product_card__price">Цена: ${product.price} руб.</p>`
              }
              <div class="product_card__count">
                  <p>КОЛИЧЕСТВО</p>
                  <div class="product_card__board">
                      <button class="product_card__inc-dec product_dec">-</button>
                      <p class="product_card__value">${product.count}</p>
                      <button class="product_card__inc-dec product_inc">+</button>
                  </div>
              </div>
              <button class="product_card_btn_add">
                  ${isSandwiches ? "СОБРАТЬ" : "В КОРЗИНУ"}
              </button>
          </article>`;
    productsBoard.innerHTML = element;
  });

  const allCard = document.querySelectorAll(".product_card_btn_add");
  for (let i = 0; i < allCard.length; i++) {
    allCard[i].addEventListener("click", () => {
      const selectedProduct = data.menu.find(
        (item) => item.productID === allCard[i].parentNode.id
      );
      selectedProduct.category === "sandwiches"
        ? collectProduct(selectedProduct)
        : addProductInShoppingCard(selectedProduct);
    });
  }

  addEventOnIncDec(".product_inc");
  addEventOnIncDec(".product_dec");
};

export const addEventsOnTabs = (categories, newClass) => {
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", (e) => {
      const currentChildren = e.target.parentElement.children;
      for (let i = 0; i < currentChildren.length; i++) {
        currentChildren[i].classList.remove(newClass);
        const countModal = document.querySelector(".count_modal");
        const btnModal = document.querySelector(".modal_btn");

        currentChildren[i].id === "done" &&
          countModal &&
          footerModal.childNodes[0].remove();
        bottomFooter.childNodes[3] &&
          btnModal &&
          bottomFooter.childNodes[3].remove();
      }
      e.target.classList.add(newClass);
      newClass === "active_tab"
        ? renderProducts(e.target.id)
        : renderIngredients(e.target.id);
    });
  }
};
