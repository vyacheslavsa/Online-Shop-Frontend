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

const renderProducts = (currentCategory = "pizza") => {
  const currentProducts = menu.filter(
    (item) => item.category === currentCategory
  );

  let element = "";

  currentProducts.map((product) => {
    element += `
        <article class="product_card">
            <div class="product_card__logo">
                <img src="${product.market}" alt="no_logo" />
            </div>
            <div class="product_card__image">
            <img src=${product.image} alt="no_image" />
            </div>
            <p class="product_card__name">${product.name}</p>
                <div class="product_card__description">
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

// category: "pizza";
// description: "Карбонат, бекон, курица, сыр";
// image: "/i/pizza/meat.png";
// market: "";
// name: "Мясная 35см";
// price: 450;
// type: "single";
// weight: 1;
