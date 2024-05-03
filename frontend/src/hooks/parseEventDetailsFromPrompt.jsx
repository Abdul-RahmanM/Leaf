function parseEventDetailsFromPrompt(response) {
  // Split the response string by '\n' to get individual lines
  const lines = response.split('\n');

  // Initialize an object to store event details
  const eventDetails = {};

  // Iterate over each line and extract details
  lines.forEach(line => {
    // Split each line by ': ' to separate key and value
    const [key, ...valueParts] = line.split(': ');

    // Join the remaining parts to handle values with ': ' in them
    const value = valueParts.join(': ');

    // Add key-value pairs to eventDetails object
    eventDetails[key] = value;
  });

  // Combine Date and Time into one property
  const dateTimeString = `${eventDetails['Date']} ${eventDetails['Time']}`;

  // Convert Date and Time to a JavaScript Date object
  eventDetails['DateTime'] = new Date(dateTimeString);

  // Remove the individual Date and Time properties
  delete eventDetails['Date'];
  delete eventDetails['Time'];

  return eventDetails;
}

export default parseEventDetailsFromPrompt;