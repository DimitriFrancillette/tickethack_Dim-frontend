console.log("working !")

document.querySelector('#search-btn').addEventListener('click', function () {
    const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    const date = document.querySelector('#date').value;


    if (!departure || !arrival || !date) {
        // document.querySelector('#rightBoxImg').src = "/images/notfound.png";
        document.querySelector('#rightBoxImg').style.backgroundImage = "url(/ticketHack-Dim/frontend/images/notfound.png)"
        document.querySelector('#rightBoxText').textContent = "No trip found.";
        console.log('Some information is missing in your search')
        return
    }

    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === false) {
                console.log("NOP", data);
                return;
            }

            console.log(data.trips)

            if (data.trips) {
                for (let i = 0; i < data.trips.length; i++) {
                    const date = new Date(data.trips[i].date);
                    const hours = date.getHours();
                    let minutes = date.getMinutes();
                    if (minutes< 10 ) {
                        minutes = `0${minutes}`
                    }
                    document.querySelector('#rightbox').innerHTML +=`
                   <div id="travelContainer" class="flex justify-between items-center bg-cartTravel m-1 px-4 min-h-travel w-3/4 rounded">
                     <div id="cities">${data.trips[i].departure} > ${data.trips[i].arrival}</div>
                     <div id="hour">${hours}:${minutes}</div>
                     <div id="price">${data.trips[i].price}€</div>
                     <input type="submit" id="delete-btn" class="bg-tickethack h-10 w-10 p-2 rounded text-white" value="X">
                 </div>
                            `}};
        });

});