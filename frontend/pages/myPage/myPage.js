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

export default async function myPage() {
  try {
    const response = await fetch("http://localhost:3000/api/tickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const tickets = await response.json();

    if (!response.ok) {
      console.error("Error fetching events:", response.statusText);
      return "Error fetching data from the database";
    }
    const userTickets = tickets
      .map((tickets) => {
        return ` 
      <div class="ticketInfo-container">
        <p class='ticketInfo-dateTime'>${formatDateTime(
          tickets.eventId.dateTime
        )}</p>
        <h3 class='ticketInfo-title'>${tickets.eventId.name}</h3>
      </div>
    
    `;
      })
      .join("");
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
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}

export async function logOut() {
  try {
    console.log("looggga ut");
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return;
    }
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "";
  } catch (error) {
    console.log(error);
  }
}

window.logOut = logOut;