// Importera buyTicket-funktionen från booking.js-modulen
import buyTicket from "../booking/booking.js";

// Funktion för att formatera datum och tid till lokal tidszon
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

// Funktionen massiveMashup som hämtar events från servern och renderar dem på sidan
export default async function massiveMashup(
  clubId = "65cc999ad4839936bd4d4a5c"
) {
  try {
    // Hämta events från servern
    const response = await fetch(
      `http://localhost:3000/api/events/club/${clubId}`,
      {
        method: "GET", // Ändra metoden till GET eftersom du hämtar data
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Konvertera svaret till JSON-format
    const events = await response.json();

    // Kontrollera om förfrågan var framgångsrik
    if (!response.ok) {
      console.error("Error fetching events:", response.statusText);
      // Hantera felet efter behov
      return "Error fetching data from the database";
    }

    // Sortera events baserat på datum och tid
    events.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    // Skapa HTML-kod för varje event och lägg till i eventCards
    const eventCards = events
      .map((event, index) => {
        const cardClass = index % 2 === 0 ? "even" : "odd";

        return `
          <div class="event-card ${cardClass}">
            <div class="massive-event-info">
              <p class='massive-date-time'>${formatDateTime(event.dateTime)}</p>
              <div class='event-text-wrap'>
                <h3 class='massive-event-title'>${event.name}</h3>
                <p class='massive-event-desc'>${event.desc}</p>
              </div>
              <div class="buy-wrap">
                <span class="massive-price">Price: ${event.price}kr</span>
                <span class="massive-tickets">Tickets left: ${
                  event.tickets
                }</span>
                <button onclick="buyTicket('${
                  event._id
                }')" class='massive-buy-btn'>Book Ticket</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    // Returnera HTML-kod för att rendera events på sidan
    return `
      <div id="massive-wrapper">
        <header class="massive-header">
          <nav class="massive-nav">
            <div class="massive-logo">
              <span>Massive Mashup Club</span>
            </div>
            <div class="massive-nav__items">
              <a href="#mmc">HOME</a>
              <a href="#massive-about-us">ABOUT US</a>
              <a href="#create">CREATE EVENT</a>
            </div>
          </nav>
          <div class="massive-intro">
            <p class="pitch__intro-left">
              We experiment with sounds nobody has thought of!
            </p>
            <p class="pitch__intro-right">
              Slipknot and Spice girls 
              combined? Why not! 
            </p>
            <p class="pitch__text">
              Need a place where you can have an outlet for your chaotic mind? 
              Look no further, once you're here, you wanna stay. Welcome!
            </p>
          </div>
        </header>
        <h2 class='massive-calender-title'> Upcoming events </h2>
        <div class="massive-event-container">
          ${eventCards}
        </div>
        <div id="massive-about-us">
          <h2 class="massive-aboutus">About us</h2>
          <p>Since 2002 Massive Mashup Club has been here to please 
            peoples want and urge for something chaotic. A place were 
            you can let go of all your problems for a couple of hours.
            With great music, drinks and foods that will make you become
            a regular after just one visit.
          </p>
        </div>
      </div>
    `;
  } catch (error) {
    // Hantera eventuella fel vid hämtning av data
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}

// Gör buyTicket-funktionen tillgänglig globalt i webbläsaren
window.buyTicket = buyTicket;
