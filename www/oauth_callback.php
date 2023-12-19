<?php
require_once __DIR__ . '/../vendor/autoload.php';

// Initialize the Google Client
$client = new Google_Client();
$client->setAuthConfig(__DIR__ . '/oauth_client_credentials.json');
$client->setRedirectUri('http://localhost/manley-law/www/oauth_callback.php');
$client->setScopes(Google_Service_Calendar::CALENDAR_READONLY);

// Handle the OAuth response
if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);

    // Save the token to a file
    if (!file_exists(dirname(__DIR__ . '/token.json'))) {
        mkdir(dirname(__DIR__ . '/token.json'), 0700, true);
    }
    file_put_contents(__DIR__ . '/token.json', json_encode($client->getAccessToken()));

    echo "Authorization complete. You can close this tab.";
} else {
    echo "Authorization failed.";
}
?>
