

  // Funktion för att formatera datum och tid till lokal tidszon
  function formatDateTime(dateTimeString) {
    // Alternativ för datum- och tidsformat
    const options = {
      day: "numeric", // Visa dag i numerisk form
      month: "short", // Visa månad i förkortad form (t.ex. jan, feb)
      hour: "numeric", // Visa timme i numerisk form
      minute: "numeric", // Visa minut i numerisk form
      hour12: false, // Använd 24-timmarsformat (true för AM/PM-format)
      timeZone: "UTC", // Ange tidszon (här: UTC)
    };
    // Skapa en ny Date-objekt från dateTimeString och formatera datum/tid till lokal tidszon
    const formattedDate = new Date(dateTimeString).toLocaleDateString(
      "sv-SE", // Använd språkkoden för svenska
      options // Använd de angivna alternativen för datum och tid
    );
    // Returnera det formaterade datumet
    return formattedDate;
  }
  const userName = localStorage.getItem("userName");
  const loggedInUserSpan = userName ? `<span id="loggedInUser">${userName}!</span>` : '';
  console.log(userName)
  // Funktion för att hämta events och rendera dem på startsidan
  export default async function home() {
    try {
      
      // Hämta events från servern
      const response = await fetch(`http://localhost:3000/api/events/`);

      // Konvertera svaret till JSON-format
      const events = await response.json();

      // Kontrollera om förfrågan var framgångsrik
      if (!response.ok) {
        console.error("Error fetching events:", response.statusText);
        // Returnera ett felmeddelande om data inte kunde hämtas från databasen
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

      // Returnera HTML-kod för startsidan med events och länkar till klubbsidor
      return `
          <div id="mainHome">
          ${loggedInUserSpan}
            <h1 id="title">Gala Emporium</h1>
            
            <!-- Buttons for individual club pages -->
            <div id="circles"> 
              <a href="#nomads"><img src="images/nnlogo.png" alt="Nomads logo" height="150px" width="150px"></a>
              <a href="#comedyClub"><img src="images/cclogo.png" alt="Comedy club logo" height="150px" width="150px"></a>
              <a href="#whiskey"><img src="images/wtlogo.png" alt="Whisky Tasting logo" height="150px" width="150px"></a>
              <a href="#massiveMashup"><img src="images/mmlogo.png" alt="Mashup logo" height="150px" width="150px"></a>
              <a href="#dandelion"><img src="images/djclogo2.png" alt="Dandelion" height="150px" width="150px"></a>
              </div>
              
              <div id="calendar">
                ${eventCards}
              </div>
              
            </div>
            `;
    } catch (error) {
      // Hantera eventuella fel vid hämtning av data från servern
      console.error("Error fetching data:", error);
      // Returnera ett felmeddelande om data inte kunde hämtas från databasen
      return "Error fetching data from the database";
    }
  }
