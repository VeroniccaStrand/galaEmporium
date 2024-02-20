export default async function buyTicket(eventId) {
  const data = {
    eventId: eventId,
  };

  console.log(data);
  try {
    const result = await fetch("api/Tickets", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    });
    console.log(data)
    alert("Purchase successful");

    location.reload()
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
