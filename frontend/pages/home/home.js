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

export default async function home() {
  try {
    const response = await fetch(`http://localhost:3000/api/events/`);

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
    <div class="event-card ${cardClass}">
        <div class="allEvents-event-info">
          <p class='allEvents-date-time'>${formatDateTime(event.dateTime)}</p>  
        <div class='event-text-wrap'>
          <h3 class='allEvents-event-title'>${event.name}</h3>
          <p class='allEvents-event-title'>${event.clubId.name}</p>
            <p class='allEvents-event-desc'>${event.desc}</p>
        </div>
        <div class="buy-wrap">
          <span class="allEvents-price">Price: ${event.price}kr</span>
          <br/>
          <span class="allEvents-tickets">Tickets left: ${event.tickets}</span>
        </div>
      </div>
    </div>
    `;
      })
      .join("");
    return `
         <div id="mainHome">
           
           <h1 id="title">Gala Emporium</h1>
           
           <!--Buttons for individual club pages -->
           <div id="circles"> 
             <a href="#nomads"><img src="images/nnlogo.png" alt="Nomads logo" height="150px" width="150px"></a>
             <a href="#comedyClub"><img src="images/cclogo.png" alt="Comedy club logo" height="150px" width="150px"></a>
             <a href="#whiskey"><img src="images/wtlogo.png" alt="Whisky Tasting logo" height="150px" width="150px"></a>
             <a href="#massiveMashup"><img src="images/mmlogo.png" alt="Mashup logo" height="150px" width="150px"></a>
             <a href="#dandelion"><img src="images/djclogo.png" alt="Dandelion" height="150px" width="150px"></a>
            </div>
            
            <div id="calendar">
              ${eventCards}
              
            </div>
            
          </div>
          
          `;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
