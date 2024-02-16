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

export default async function whiskey(clubId = "65cc850c06d63a19fc2aa1fd") {
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
              <p class='whiskey_date_time'>${formatDateTime(event.dateTime)}</p>
              <div class='event-text-wrap'>
                <h3 class='whiskey_event_title'>${event.name}</h3>
                <p class='whiskey_event_desc'>${event.desc}</p>
              </div>
              <div class="buy-wrap">
                <span class="price">Price: ${event.price}kr</span>
                <span class="tickets">Tickets left: ${event.tickets}</span>
                <button class='whiskey_buy_btn'>Buy Ticket</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
    return `
      <wrapper class="w_wrapper">
        <header class="whiskey_header">
          <nav class="whiskey_nav">
            <span class="whiskey_logo">McGavin's Whiskey Club</span>
            <div class="whiskey_nav_links">
              <a href="#whiskey"> McGavin's Whiskey Tasting</a>
              <a href="#about_us"> About us</a>
              <a href="#"> Events</a>
              <a href="#"> Contact us</a>
            </div>
          </nav>
          <div class="slogan">
            <h1 class="slogan_intro"> Created unforgetable taste sensations since 1789 </h1>
            <p class="slogan_text">
              Whiskey tasting does not need to be pretentious! We want our Whiskey
              and other alochol beverages to be availbale for everyone.
          </div>
      </header>
      <section id="about_us">
        <h1 class="about_us_intro">About us</h1>
        <p class="about_us_text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
          repellat eius, quos ab maxime fuga ratione quisquam, hic possimus
          dignissimos dolorum laudantium earum cum enim laboriosam culpa nam
          distinctio pariatur?
        </p>
      </section>
      <h2 class="whiskey_calender_title">Upcoming events</h2>
      <div class="whiskey_event_container">${eventCards}</div>
    </wrapper>
      `;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
