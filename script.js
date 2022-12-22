import data from "./data.js";

const allCategory = document.querySelectorAll(".side_bar");
const allTabs = document.querySelectorAll(".modal_window__tabs_panel");
const productsBoard = document.querySelector(".products_board");
const modalWindow = document.querySelector(".modal_bg");
const buttonCloseModal = document.querySelector(".modal_window__close_button");
const footerModal = document.querySelector(".modal_window__footer");
const headerModalText = document.querySelector(".modal_window__head_text");
const modalIngredients = document.querySelector(".modal_window__ingredients");
const childFooter = footerModal.childNodes;

const allObjData = ["breads", "fillings", "sauces", "sizes", "vegetables"];

const addIDforData = () => {
  const generateID = () =>
    String(Math.round(Math.random() * 10000000000000000000));

  const addID = (arr) => {
    arr.map((item) => (item.productID = generateID()));
  };

  allObjData.push("menu");

  allObjData.forEach((item) => {
    addID(data[item]);
  });
};

const reFormatData = () => {
  allObjData.forEach((item) => {
    const newArr = [];
    for (const key in data[item]) {
      newArr.push(data[item][key]);
    }
    data[item] = newArr;
  });
};

reFormatData();
addIDforData();

const addEventsOnTabs = (categories, newClass) => {
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", (e) => {
      const currentChildren = e.target.parentElement.children;
      for (let i = 0; i < currentChildren.length; i++) {
        currentChildren[i].classList.remove(newClass);
      }
      e.target.classList.add(newClass);
      newClass === "active_tab"
        ? renderProducts(e.target.id)
        : renderIngredients(e.target.id);
    });
  }
};

buttonCloseModal.addEventListener("click", () => {
  modalWindow.classList.remove("open_modal");
  imageBlock.classList.add("modal_image")
  // childFooter[1].classList.remove("count_modal");
});

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
  // childFooter[1].classList.add("count_modal");
};

const collectProduct = (product) => {};

const addProduct = (product) => {
  openModal();
  renderIngredients();
};

const renderProducts = (currentCategory = "pizza") => {
  const currentProducts = data.menu.filter(
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
      const selectedProduct = data.menu.find(
        (item) => item.productID === allCard[i].parentNode.id
      );
      selectedProduct.category === "sandwiches"
        ? collectProduct(selectedProduct)
        : addProduct(selectedProduct);
    });
  }
};



const renderIngredients = (ingredients = "sizes") => {
  const currentTextHeader = (tab) => {
    switch (tab) {
      case "sizes":
        return "Выберите размер сендвича";
      case "breads":
        return "Хлеб для сендвича на выбор";
      case "vegetables":
        return "Дополнительные овощи бесплатно";
      case "sauces":
        return "Выберите три бесплатных соуса по вкусу";
      case "fillings":
        return "Выберите размер сендвича";
      case "done":
        return "Добавьте начинку по вкусу";
      default:
        return "Проверьте и добавьте в корзину";
    }
  };
  headerModalText.innerHTML = currentTextHeader(ingredients);

  let element = "";

  data[ingredients].map((ingredients) => {
    element += `
    <div class="modal_window__card">
      <div class="product_card__image modal_image">
        <img src=${ingredients.image} alt="no_image" />
      </div>
      <div class="modal_window__description">
        <p class="modal_window__text">${ingredients.name}</p>
        <p class="modal_window__price">${ingredients.price}</p>
      </div>
    </div>
    `;
    modalIngredients.innerHTML = element;
    console.log(data)
  });
};

const addEvents = () => {
  addEventsOnTabs(allCategory, "active_tab");
  addEventsOnTabs(allTabs, "active_ingredients");
};

addEvents();
renderProducts();
