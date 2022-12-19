const menuExpand = () => {
  let submenu = document.getElementById("expand");
  submenu.classList.toggle("show");
};

function arrayPast(data) {
  let dataEvents = data.events;
  let fechaActual = data.currentDate;
  return dataEvents.filter((event) => event.date < fechaActual);
}

function arrayUpcoming(data) {
  let dataEvents = data.events;
  let fechaActual = data.currentDate;
  return dataEvents.filter((event) => event.date > fechaActual);
}

function filterCategorys(dataEvents) {
  let arrayCategory = dataEvents.map((card) => card.category);

  const categories = arrayCategory.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
  return categories;
}

function printCategory(dataEvents) {
  let containerFilters = document.getElementById("containerFilter");

  filterCategorys(dataEvents).forEach((category) => {
    containerFilters.innerHTML += `
        <div>
            <label class="switch">
            <input type="checkbox"  value="${category}">
            <span class="slider round"></span>
            </label>
            ${category}
        </div>
        `;
  });
}

function printCards(dataEvents) {
  let containerCards = document.getElementById("containerCards");
  containerCards.innerHTML = "";

  dataEvents.forEach((events) => {
    containerCards.innerHTML += `
        <div class="card">
            <img src="${events.image}" alt="">
            <div class="data">
                <p class="name">${events.name}</p>
                <p class="description">${events.description}</p>
            </div>
            <div class="footerCard">
                <p class="price">$ ${events.price}</p>
                <a href="" class="seeMore">see more</a>
            </div>
        </div>
        `;
  });
}

let checkboxSelector = [];
let textSearch = "";

function leakers(dataEvents) {
  printCards(dataEvents);
  let search = document.getElementById("search");

  search.addEventListener("keyup", (event) => {
    textSearch = event.target.value;
    filter(dataEvents);
  });

  let arrayCheckboxes = document.querySelectorAll("input[type=checkbox]");

  arrayCheckboxes.forEach((check) =>
    check.addEventListener("click", (event) => {
      let branded = event.target.checked;

      if (branded) {
        checkboxSelector.push(event.target.value);
        filter(dataEvents);
      } else {
        checkboxSelector = checkboxSelector.filter(
          (unmarked) => unmarked !== event.target.value
        );
        filter(dataEvents);
      }
    })
  );
}

function filter(dataEvents) {
  const eventsFilter = [];
  if (checkboxSelector.length > 0 && textSearch != "") {
    checkboxSelector.map((checkbox) =>
      eventsFilter.push(
        ...dataEvents.filter(
          (event) =>
            event.name
              .trim()
              .toLowerCase()
              .includes(textSearch.trim().toLowerCase()) &&
            checkbox === event.category
        )
      )
    );
    printCards(eventsFilter);
  } else if (checkboxSelector.length > 0 && textSearch === "") {
    checkboxSelector.map((checkbox) =>
      eventsFilter.push(
        ...dataEvents.filter((event) => event.category === checkbox)
      )
    );
    printCards(eventsFilter);
  } else if (checkboxSelector == 0 && textSearch !== "") {
    eventsFilter.push(
      ...dataEvents.filter((event) =>
        event.name
          .trim()
          .toLowerCase()
          .includes(textSearch.trim().toLowerCase())
      )
    );
    printCards(eventsFilter);
  } else {
    printCards(dataEvents);
  }
}

function categoriesStats(events) {
  let categories = filterCategorys(events);

  let eventsRevenues = [];
  let eventsPercentaje = [];
  let categoriesStats = [];

  // primero tranformo el array de categorias en un array de categorias por evento.

  const arrayCategories = categories.map((category) =>
    events.filter((event) => event.category === category)
  );
  console.log(arrayCategories);

  // segundo reduzco cada array para obtener lo estadisticos que necesito.

  // En el reduce entra un array de objetos(eventos de esa categoria)
  // Debe salir la reduccion, que seria un objeto con las propiedades ganacia(suma de todas las ganancias), porcentaje de asistencia y las categorias

  arrayCategories.reduce((acc, category) => {
    console.log(acc, category)
    category.forEach(event =>{
        if (event.assistance) {
          acc =+ category.assistance * category.price;
        } else if (event.estimate) {
          acc =+ category.estimate * category.price;
        }
    })
    //este es el objeto 0 con el que empieza la reduccion, en cada iteracion se van haciendo las operaciones necesesarias para reducir el array a un objeto reducido
    //para reducir la categoria tengo que 
  }, {
    category: "",
    revenues: 0,
    percentage: 0,
  });

  // categories.forEach(category =>{
  //     events.reduce((acc, event) =>{
  //         if(event.category === category){
  //             if(event.assistance){
  //                 acc =+ event.assistance * event.price
  //             }else if(event.estimate){
  //                 acc =+ event.estimate * event.price
  //             }
  //             eventsRevenues.push(acc)
  //         }
  //     }, 0)

  //     events.reduce((acc, event) =>{
  //         if(event.category === category){
  //             if(event.assistance){
  //                 acc =+ (event.assistance * 100) / event.capacity
  //             }else if(event.estimate){
  //                 acc =+ (event.estimate * 100) / event.capacity
  //             }
  //             eventsPercentaje.push(acc.toFixed(2))
  //         }
  //     }, 0)
  // })
  // for (let i = 0; i < categories.length; i++) {
  //     categoriesStats.push(
  //         {
  //             category: categories[i],
  //             revenue: eventsRevenues[i],
  //             percentaje: eventsPercentaje[i]
  //         }
  //     )
  // }
  // return categoriesStats
}

function printStats(categoriesArray, container) {
  container.innerHTML = "";
  categoriesArray.map((category) => {
    container.innerHTML += `
        <tr>
            <td>${category.category}</td>
            <td>$${category.revenue}</td>
            <td>${category.percentaje}%</td>
        </tr>`;
  });
}
