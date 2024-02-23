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

export default async function comedyClub(clubId = "65cf58a9b0b90da0c98c308e") {
  try {
    const response = await fetch(
      `http://localhost:3000/api/events/club/${clubId}`,
      {
        method: "GET", // Ändra metoden till GET eftersom du hämtar data
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
                <button onclick="buyTicket('${event._id
                }')" class='comedy-buy-btn'>Book Ticket</button>
      
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    console.log(events);
    return ` 
      <div class="comedy_wrap">
        <header class="comedy_header">
        <nav class="comedy_nav">
          <div class="comedy_nav__items">
            <a href="#comedyClub">The Comedy Club</a>
            <a href="#comedy_about_us">About us</a>
            <a href="#create">Create Event</a>
            <a href="#">Contact us</a>
          </div>
        </nav>
        <div class="comedy_hero">
          <p class="comedy_banner">
            The Comedy Club
          </p>
          <p class="comedy_slogan">
            Don't be so serious... it's only a joke
          </p>
          <p class="comedy_description">
            A place for laughter and good spirits. 
            The Comedy Club offers local stand-up comedians
            a place to entertain and the public a place to be entertained
            
          </p>
        </div>
      
      

      </header>
        <section id="comedy_about_us">
          <h1 class="about_us_title">About us</h1>
            <p class="about_us_story">
            Welcome to The Comedy Club - your laughter destination in the heart of the city!
            At The Comedy Club, we're dedicated to creating unforgettable moments through humor. Our intimate venue hosts a diverse lineup of comedians, promising a night of side-splitting humor that caters to all tastes.    
            Step into our warm and welcoming space, adorned with quirky decor for a night of pure hilarity. Whether you're a comedy enthusiast or a first-timer, The Comedy Club is the perfect place to unwind, share a few laughs, and make lasting memories. 
            Join us at The Comedy Club - where joy takes center stage, and the punchlines never stop!
            </p>
        </section>
        <h2 class='comedy_calender-title'> Upcoming events </h2>
        <div class="comedy_event-container">
          ${eventCards}
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
window.buyTicket = buyTicket;
