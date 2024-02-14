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

export default async function massiveMashup(clubId = '65cc999ad4839936bd4d4a5c') {
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
      <div id="massive-wrap">
        <header class="massive-header">
        <nav class="massive-nav">
          <div class="massive-logo">
            <span>Massive Mashup Club</span>
          </div>
          <div class="massive-nav__items">
            <a href="#mmc">home</a>
            <a href="#">About us</a>
            <a href="#create">Create Event</a>
            <a href="#">Contact us</a>
          </div>
        </nav>
        <div class="massive-intro">
          <p class="pitch__intro">
            We experiment with sounds nobody has thought of, Slipknot and Spice girls 
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
      </div>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
