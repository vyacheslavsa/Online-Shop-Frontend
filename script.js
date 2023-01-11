import data from "./data.js";

const allCategory = document.querySelectorAll(".side_bar");
const allTabs = document.querySelectorAll(".modal_window__tabs_panel");
const productsBoard = document.querySelector(".products_board");
const modalWindow = document.querySelector(".modal_bg");
const buttonCloseModal = document.querySelector(".modal_window__close_button");
const headerModalText = document.querySelector(".modal_window__head_text");
const modalIngredients = document.querySelector(".modal_window__ingredients");
const modalPrice = document.querySelector(".modal_price");
const tabsModal = document.querySelectorAll(".modal_window__tab");
const footerModal = document.querySelector(".modal_window__footer");
const bottomFooter = document.querySelector(".modal_window__bottomFooter");

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

const concatIdIngredients = () => {
  const arr = [];
  allObjData.forEach((item) => {
    if (item !== "menu") {
      data[item].forEach((key) => {
        arr.push(key);
      });
    }
  });
  return arr;
};

const calculatePrice = () => {
  const haveIngredients = document.querySelector(".have_ingredients");

  if (haveIngredients) {
    const result = customSandwich.allIdIngredients.map((item) =>
      concatIdIngredients().find((key) => key.productID === item)
    );
    const arrPrice = result.map((item) => item.price);

    const calcValue = arrPrice.reduce((acc, cur) => acc + cur);
    customSandwich.price = calcValue;
  } else {
    customSandwich.price = 0;
  }
};

