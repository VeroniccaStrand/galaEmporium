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

export default async function nomads(clubId = "65ca94bb9f5eb98aed7ed0f6") {
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
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    console.log(events);
    return `
      <div id="wrap">
        <header class="header">
        <nav class="nav">
          <div class="logo">
            <span class="logo">N<span class="in__line">.</span>n</span>
          </div>
          <div class="nav__items">
            <a href="#nomads">Nature Nomads</a>
            <a href="#">About us</a>
            <a href="#create">Create Event</a>
            <a href="#">Contact us</a>
          </div>
        </nav>
        <div class="hero">
          <p class="hero__intro">
            .Where the path less traveled is our preferred route
          </p>
          <p class="hero__text">
          Step into the  <a class="in__line" href="">nature Nomads </a> 
          Club, where we hang out, 
            hike, and geek out over all things outdoorsy. 
            
          </p>
        </div>
      </header>
        <h2 class='calender-title'> Upcoming events </h2>
        <div class="event-container">
          ${eventCards}
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
