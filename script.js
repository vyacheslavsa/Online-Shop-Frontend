import data from "./data.js";

const allCategory = document.querySelectorAll(".side_bar");
const allTabs = document.querySelectorAll(".modal_window__tabs_panel");
const productsBoard = document.querySelector(".products_board");
const modalWindow = document.querySelector(".modal_bg");
const buttonCloseModal = document.querySelector(".modal_window__close_button");
const headerModalText = document.querySelector(".modal_window__head_text");
const modalIngredients = document.querySelector(".modal_window__ingredients");

const allObjData = ["breads", "fillings", "sauces", "sizes", "vegetables"];
let customSandwich = {};

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
      if (newClass === "active_tab") {
        renderProducts(e.target.id);
      } else {
        renderIngredients(e.target.id);
      }
    });
  }
};

buttonCloseModal.addEventListener("click", () => {
  modalWindow.classList.remove("open_modal");
  const tabsModal = document.querySelectorAll(".modal_window__tab");
  for (let i = 0; i < tabsModal.length; i++) {
    tabsModal[i].classList.remove("active_ingredients");
    tabsModal[i].classList.remove("have_ingredients");
    if (i === 0) tabsModal[i].classList.add("active_ingredients");
  }
  customSandwich = {};
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
};

const collectProduct = () => {
  openModal();
  renderIngredients();
};

const addProductInShoppingCard = (product) => {
  console.log("addProductInShoppingCard", product);
};

const eventCardModal = (product, category) => {
  const searchResults = data[category].find(
    (item) => item.productID === product.id
  );

  if (!Object.keys(customSandwich).length) {
    customSandwich.allIdIngredients = [];
  }

  if (!customSandwich.hasOwnProperty(category)) {
    product.classList.add("selected_ingredient");
    customSandwich[category] = searchResults.name;
    customSandwich.allIdIngredients.push(product.id);
  } else {
    product.classList.remove("selected_ingredient");
    delete customSandwich[category];
    customSandwich.allIdIngredients.splice(
      customSandwich.allIdIngredients.findIndex((item) => item === product.id),
      1
    );
    if (customSandwich.allIdIngredients.length === 0)
      delete customSandwich.allIdIngredients;
  }

  const allTabsModal = document.querySelectorAll(".modal_window__tab");
  for (let i = 0; i < allTabsModal.length; i++) {
    if (customSandwich.hasOwnProperty(allTabsModal[i].id)) {
      allTabsModal[i].classList.add("have_ingredients");
    } else {
      allTabsModal[i].classList.remove("have_ingredients");
    }
  }
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
        : addProductInShoppingCard(selectedProduct);
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

  if (ingredients !== "done") {
    data[ingredients].map((ingredients) => {
      element += `
        <div class="modal_window__card" id=${ingredients.productID}>
          <div class="product_card__image modal_image">
            <img src=${ingredients.image} alt="no_image" />
          </div>
          <div class="modal_window__description">
            <p class="modal_window__text">${ingredients.name}</p>
            <p class="modal_window__price">Цена: ${ingredients.price} руб.</p>
          </div>
        </div>
        `;
      modalIngredients.innerHTML = element;
    });

    const allCardModal = document.querySelectorAll(".modal_window__card");
    for (let i = 0; i < allCardModal.length; i++) {
      if (
        customSandwich.hasOwnProperty("allIdIngredients") &&
        customSandwich.allIdIngredients.includes(allCardModal[i].id)
      )
        allCardModal[i].classList.add("selected_ingredient");

      allCardModal[i].addEventListener("click", () => {
        eventCardModal(allCardModal[i], ingredients);
      });
    }
  }
};

const addEvents = () => {
  addEventsOnTabs(allCategory, "active_tab");
  addEventsOnTabs(allTabs, "active_ingredients");
};

addEvents();
renderProducts();
