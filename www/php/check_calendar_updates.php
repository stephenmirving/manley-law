<?php
require_once __DIR__ . '/../vendor/autoload.php';

function getClient() {
  $client = new Google_Client();
  $client->setApplicationName('Google Calendar API PHP');
  $client->setScopes(Google_Service_Calendar::CALENDAR_READONLY);
  $client->setAuthConfig(__DIR__ . '/oauth_client_credentials.json');
  $client->setRedirectUri('http://localhost/manley-law/www/oauth_callback.php');
  $client->setAccessType('offline');
  $client->setPrompt('select_account consent');

  // Load previously authorized token from a file.
  $tokenPath = __DIR__ . '/token.json';
  if (file_exists($tokenPath)) {
      $accessToken = json_decode(file_get_contents($tokenPath), true);
      $client->setAccessToken($accessToken);
  }

  // Refresh the token if it's expired.
  if ($client->isAccessTokenExpired()) {
      if ($client->getRefreshToken()) {
          $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
      } else {
          // Request authorization from the user.
          $authUrl = $client->createAuthUrl();
          printf("Open the following link in your browser:\n%s\n", $authUrl);
          print 'Enter verification code: ';
          $authCode = trim(fgets(STDIN));

          // Exchange authorization code for an access token.
          $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
          $client->setAccessToken($accessToken);

          // Check to see if there was an error.
          if (array_key_exists('error', $accessToken)) {
              throw new Exception(join(', ', $accessToken));
          }
      }
      // Save the token to a file.
      if (!file_exists(dirname($tokenPath))) {
          mkdir(dirname($tokenPath), 0700, true);
      }
      file_put_contents($tokenPath, json_encode($client->getAccessToken()));
  }
  return $client;
}

$client = getClient();
$service = new Google_Service_Calendar($client);

$calendarId = 'manleyandhalverstadt%40gmail.com'; // Replace with your calendar ID
$optParams = [
    'maxResults' => 10,
    'orderBy' => 'updated',
    'singleEvents' => true,
];
$results = $service->events->listEvents($calendarId, $optParams);

// Check if we got any events back
if (count($results->getItems()) == 0) {
    print "No upcoming events found.\n";
} else {
    $lastModifiedEvent = $results->getItems()[0];
    $lastModifiedTime = $lastModifiedEvent->getUpdated();

    $storageFile = 'last_modified.txt'; // File where the last modified time is stored

    if (file_exists($storageFile)) {
        $storedTime = file_get_contents($storageFile);
        if ($lastModifiedTime > $storedTime) {
            file_put_contents($storageFile, $lastModifiedTime);
            echo "Updated last modified time.\n";
        } else {
            echo "No new updates.\n";
        }
    } else {
        file_put_contents($storageFile, $lastModifiedTime);
        echo "Stored last modified time.\n";
    }
}
?>
