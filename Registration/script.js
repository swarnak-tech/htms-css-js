// STEP 2: Access DOM Objects (Create references to DOM elements)
const eventList = document.getElementById("eventList");
const eventTitle = document.getElementById("eventTitle");
const eventDesc = document.getElementById("eventDesc");
const countSpan = document.getElementById("count");
const registerBtn = document.getElementById("registerBtn");
const unregisterBtn = document.getElementById("unregisterBtn");
const addEventBtn = document.getElementById("addEventBtn");

// STEP 3: Event Data (JavaScript Object)
let events = [
  { title: "Yoga Camp", desc: "Morning yoga session", participants: 10 },
  { title: "Music Night", desc: "Live music performance", participants: 25 },
  { title: "Cleanliness Drive", desc: "Community cleaning activity", participants: 15 }
];

let selectedEventIndex = null;

// STEP 4: Display Events Dynamically (Add Elements)
function displayEvents() {
  eventList.innerHTML = "";

  events.forEach((event, index) => {
    const li = document.createElement("li");
    li.textContent = event.title;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => selectEvent(index));
    eventList.appendChild(li);
  });
}

// STEP 5: Handle Event Selection (Modify Content)
function selectEvent(index) {
  selectedEventIndex = index;

  eventTitle.textContent = events[index].title;
  eventDesc.textContent = events[index].desc;
  countSpan.textContent = events[index].participants;
}

// STEP 6: Register for Event (Modify DOM Content)
registerBtn.addEventListener("click", () => {
  if (selectedEventIndex === null) {
    alert("Please select an event first");
    return;
  }

  events[selectedEventIndex].participants++;
  countSpan.textContent = events[selectedEventIndex].participants;
});

// STEP 7: Unregister from Event (Remove / Modify)
unregisterBtn.addEventListener("click", () => {
  if (selectedEventIndex === null) {
    alert("Please select an event first");
    return;
  }

  if (events[selectedEventIndex].participants > 0) {
    events[selectedEventIndex].participants--;
    countSpan.textContent = events[selectedEventIndex].participants;
  }
});

// STEP 8: Add New Event Dynamically (Create + Append)
addEventBtn.addEventListener("click", () => {
  const title = prompt("Enter event title:");
  const desc = prompt("Enter event description:");

  // STEP 9: Prevent Errors (Client-Side Validation)
  if (!title || !desc) {
    alert("Event title and description are required");
    return;
  }

  events.push({
    title: title,
    desc: desc,
    participants: 0
  });

  displayEvents();
});

// Initial load
displayEvents();
