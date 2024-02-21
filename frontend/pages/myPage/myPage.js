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

// Funktion för att hämta användarens sidoinnehåll
export default async function myPage() {
  try {
    // Hämta användarens biljetter från servern
    const response = await fetch("http://localhost:3000/api/tickets", {
      method: "GET", // Använd GET-metoden för att hämta data
      headers: {
        "Content-Type": "application/json", // Ange typen av data som skickas i förfrågan
      },
    });

    // Konvertera  svaret till JSON-format
    const tickets = await response.json();
    
      // Kontrollera om förfrågan var framgångsrik
      if (response.status !== 200) {
        // Visa en alert för att informera användaren om att det uppstod ett fel
        alert(`You have to log in to see your tickets: ${response.statusText}`);
        
       return;
      }

    // Skapa HTML-kod för varje biljett och lägg till i userTickets
    const userTickets = tickets
      .map((ticket) => {
        return ` 
      <div class="ticketInfo-container">
        <p class='ticketInfo-dateTime'>${formatDateTime(
          ticket.eventId.dateTime
        )}</p>
        <h3 class='ticketInfo-title'>${ticket.eventId.name}</h3>
      </div>
    `;
      })
      .join("");

    // Returnera HTML-kod för användarens sida med listan över biljetter
    return `
    <div class='myPage-container'>
      <div class='myPage'>
        <h3>Awesome events coming your way</h3>
        <p>Your tickets:</p>
        <div class="ticket-wrap">${userTickets} </div>
        <button class='logOut-btn' onclick="logOut()">Log Out</button>
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

// Funktion för att logga ut användaren från systemet
export async function logOut() {
  try {
    console.log("looggga ut");
    // Skicka en POST-förfrågan till servern för att logga ut användaren
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST", // Använd POST-metoden för att logga ut
      headers: {
        "Content-Type": "application/json", // Ange typen av data som skickas i förfrågan
      },
    });

    // Kontrollera om utloggningen var framgångsrik
    if (!response.ok) {
      return;
    }

    // Ta bort autentiseringscookie från webbläsaren
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Ladda om sidan för att uppdatera användarens inloggningsstatus
    window.location.href = "";
  } catch (error) {
    // Hantera eventuella fel som uppstår vid utloggningen
    console.log(error);
  }
}

// Gör logOut-funktionen tillgänglig globalt i webbläsaren
window.logOut = logOut;
