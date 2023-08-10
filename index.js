const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const formContainer = document.getElementById("form__container");
const inputNumber = document.getElementById("numero");
const cardContainer = document.getElementById("card__container");
const error = document.getElementById("error");

const guardarUltimaBusqueda =
  JSON.parse(localStorage.getItem("ultimaBusqueda")) || {};

const saveToLocalStorage = (busqueda) => {
  localStorage.setItem("ultimaBusqueda", JSON.stringify(busqueda));
};

const searchPizza = (e) => {
  e.preventDefault();

  if (inputNumber.value === "") {
    cardContainer.innerHTML = "";
    error.textContent = "Ingresar un numero";
    cardContainer.appendChild(error);
    return;
  }

  const pizza = pizzas.find((pizza) => pizza.id == inputNumber.value);

  if (!pizza) {
    cardContainer.innerHTML = " ";
    error.textContent = "Ingresar un numero valido";
    cardContainer.appendChild(error);
    return;
  }

  if (pizza) {
    error.textContent = "";
    cardContainer.innerHTML = `
    <div class="card__text">
    <h3>${pizza.nombre}</h3>
    <p>$${pizza.precio}</p>
    </div>
    <img src="${pizza.imagen}" alt="pizza" />`;

    saveToLocalStorage({ tipo: "pizza_encontrada", pizza });
  }
};

const init = () => {
  formContainer.addEventListener("submit", searchPizza);
  if (guardarUltimaBusqueda.tipo === "pizza_encontrada") {
    const pizza = guardarUltimaBusqueda.pizza;
    if (pizza) {
      error.textContent = "";
      cardContainer.innerHTML = `
      <div class="card__text">
      <h3>${pizza.nombre}</h3>
      <p>$${pizza.precio}</p>
      </div>
      <img src="${pizza.imagen}" alt="pizza" />`;
    } else {
      cardContainer.innerHTML = "Ingresar un numero";
      error.textContent = "Ingresar un numero valido";
      cardContainer.appendChild(error);
    }
  }
};

init();
