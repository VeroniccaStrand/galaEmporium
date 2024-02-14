function formatDateTime(dateTimeString) {
    const options = {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone: "UTC",
    };
    const formattedDate = new Date(dateTimeString).toLocaleDateString(
        "sv-SE",
        options
    );
    return formattedDate;
}

export default async function nomads(clubId = '65cc8a73e536d3509bd17b59') {
    try {
        const response = await fetch(`http://localhost:3000/api/events/club/${clubId}`, {
            method: 'GET', // Ändra metoden till GET eftersom du hämtar data
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const events = await response.json();

        if (!response.ok) {
            console.error("Error fetching events:", response.statusText);
            // Hantera felet efter behov
            return "Error fetching data from the database";
        }

        events.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

        const eventCards = events
            .map((event, index) => {
                const cardClass = index % 2 === 0 ? "even" : "odd";

                return `
            <div class="event-card ${cardClass}">
              <div class="event-info">
                <p class='date-time'>${formatDateTime(event.dateTime)}</p>
                <div class='event-text-wrap'>
                  <h3 class='event-title'>${event.name}</h3>
                  <p class='event-desc'>${event.desc}</p>
                </div>
                <div class="buy-wrap">
                  <span class="price">Price: ${event.price}kr</span>
                  <span class="tickets">Tickets left: ${event.tickets}</span>
                  <button class='buy-btn'>Buy Ticket</button>
                </div>
              </div>
            </div>
          `;
            })
            .join("");

        console.log(events);
        return `        
        <div id="dandelionWrap">

            <div id="dandelionHeader">
                <img id="clubLogo" src="pages/dandelionJazzClub/images/djc.png" alt="Dandelion club logo" height="200px" width="826px"></a>
            </div>

            <div id="dandelionNav">
                <a href="#dandelionAboutHead"> <img class="dandelionAboutBtn" src="pages/dandelionJazzClub/images/about.png" width="150px"></a>
                <a href="#dandelionCalendarHead"> <img class="dandelionCalendarBtn" src="pages/dandelionJazzClub/images/events.png" width="150px"></a>
                <a href="#dandelionContactHead"> <img class="dandelionContactBtn" src="pages/dandelionJazzClub/images/contact.png" width="150px"></a>
            </div>

            <div id="photoCollection">
                <img src="pages/dandelionJazzClub/images/djc1.jpeg" alt="Club" height="100px" width="350px" ></a>
                <img src="pages/dandelionJazzClub/images/djc2.png" alt="Artwork" height="100px" width="350px" ></a>
                <img src="pages/dandelionJazzClub/images/djc3.jpg"alt="Performance" height="100px" width="350px" ></a>
            </div>

            <img class="dandelionAboutBtn" src="pages/dandelionJazzClub/images/about.png" width="150px">
                <div id="dandelionAboutHead"></div>

                <div id="dandelionAbout"></div>
                

            <img class="dandelionCalendarBtn" src="pages/dandelionJazzClub/images/events.png" width="150px">
                <div id="dandelionCalendarHead"></div>
                <div id="dandelionCalendar">
                ${eventCards}
                </div>

            
            <img class="dandelionContactBtn" src="pages/dandelionJazzClub/images/contact.png" width="150px">
            <div id="dandelionContactHead"></div>
            <div id="dandelionContact">
                <p>Namn: Bossman
                    Tele:213
                    Email: kfjlsnd
                </p>
            </div>

        </div>
      `;
    } catch (error) {
        console.error("Error fetching data:", error);
        return "Error fetching data from the database";
    }
}
