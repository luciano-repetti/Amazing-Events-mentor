fetch("../js/amazing.json")
    .then(response => response.json())
    .then(data => {
        let dataEvents = data.events
        const pastEvents = arrayPast(data)
        printCategory(pastEvents)
        leakers(pastEvents)

    })