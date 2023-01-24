import data from "./data.js";
import { renderProducts } from "./scriptMenu.js";
import { addEventsOnTabs } from "./scriptMenu.js";
import { onCloseModal } from "./scriptModal.js";

export const allCategory = document.querySelectorAll(".side_bar");
export const allTabs = document.querySelectorAll(".modal_window__tabs_panel");
export const productsBoard = document.querySelector(".products_board");
export const modalWindow = document.querySelector(".modal_bg");
export const buttonCloseModal = document.querySelector(
  ".modal_window__close_button"
);
export const headerModalText = document.querySelector(
  ".modal_window__head_text"
);
export const modalIngredients = document.querySelector(
  ".modal_window__ingredients"
);
export const modalPrice = document.querySelector(".modal_price");
export const tabsModal = document.querySelectorAll(".modal_window__tab");
export const footerModal = document.querySelector(".modal_window__footer");
export const bottomFooter = document.querySelector(
  ".modal_window__bottomFooter"
);

export const ALL_CATEGORIES = {
  breads: "breads",
  fillings: "fillings",
  sauces: "sauces",
  sizes: "sizes",
  vegetables: "vegetables",
};

export const allObjData = [
  ALL_CATEGORIES.breads,
  ALL_CATEGORIES.fillings,
  ALL_CATEGORIES.sauces,
  ALL_CATEGORIES.sizes,
  ALL_CATEGORIES.vegetables,
];

export const customSandwich = {};
export const shopingCart = [];

const addIDforData = () => {
  const generateID = () =>
    String(Math.round(Math.random() * 10000000000000000000));
  const addID = (arr) => {
    arr.map((item) => (item.productID = generateID()));
  };
  allObjData.push("menu");
  allObjData.forEach((item) => addID(data[item]));
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

buttonCloseModal.addEventListener("click", onCloseModal);

const addEvents = () => {
  addEventsOnTabs(allCategory, "active_tab");
  addEventsOnTabs(allTabs, "active_ingredients");
};

addEvents();
renderProducts();
