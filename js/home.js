fetch("./js/amazing.json")
    .then(response => response.json())
    .then(data => {
        let dataEvents = data.events
        printCategory(dataEvents)
        leakers(dataEvents)
    })