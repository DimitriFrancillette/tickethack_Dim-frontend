console.log("scriptBookings working !")


fetch('http://localhost:3000/bookings/booked')
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

                const date = new Date(trip.trip.date);
                let day = date.getDate();
                let month = date.getMonth() +1;
                const hours = date.getHours();
                let minutes = date.getMinutes();
                if (day < 10) {
                    day = `0${day}`
                }
                if (month < 10) {
                    month = `0${month}`
                }
                if (minutes < 10) {
                    minutes = `0${minutes}`
                }

                const nowTime = Date.now();
                const tripTime = Date.parse(trip.trip.date);
                const timeDifference = tripTime - nowTime;

                const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

                document.querySelector('#itemsContainer').innerHTML += `
                    <div id="travelContainer" data-tripid=${trip.trip._id} class="flex justify-between items-center bg-cartTravel m-1 px-4 min-h-travel w-3/4 rounded">
                        <div id="cities">${trip.trip.departure} > ${trip.trip.arrival}</div>
                        <div id="hour">${day}/${month} at ${hours}:${minutes}</div>
                        <div id="price">${trip.trip.price}€</div>
                        <div id="departureCount">Departure in about ${hoursDifference} hours</div>
                    </div>
                `;

            }
        }

        // const deleteButtons = document.querySelectorAll('#delete-btn');

        // for (const button of deleteButtons) {
        //     button.addEventListener('click', function () {
        //         removeFromCart(button.dataset.trip);
        //         totalPrice -= button.dataset.price;
        //         this.parentNode.remove();
        //         setTotalPrice(totalPrice)
        //     });
        // };
});