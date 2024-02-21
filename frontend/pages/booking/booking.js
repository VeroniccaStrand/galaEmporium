// Funktion för att köpa biljett till ett event
export default async function buyTicket(eventId) {
  // Skapa objekt med event-id
  const data = {
    eventId: eventId,
  };

  console.log(data);
  try {
    // Skicka förfrågan för att köpa biljett till servern
    const result = await fetch("api/Tickets", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);

    // Visa meddelande om att köpet lyckades
    alert("Purchase successful");

    // Ladda om sidan efter att köpet är genomfört för att uppdatera biljettinformationen
    location.reload();
  } catch (error) {
    // Hantera eventuella fel vid köp av biljett
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
