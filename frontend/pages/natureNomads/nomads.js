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
          <p>${formatDateTime(event.dateTime)}</p>
          <div class='event-text-wrap'>
            <h3>${event.name}</h3>
            <p>${event.desc}</p>
           </div>
            <div class="buy-wrap">
              <span class="price">Price: ${event.price}</span>
              <span class="tickets">Tickets left: ${event.tickets}</span>
              <button>Buy Ticket</button>
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
            <a href="#">Events</a>
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
