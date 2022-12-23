fetch("../js/amazing.json")
    .then(response => response.json())
    .then(data => {
        
        let upcomingStats = document.getElementById("upcomingStats")
        let pastStats = document.getElementById("pastStats")
        let topStats = document.getElementById("topStats")


        const eventsPast = categoriesStats(arrayPast(data))
        const eventsUpcoming = categoriesStats(arrayUpcoming(data))

        const events = categoriesStats(data.events)

        printStats(eventsPast, pastStats)
        printStats(eventsUpcoming, upcomingStats)

        
        let moreAttendance = attendance(arrayPast(data))[0].nameEvent
        let lowerAttendance = attendance(arrayPast(data)).reverse()[0].nameEvent
        let moreCapacity = capacity(arrayPast(data)).reverse()[0].nameEvent

        let objetoStats = [
            moreAttendance,
            lowerAttendance,
            moreCapacity
        ]

        printStatsTop(objetoStats, topStats)




    })

