import { customSandwich } from "./scriptMain.js";
import { modalWindow } from "./scriptMain.js";
import { headerModalText } from "./scriptMain.js";
import { modalIngredients } from "./scriptMain.js";
import { ALL_CATEGORIES } from "./scriptMain.js";
import { modalPrice } from "./scriptMain.js";
import { allObjData } from "./scriptMain.js";
import { footerModal } from "./scriptMain.js";
import { bottomFooter } from "./scriptMain.js";
import { addProductInShoppingCard } from "./scriptMenu.js";
import { tabsModal } from "./scriptMain.js";
import data from "./data.js";

const concatIdIngredients = () => {
  const arr = [];
  allObjData.forEach((item) => {
    if (item !== "menu") data[item].forEach((key) => arr.push(key));
  });
  return arr;
};

const calculatePrice = () => {
  const haveIngredients = document.querySelector(".have_ingredients");

  if (haveIngredients) {
    const result = customSandwich.allIdIngredients.map((item) =>
      concatIdIngredients().find((key) => key.productID === item)
    );

    if (result.length) {
      const arrPrice = result.map((item) => item.price);
      const calcValue = arrPrice.reduce((acc, cur) => acc + cur);
      customSandwich.price = calcValue;
    } else {
      customSandwich.price = 0;
    }
  } else {
    customSandwich.price = 0;
  }
};

export const onCloseModal = () => {
  modalWindow.classList.remove("open_modal");

  const countPanel = document.querySelector(".count_modal");
  const modalBtn = document.querySelector(".modal_btn");

  if (countPanel) countPanel.remove();
  if (modalBtn) modalBtn.remove();

  for (let i = 0; i < tabsModal.length; i++) {
    tabsModal[i].classList.remove("active_ingredients");
    tabsModal[i].classList.remove("have_ingredients");
    if (i === 0) tabsModal[i].classList.add("active_ingredients");
  }
  Object.keys(customSandwich).forEach((key) => delete customSandwich[key]);
  modalPrice.innerHTML = "Цена: 0 руб.";
};

