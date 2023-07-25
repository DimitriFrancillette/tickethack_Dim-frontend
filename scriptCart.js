console.log("scriptCart working !")

fetch('http://localhost:3000/bookings/')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        if (data.result === false) {

            document.querySelector('#mainContent').innerHTML = `
                <div id="cart" class="flex flex-col justify-evenly bg-white w-3/5 min-h-emptyCart max-h-emptyCart rounded-lg font-bold">
                    <div id="upperText" class="text-center text-lg font-medium">
                        No Booking yet.
                    </div>

                    <div id="bottomText" class="text-center text-lg font-medium">
                        Why not plan a trip?
                    </div>
                </div>
            `;
            return;
        }

        if (data.result === true) {

            document.querySelector('#itemsContainer').innerHTML = '';

            for (const trip of data.bookings) {
                console.log(trip.trip)

                const date = new Date(trip.trip.date);
                const hours = date.getHours();
                let minutes = date.getMinutes();
                if (minutes < 10) {
                    minutes = `0${minutes}`
                }

                document.querySelector('#itemsContainer').innerHTML += `
                    <div id="travelContainer" class="flex justify-between items-center bg-cartTravel m-1 px-4 min-h-travel w-3/4 rounded">
                        <div id="cities">${trip.trip.departure} > ${trip.trip.arrival}</div>
                        <div id="hour">${hours}:${minutes}</div>
                        <div id="price">${trip.trip.price}€</div>
                        <input type="submit" id="delete-btn" class="bg-tickethack h-10 w-10 p-2 rounded text-white" value="X">
                    </div>
                `;
            }
        }



    })
