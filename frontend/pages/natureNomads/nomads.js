function formatDateTime(dateTimeString) {
  const options = {
    day: "numeric",
    month: "long",
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

export default async function nomads() {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const events = await response.json();

    const eventCards = events
      .map((event, index) => {
        const cardClass = index % 2 === 0 ? "even" : "odd";

        return `
        <div class="event-card ${cardClass}">
          <div class="event-info">
            <h3>${event.name}</h3>
            <p>${event.desc}</p>
            <p>${formatDateTime(event.dateTime)}</p>
            <div class="buy-wrap">
              <span class="price">Price: ${event.price}</span>
              <span class="tickets">Tickets left: ${event.tickets}</span>
              <button>Buy Ticket</button>
            </div>
          </div>
          <div class="event-image">
            <img src="https://source.unsplash.com/300x300/?hiking" alt="${
              event.name
            } Image">
          </div>
        </div>
        `;
      })
      .join("");

    console.log(events);
    return `
      <header class="header">
        <nav class="sticky-nav">
          <div class="logo">
            <span class="logo">N<span class="in__line">.</span>n</span>
          </div>
          <div class="nav__items">
            <a href="#">Nature Nomads</a>
            <a href="#">About us</a>
            <a href="#">Events</a>
            <a href="#">Contact us</a>
          </div>
        </nav>
        <div class="hero">
          <p class="hero__intro">
            .Where the path less traveled is our preferred route
          </p>
          <p class="hero__text">
            Join <a class="in__line" href="">nature Nomads </a> Club – where the
            call of the wild becomes the rhythm of our hearts, and every adventure
            is a step towards a richer, more fulfilling life. Your next great
            outdoor escape awaits!
          </p>
        </div>
      </header>
      <div class="event-container">
        ${eventCards}
      </div>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
