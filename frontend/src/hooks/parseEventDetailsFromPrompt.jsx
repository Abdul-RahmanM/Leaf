function parseEventDetailsFromPrompt(response) {
  // Split the response string by '\n' to get individual lines
  const lines = response.split('\n');

  // Initialize an object to store event details
  const eventDetails = {};

  // Iterate over each line and extract details
  lines.forEach(line => {
    // Split each line by ': ' to separate key and value
    const [key, value] = line.split(': ');

    // Add key-value pairs to eventDetails object
    eventDetails[key] = value;
  });

  return eventDetails;
}

export default parseEventDetailsFromPrompt;