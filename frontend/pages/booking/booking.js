export default async function buyTicket(eventId) {
  const data = {
    eventId: eventId,
  };

  console.log(data);
  try {
    const result = await fetch("api/Tickets", {
      method: "post",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify(data),
    });
    alert("Purchase successful");

    if (result.status == 200) {
      location.href = "";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data from the database";
  }
}