const onClickCardInModal = (selectedElement, category) => {
  const isMultipleCaterory =
    category === ALL_CATEGORIES.vegetables ||
    category === ALL_CATEGORIES.sauces ||
    category === ALL_CATEGORIES.fillings;

  const searchResults = data[category].find(
    (item) => item.productID === selectedElement.id
  );

  if (Object.keys(customSandwich).length === 5)
    customSandwich.allIdIngredients = [];

  if (!customSandwich.hasOwnProperty(category)) {
    selectedElement.classList.add("selected_ingredient");
    if (isMultipleCaterory) {
      customSandwich[category] = [searchResults];
    } else {
      customSandwich[category] = searchResults.name;
    }
    if (
      customSandwich.hasOwnProperty("allIdIngredients") &&
      !customSandwich.allIdIngredients.includes(selectedElement.id)
    ) {
      customSandwich.allIdIngredients.push(selectedElement.id);
    } else {
      if (!customSandwich.hasOwnProperty("allIdIngredients")) {
        customSandwich.allIdIngredients = [];
        customSandwich.allIdIngredients.push(selectedElement.id);
      }

      customSandwich.allIdIngredients.splice(
        customSandwich.allIdIngredients.findIndex(
          (item) => item === selectedElement.id
        ),
        1
      );
      selectedElement.classList.remove("selected_ingredient");
    }
  } else if (customSandwich.allIdIngredients.includes(selectedElement.id)) {
    selectedElement.classList.remove("selected_ingredient");

    if (isMultipleCaterory) {
      if (customSandwich[category].length === 1) {
        delete customSandwich[category];
      } else {
        customSandwich[category].splice(
          customSandwich[category].findIndex(
            (item) => item.productID === selectedElement.id
          ),
          1
        );
      }
    } else {
      delete customSandwich[category];
    }

    customSandwich.allIdIngredients.splice(
      customSandwich.allIdIngredients.findIndex(
        (item) => item === selectedElement.id
      ),
      1
    );

    if (customSandwich.allIdIngredients.length === 0) {
      delete customSandwich.allIdIngredients;
      customSandwich.price = 0;
    }
  } else {
    const cardsModal = document.querySelectorAll(".modal_window__card");
    const currentCard = document.querySelector(".selected_ingredient");

    if (!isMultipleCaterory) {
      customSandwich.allIdIngredients.splice(
        customSandwich.allIdIngredients.findIndex(
          (item) => item === currentCard.id
        ),
        1
      );
    }

    customSandwich.allIdIngredients.push(selectedElement.id);

    if (isMultipleCaterory) {
      customSandwich[category].push(searchResults);
      selectedElement.classList.add("selected_ingredient");
    } else {
      customSandwich[category] = searchResults.name;
    }

    for (let i = 0; i < cardsModal.length; i++) {
      !isMultipleCaterory &&
        cardsModal[i].classList.remove("selected_ingredient");
    }

    selectedElement.classList.add("selected_ingredient");
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
};

export const renderIngredients = (ingredients = "sizes") => {
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
        onClickCardInModal(allCardModal[i], ingredients);
      });
    }
  } else {
    modalIngredients.classList.add("done_tab");
    element = `
          <div class="modal_window__leftContent">
            <div class="product_card__image modal_image">
              <img src="${customSandwich.image}">
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
                ? [...customSandwich.sauces.map((item) => `${item.name}`)]
                : "-"
            }</p>
            <p class="modal_window__descriptionLast">Начинка: ${
              customSandwich.hasOwnProperty("fillings")
                ? [...customSandwich.fillings.map((item) => `${item.name} `)]
                : "-"
            }</p>
            <p class="modal_window__nameSandwitch">${customSandwich.name}</p>
          </div>
      `;

    element1 = `
        <p>КОЛИЧЕСТВО</p>
        <div class="product_card__board modal_board">
          <button class="product_card__inc-dec dec_modal">-</button>
          <p class="product_card__value count_modal_value">${customSandwich.count}</p>
          <button class="product_card__inc-dec inc_modal">+</button>
        </div>
      `;

    modalIngredients.innerHTML = element;

    const countElement = document.createElement("div");
    const buttonElement = document.createElement("button");

    countElement.className = "product_card__count count_modal";
    buttonElement.className = "product_card_btn_add modal_btn";

    countElement.innerHTML = element1;
    buttonElement.innerText = "В корзину";

    buttonElement.addEventListener("click", () => {
      addProductInShoppingCard(customSandwich);
      onCloseModal();
    });

    footerModal.prepend(countElement);
    bottomFooter.appendChild(buttonElement);

    const incModal = document.querySelector(".inc_modal");
    const decModal = document.querySelector(".dec_modal");
    const valueModal = document.querySelector(".count_modal_value");

    incModal.addEventListener("click", () => {
      customSandwich.count++;
      valueModal.innerHTML = customSandwich.count;
    });

    decModal.addEventListener("click", () => {
      if (customSandwich.count > 1) {
        customSandwich.count--;
        valueModal.innerHTML = customSandwich.count;
      }
    });
  }
};

const openModal = () => {
  modalWindow.classList.add("open_modal");
};

export const collectProduct = (product) => {
  if (!customSandwich.hasOwnProperty("nameSandwich"))
    customSandwich.name = product.name;
  if (!customSandwich.hasOwnProperty("image"))
    customSandwich.image = product.image;
  if (!customSandwich.hasOwnProperty("count"))
    customSandwich.count = product.count;
  if (!customSandwich.hasOwnProperty("productID"))
    customSandwich.productID = product.productID;
  if (!customSandwich.hasOwnProperty("price")) customSandwich.price = 0;

  openModal();
  renderIngredients();
};
