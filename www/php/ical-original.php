// // Find the DTSTAMP string
// preg_match('/DTSTAMP:(\d{8}T\d{6}Z)/', $data, $matches);
// $lastModified = $matches[1];

// // Convert the format from '20231218T072944Z' to a DateTime object
// $dateTime = DateTime::createFromFormat('Ymd\THis\Z', $lastModified);

// // Set the timezone to Eastern Standard Time
// $dateTime->setTimezone(new DateTimeZone('America/New_York'));

// // Format the datetime to a human-readable form
// $humanReadable = $dateTime->format('F j, Y g:i A'); // Example: 'December 18, 2023 2:29 AM'
// echo "Last Updated:  $humanReadable";
//?>
