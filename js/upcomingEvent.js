fetch("../js/amazing.json")
    .then(response => response.json())
    .then(data => {
        const upcomingEvents = arrayUpcoming(data)
        printCategory(upcomingEvents)
        leakers(upcomingEvents)
    })