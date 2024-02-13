export default function createEventForm() {
  return `
    <div class="create-event-form">
      <form id="createEventForm" onsubmit="createEvent(); return false">
        <h1>Create Event</h1>
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" name="eventName" required />

        <label for="dateTime">Date and Time:</label>
        <input type="datetime-local" id="dateTime" name="dateTime" required />

        <label for="eventDescription">Event Description:</label>
        <textarea
          id="eventDescription"
          name="eventDescription"
          rows="4"
          required
        ></textarea>

        <label for="ticketCount">Number of Tickets:</label>
        <input type="number" id="ticketCount" name="ticketCount" required />

        <label for="eventPrice">Event Price:</label>
        <input type="number" id="eventPrice" name="eventPrice" required />

        <label for="eventImage">Event Image:</label>
        <input type="file" id="eventImage" name="eventImage" accept="image/*" />

        <input type="submit" value="Create Event" />
      </form>
    </div>
  `;
}
async function submitCreateEventForm() {
  console.log("Creating Event");

  const data = {
    name: $('#createEventForm [name="eventName"]').val(),
    dateTime: $('#createEventForm [name="dateTime"]').val(),
    desc: $('#createEventForm [name="eventDescription"]').val(),
    tickets: $('#createEventForm [name="ticketCount"]').val(),
    price: $('#createEventForm [name="eventPrice"]').val(),
    media: $('#createEventForm [name="eventImage"]')[0].files[0],
  };

  console.log(data);

  try {
    const result = await fetch("api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("result", result);

    if (result.status === 201) {
      // Event created successfully, handle as needed
      console.log("Event created successfully");
    } else {
      // Handle other status codes or errors
      console.error("Failed to create Event");
    }
  } catch (error) {
    console.error("Error creating Event:", error);
  }
}