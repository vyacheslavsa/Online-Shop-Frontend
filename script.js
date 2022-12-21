import data from "./data.js";

const allCategory = document.querySelectorAll(".side_bar");
const productsBoard = document.querySelector(".products_board");
const modalWindow = document.querySelector(".modal_bg");
const buttonCloseModal = document.querySelector(".modal_window__close_button");

const menu = data.menu.map((item) => {
  item.productID = String(Math.round(Math.random() * 10000000000000000000));
  return item;
});

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

const linkLogo = (currentCategory) => {
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

const openModal = () => {
  modalWindow.classList.add("open_modal");
  buttonCloseModal.addEventListener("click", () =>
    modalWindow.classList.remove("open_modal")
  );
};

const collectProduct = (product) => {};

const addProduct = (product) => {
  openModal();
};

const renderProducts = (currentCategory = "pizza") => {
  const currentProducts = menu.filter(
    (item) => item.category === currentCategory
  );

  let element = "";

  currentProducts.map((product) => {
    const isSandwiches = product.category === "sandwiches";
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
                <p class="product_card__price">Цена: ${product.price} руб.</p>
            <div class="product_card__count">
                <p>КОЛИЧЕСТВО</p>
                <div class="product_card__board">
                    <button class="product_card__inc-dec">-</button>
                    <p class="product_card__value">1</p>
                    <button class="product_card__inc-dec">+</button>
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
      const selectedProduct = menu.find(
        (item) => item.productID === allCard[i].parentNode.id
      );
      selectedProduct.category === "sandwiches"
        ? collectProduct(selectedProduct)
        : addProduct(selectedProduct);
    });
  }
};

renderProducts();
