// Funktion för att rendera formulär för att skapa event
export default function createEventForm() {
  return `
  <section class='wrap'>
    <div class="create-event-form">
      <!-- Skapa event-formulär -->
      <form id="createEventForm" onsubmit="submitCreateEventForm(); return false">
        <h1 class='create-event-title'>Create Event</h1>
        <p class='create__instructions'>
        Note: If any issues arise during the process, error messages will be displayed to assist in correcting any errors.
        Feel free to contact support if you encounter any problems.
        </p>
        <!-- Namn för event -->
        <label class='create-label' for="eventName">Event Name:</label>
        <input type="text" id="eventName" name="eventName" required />

        <!-- Datum och tid för event -->
        <label class='create-label' for="dateTime">Date and Time:</label>
        <input type="datetime-local" id="dateTime" name="dateTime" required />

        <!-- Beskrivning av event -->
        <label class='create-label' for="eventDescription">Event Description:</label>
        <textarea
          id="eventDescription"
          name="eventDescription"
          rows="4"
          required
        ></textarea>

        <!-- Antal biljetter tillgängliga -->
        <label class='create-label' for="ticketCount">Number of Tickets:</label>
        <input type="number" id="ticketCount" name="ticketCount" required />

        <!-- Pris för eventet -->
        <label class='create-label' for="eventPrice">Event Price:</label>
        <input type="number" id="eventPrice" name="eventPrice" required />

        <!-- Bild för eventet -->
        <label class='create-label' for="eventImage">Event Image:</label>
        <input type="file" id="eventImage" name="eventImage" accept="image/*" />

        <!-- Knapp för att skapa event -->
        <input type="submit" id="createEventButton" value="Create Event" />
      </form>
    </div>
  </section>
  `;
}

// Funktion för att hantera skapande av event
async function submitCreateEventForm() {
  console.log("createEvent function triggered");

  // Hämta indata från formuläret
  const data = {
    name: $("#eventName").val(),
    dateTime: $("#dateTime").val(),
    desc: $("#eventDescription").val(),
    tickets: $("#ticketCount").val(),
    price: $("#eventPrice").val(),
    media: $("#eventImage")[0].files[0], // Bild för eventet
  };

  try {
    // Skicka event-uppgifter till servern för att skapa event
    const result = await fetch("api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("result", result);

    // Visa en bekräftelse när eventet skapas framgångsrikt
    if (result.status === 201) {
      alert("Event created successfully");

      // Återställ formuläret efter att eventet har skapats
      $("#eventName").val("");
      $("#dateTime").val("");
      $("#eventDescription").val("");
      $("#ticketCount").val("");
      $("#eventPrice").val("");
      $("#eventImage").val("");
      console.log("Event created successfully");
    } else {
      // Visa felmeddelande om det uppstår problem med att skapa eventet
      console.error("Failed to create Event");
    }
  } catch (error) {
    // Hantera eventuella fel vid skapande av event
    console.error("Error creating Event:", error);
  }
}

// Gör funktionen submitCreateEventForm tillgänglig globalt i webbläsaren
window.submitCreateEventForm = submitCreateEventForm;
