fetch("../js/amazing.json")
    .then(response => response.json())
    .then(data => {
        
        let upcomingStats = document.getElementById("upcomingStats")
        let pastStats = document.getElementById("pastStats")


        // const eventsPast = categoriesStats(arrayPast(data))
        // const eventsUpcoming = categoriesStats(arrayUpcoming(data))

        const events = categoriesStats(data.events)

        // printStats(eventsPast, upcomingStats)
        // printStats(eventsUpcoming, pastStats)



    })