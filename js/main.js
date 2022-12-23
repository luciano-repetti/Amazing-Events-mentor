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
  const arrayCategories = categories.map(category => events.filter(event => event.category === category))

  
  const arrayStats = arrayCategories.map(categoryEvents => {
    
    let objetoStats = categoryEvents.reduce((acc, event) =>{
        acc.category = event.category
        acc.revenue += ((event.assistance || event.estimate) * event.price);
        acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
        
        return acc
      }, {
        category: "",
        revenue: 0,
        attendance: 0,
      })
    
      objetoStats.attendance = objetoStats.attendance / categoryEvents.length
      return objetoStats
    })
    return arrayStats
}

function attendance(eventsPast){
  const arrayAttendance = eventsPast.map(event => {
    return {
      attendance: event.assistance * 100 / event.capacity,
      nameEvent: event.name
    }
  })

  arrayAttendance.sort((a,b) => a.attendance - b.attendance).reverse()
  return arrayAttendance
  
}

function capacity(eventsPast){
  const arrayCapacity = eventsPast.map(event => {
    return {
      capacity: event.assistance * event.price,
      nameEvent: event.name
    }
  })

  arrayCapacity.sort((a,b) => a.capacity - b.capacity).reverse()
  return arrayCapacity
}

function printStats(categoriesArray, container) {
  container.innerHTML = "";
  categoriesArray.map((category) => {
    container.innerHTML += `
        <tr>
            <td>${category.category}</td>
            <td>$${category.revenue}</td>
            <td>${category.attendance.toFixed(2)}%</td>
        </tr>`;
  });
}

function printStatsTop(objetoStats, container) {
  container.innerHTML = "";
  console.log(objetoStats)
    container.innerHTML = `
        <tr>
            <td>${objetoStats[0]}</td>
            <td>${objetoStats[1]}</td>
            <td>${objetoStats[2]}</td>
        </tr>`;
}