const addEventsOnTabs = (categories, newClass) => {
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

buttonCloseModal.addEventListener("click", () => {
  modalWindow.classList.remove("open_modal");
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

const collectProduct = (product) => {
  openModal();
  renderIngredients();
  if (!customSandwich.hasOwnProperty("nameSandwich"))
    customSandwich.nameSandwich = product.name;
  if (!customSandwich.hasOwnProperty("srcImage"))
    customSandwich.srcImage = product.image;
};

const addProductInShoppingCard = (product) => {
  console.log("addProductInShoppingCard", product);
};

const eventCardModal = (product, category) => {
  const propertyIsArray =
    category === "vegetables" ||
    category === "sauces" ||
    category === "fillings";

  const searchResults = data[category].find(
    (item) => item.productID === product.id
  );
  if (Object.keys(customSandwich).length === 2)
    customSandwich.allIdIngredients = [];

  if (!customSandwich.hasOwnProperty(category)) {
    product.classList.add("selected_ingredient");
    if (propertyIsArray) {
      customSandwich[category] = [searchResults];
    } else {
      customSandwich[category] = searchResults.name;
    }
    if (
      customSandwich.hasOwnProperty("allIdIngredients") &&
      !customSandwich.allIdIngredients.includes(product.id)
    ) {
      customSandwich.allIdIngredients.push(product.id);
    } else {
      if (!customSandwich.hasOwnProperty("allIdIngredients")) {
        customSandwich.allIdIngredients = [];
        customSandwich.allIdIngredients.push(product.id);
      }

      customSandwich.allIdIngredients.splice(
        customSandwich.allIdIngredients.findIndex(
          (item) => item === product.id
        ),
        1
      );
      product.classList.remove("selected_ingredient");
    }
  } else if (customSandwich.allIdIngredients.includes(product.id)) {
    product.classList.remove("selected_ingredient");

    if (propertyIsArray) {
      if (customSandwich[category].length === 1) {
        delete customSandwich[category];
      } else {
        customSandwich[category].splice(
          customSandwich[category].findIndex(
            (item) => item.productID === product.id
          ),
          1
        );
      }
    } else {
      delete customSandwich[category];
    }

    customSandwich.allIdIngredients.splice(
      customSandwich.allIdIngredients.findIndex((item) => item === product.id),
      1
    );

    if (customSandwich.allIdIngredients.length === 0) {
      delete customSandwich.allIdIngredients;
      delete customSandwich.price;
    }
  } else {
    const cardsModal = document.querySelectorAll(".modal_window__card");
    const currentCard = document.querySelector(".selected_ingredient");

    if (!propertyIsArray) {
      customSandwich.allIdIngredients.splice(
        customSandwich.allIdIngredients.findIndex(
          (item) => item === currentCard.id
        ),
        1
      );
    }

    customSandwich.allIdIngredients.push(product.id);

    if (propertyIsArray) {
      customSandwich[category].push(searchResults);
      product.classList.add("selected_ingredient");
    } else {
      customSandwich[category] = searchResults.name;
    }

    for (let i = 0; i < cardsModal.length; i++) {
      !propertyIsArray && cardsModal[i].classList.remove("selected_ingredient");
    }

    product.classList.add("selected_ingredient");
  }

  const allTabsModal = document.querySelectorAll(".modal_window__tab");
  for (let i = 0; i < allTabsModal.length; i++) {
    if (customSandwich.hasOwnProperty(allTabsModal[i].id)) {
      allTabsModal[i].classList.add("have_ingredients");
    } else {
      allTabsModal[i].classList.remove("have_ingredients");
    }
  }

  if (customSandwich.hasOwnProperty("allIdIngredients")) calculatePrice();
  modalPrice.innerHTML = `Цена: ${customSandwich.price || "0"} руб.`;
  console.log(customSandwich, "customSandwich");
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
        return "Добавьте начинку по вкусу";
      case "done":
        return "Проверьте и добавьте в корзину";
    }
  };
  headerModalText.innerHTML = currentTextHeader(ingredients);

  let element = "";
  let element1 = "";

  if (ingredients !== "done") {
    modalIngredients.classList.remove("done_tab");
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
  } else {
    modalIngredients.classList.add("done_tab");
    element = `
        <div class="modal_window__leftContent">
          <div class="product_card__image modal_image">
            <img src="${customSandwich.srcImage}">
          </div>
        </div>
        <div class="modal_window__rightContent">
          <p class="modal_window__descriptionDone">Ваш сендвич готов!</p>
          <p>Размер: ${customSandwich.sizes || "-"}</p>
          <p>Хлеб: ${customSandwich.breads || "-"}</p>
          <p>Овощи: ${
            customSandwich.hasOwnProperty("vegetables")
              ? [...customSandwich.vegetables.map((item) => `${item.name} `)]
              : "-"
          }</p>
          <p>Соусы: ${
            customSandwich.hasOwnProperty("sauces")
              ? [...customSandwich.sauces.map((item) => `${item.name} `)]
              : "-"
          }</p>
          <p class="modal_window__descriptionLast">Начинка: ${
            customSandwich.hasOwnProperty("fillings")
              ? [...customSandwich.fillings.map((item) => `${item.name} `)]
              : "-"
          }</p>
          <p class="modal_window__nameSandwitch">${
            customSandwich.nameSandwich
          }</p>
        </div>
    `;

    element1 = `
      <p>КОЛИЧЕСТВО</p>
      <div class="product_card__board">
        <button class="product_card__inc-dec">-</button>
        <p class="product_card__value">1</p>
        <button class="product_card__inc-dec">+</button>
      </div>
    `;

    modalIngredients.innerHTML = element;

    const countElement = document.createElement("div");
    const buttonElement = document.createElement("button");

    countElement.className = "product_card__count count_modal";
    buttonElement.className = "product_card_btn_add modal_btn";

    countElement.innerHTML = element1;
    countElement.innerHTML = element1;
    buttonElement.innerText = "В корзину";

    footerModal.prepend(countElement);
    bottomFooter.appendChild(buttonElement);
  }
};

const addEvents = () => {
  addEventsOnTabs(allCategory, "active_tab");
  addEventsOnTabs(allTabs, "active_ingredients");
};

addEvents();
renderProducts();
