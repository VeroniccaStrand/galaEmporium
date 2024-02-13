export default function createEventForm() {
  return `
  <section class='wrap'>
    <div class="create-event-form">
      <form id="createEventForm" onsubmit="submitCreateEventForm(); return false">
        <h1>Create Event</h1>
        <p class='create__instructions'>
        Notera: Om det uppstår några problem under processen, 
        kommer felmeddelanden att visas för att hjälpa dig korrigera 
        eventuella fel. Tveka inte att kontakta support om du stöter på några problem.
        </p>
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

        <input type="submit" id="createEventButton" value="Create Event" />
      </form>
    </div>
  </section>
  `;
}

async function submitCreateEventForm() {
  console.log("createEvent function triggered");

  const data = {
    name: $('#eventName').val(),
    dateTime: $('#dateTime').val(),
    desc: $('#eventDescription').val(),
    tickets: $('#ticketCount').val(),
    price: $('#eventPrice').val(),
    media: $('#eventImage')[0].files[0],
  };

  

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
      
      console.log("Event created successfully");
    } else {
   
      console.error("Failed to create Event");
    }
  } catch (error) {
    console.error("Error creating Event:", error);
  }
}

window.submitCreateEventForm = submitCreateEventForm;
