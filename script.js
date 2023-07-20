console.log("working !")

document.querySelector('#search-btn').addEventListener('click', function () {
    const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    const date = document.querySelector('#date').value;


    if (!departure || !arrival || !date) {
        document.querySelector('#rightBoxImg').style.backgroundImage = "url(/ticketHack-Dim/frontend/images/notfound.png)"
        document.querySelector('#rightBoxText').textContent = "No trip found.";
        return
    }

    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === false) {
                document.querySelector('#rightbox').innerHTML = `
                <div id="rightBoxImg" class="bg-contain bg-no-repeat bg-center h-3/5" style="background-image: url(/ticketHack-Dim/frontend/images/notfound.png);">
                </div>
                <div id="rightBoxText" class="text-center text-lg font-medium">
                    No trip found.
                </div>
                `;
                return;
            }


            if (data.trips) {
                document.querySelector('#rightbox').innerHTML = '';
                for (let i = 0; i < data.trips.length; i++) {
                    const date = new Date(data.trips[i].date);
                    const hours = date.getHours();
                    let minutes = date.getMinutes();
                    if (minutes < 10) {
                        minutes = `0${minutes}`
                    }
                    document.querySelector('#rightbox').innerHTML += `
                        <div id="travelContainer" class="flex justify-between items-center bg-cartTravel m-1 px-4 h-14 rounded">
                            <div id="cities">${data.trips[i].departure} > ${data.trips[i].arrival}</div>
                            <div id="hour">${hours}:${minutes}</div>
                            <div id="price">${data.trips[i].price}€</div>
                            <input type="submit" id="book-btn" data-trip=${data.trips[i]._id} class="bg-tickethack h-10 w-14 p-2 rounded text-white" value="Book">
                        </div>
                    `
                }


                const bookButtons = document.querySelectorAll('#book-btn');

                for (const button of bookButtons) {

                    button.addEventListener('click', function () {
                        console.log(button.dataset.trip);
                    });
                }


                    



            };

        });



});
