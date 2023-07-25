console.log("scriptCart working !")

fetch('http://localhost:3000/bookings/')
.then(response => response.json())
.then(data => {
    console.log(data)

    if (data.result === false) {
        
        document.querySelector('#cart').innerHTML = `
        <div id="rightBoxText" class="text-center text-lg font-medium">
            No Booking yet.
        </div>
        `;

        return;
    }

    // for (const trip of data.bookings) {
    //     console.log(trip.trip)
    // }

})
