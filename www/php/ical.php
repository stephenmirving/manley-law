<?php
// Get the ical data feed for the Google Calendar
$data = file_get_contents('https://calendar.google.com/calendar/ical/manleyandhalverstadt%40gmail.com/public/basic.ics');

echo $data;

?>
