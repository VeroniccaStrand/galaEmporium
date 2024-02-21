import buyTicket from "../booking/booking.js";

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

export default async function dandelion(clubId = "65cc8a73e536d3509bd17b59") {
  try {
    const response = await fetch(
      `http://localhost:3000/api/events/club/${clubId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const events = await response.json();

    if (!response.ok) {
      console.error("Error fetching events:", response.statusText);
      return "Error fetching data from the database";
    }

    events.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    const eventCards = events
      .map((event, index) => {
        const cardClass = index % 2 === 0 ? "even" : "odd";

        return `
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Protest+Strike&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">

            <div class="event-card ${cardClass}">
              <div class="dandelionEventInfo">
                <p class="dateTime">${formatDateTime(event.dateTime)}</p>

                  <div id="dandelionEventTitle">${event.name}</div>
                  <p class="dandelionEventDesc">${event.desc}</p>

                    <span class="ticketInfo">
                        Price: ${event.price}kr
                        <br/>
                        Tickets left: ${event.tickets}
                        <br/>
                        <img onclick="buyTicket('${event._id}')" id="dandelionTicketBtn" src="pages/dandelionJazzClub/images/ticket.png" height="50px" width="139px"><
                    </span>

              </div>
            </div>
          `;
      })
      .join("");

    return `        
        <div id="dandelionWrapper">

            <div id="dandelionHeader">
                <img id="clubLogo" src="pages/dandelionJazzClub/images/djc.png" alt="Dandelion club logo" height="200px" width="750px"></a>
            </div>

            <div id="dandelionNav">
                <a href="#dandelionAboutHead"> <img src="pages/dandelionJazzClub/images/about.png" height="100px" width="181px"></a>
                <a href="#dandelionCalendarHead"> <img src="pages/dandelionJazzClub/images/events.png" height="100px" width="201px"></a>
                <a href="#dandelionContactHead"> <img src="pages/dandelionJazzClub/images/contact.png" height="100px" width="220px"></a>
            </div>


            <a href="#create" id="dandelionCreate"> <img src="pages/dandelionJazzClub/images/createevent.png" height="100px" width="403px"></a>


            <div id="photoCollection">
                <img class="dandelionPic" src="pages/dandelionJazzClub/images/djc1.jpeg" alt="Club" height="100px" width="350px" ></a>
                <img class="dandelionPic" src="pages/dandelionJazzClub/images/djc2.png" alt="Artwork" height="100px" width="350px" ></a>
                <img class="dandelionPic" src="pages/dandelionJazzClub/images/djc3.jpg"alt="Performance" height="100px" width="350px" ></a>
                <img class="dandelionPic" src="pages/dandelionJazzClub/images/djc4.jpeg"alt="The bar" height="100px" width="350px" ></a>

            </div>

            <img class="dandelionAboutBtn" src="pages/dandelionJazzClub/images/about.png" width="150px">
                <div id="dandelionAboutHead"></div>

                <div id="dandelionAbout">
                    <p>The Dandelion Jazz Club is a jazz club and restaurant located at 131 West 3rd Street in Greenwich Village, 
                        New York City. The club's performance schedule features shows every evening at 8:00 pm and 10:30 pm and a 
                        Sunday jazz brunch. The club has locations across the globe in New York, NY; Waikiki, Hawaii; Napa, CA; Tokyo, Japan; 
                        Rio de Janeiro and São Paulo, Brazil; Milan, Italy; Beijing and Shanghai, China. 
                        </p>

                </div>
                

            <img class="dandelionCalendarBtn" src="pages/dandelionJazzClub/images/events.png" width="150px">
                <div id="dandelionCalendarHead"></div>
                <div id="dandelionCalendar">
                ${eventCards}
                </div>

            
            <img class="dandelionContactBtn" src="pages/dandelionJazzClub/images/contact.png" width="150px">
            <div id="dandelionContactHead"></div>
            <div id="dandelionContact">
                <img id="clubLogo" src="pages/dandelionJazzClub/images/djc.png" alt="Dandelion club logo" height="60px" width="250px"></a>
            </div>

        </div>
      `;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
window.buyTicket = buyTicket;
