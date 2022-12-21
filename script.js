import data from "./data.js";

const menu = data.menu;
const allCategory = document.querySelectorAll(".side_bar");
const productsBoard = document.querySelector(".products_board");

const changeTab = () => {
  for (let i = 0; i < allCategory.length; i++) {
    allCategory[i].addEventListener("click", (e) => {
      const currentChildren = e.target.parentElement.children;
      for (let i = 0; i < currentChildren.length; i++) {
        currentChildren[i].classList.remove("active_tab");
      }
      e.target.classList.add("active_tab");

      renderProducts(e.target.id);
    });
  }
};

const linkLogo = (currentCategory) => {
  switch (currentCategory) {
    case "doner":
      return "/i/markets/doner.png";
      break;
    case "subway":
      return "/i/markets/subway_logo.png";
      break;
    case "sfc":
      return "/i/markets/south_fried_chicken.png";
      break;
    default:
      return "";
  }
};

const renderProducts = (currentCategory = "pizza") => {
  const currentProducts = menu.filter(
    (item) => item.category === currentCategory
  );

  let element = "";

  currentProducts.map((product) => {
    console.log(linkLogo(product.market));

    element += `
        <article class="product_card">
            <div class=${
              product.market ? "product_card__logo" : "product_card__logo_none"
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
                ? "product_card__description"
                : "product_card__description_none"
            }>
                <a>${product.description}</a>
            </div>
                <p class="product_card__price">Цена: ${product.price} руб.</p>
            <div class="product_card__count">
                <p>КОЛИЧЕСТВО</p>
                <div class="product_card__board">
                    <button class="product_card__inc-dec">-</button>
                    <p class="product_card__value">1</p>
                    <button class="product_card__inc-dec">+</button>
                </div>
            </div>
            <button class="product_card_btn_add">В КОРЗИНУ</button>
        </article>`;
    productsBoard.innerHTML = element;
  });
};

renderProducts();
changeTab();
