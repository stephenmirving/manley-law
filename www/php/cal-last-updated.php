<?php
$data =
  file_get_contents(
    'https://calendar.google.com/calendar/ical/manleyandhalverstadt%40gmail.com/public/basic.ics'
  );

// Find the LAST-MODIFIED string
preg_match('/LAST-MODIFIED:(\d{8}T\d{6}Z)/', $data, $matches);
$lastModified = $matches[1];

// Convert the format from '20231217T232621Z' to a DateTime object
$dateTime = DateTime::createFromFormat('Ymd\THis\Z', $lastModified);

// Set the timezone to Eastern Standard Time
$dateTime->setTimezone(new DateTimeZone('America/New_York'));

// Format the datetime to a human-readable form
$humanReadable = $dateTime->format('F j, Y g:i A'); // Example: 'December 17, 2023 6:26 PM'

echo $humanReadable;
?>
