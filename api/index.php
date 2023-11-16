<?php

// Function to extract title, image path, and name from HTML content
function extractInfo($htmlContent) {
  // Assuming the title is in the <title> tag
  $titleRegex = '/<title>(.*?)<\/title>/';
  preg_match($titleRegex, $htmlContent, $titleMatches);
  $title = $titleMatches[1] ?? 'Untitled';

  // Assuming the image path is in a script tag
  $scriptRegex = '/<script>[\s\S]*?var\s+imagePath\s*=\s*["\'](.*?)["\'];[\s\S]*?<\/script>/';
  preg_match($scriptRegex, $htmlContent, $imageMatches);
  $imagePath = $imageMatches[1] ?? 'image.jpg';

  // Assuming the git name is in a script tag
  $nameRegex = '/<script>[\s\S]*?var\s+gitName\s*=\s*["\'](.*?)["\'];[\s\S]*?<\/script>/';
  preg_match($nameRegex, $htmlContent, $nameMatches);
  $name = $nameMatches[1] ?? 'itsrealkaran';

  return [
    'title' => $title,
    'imagePath' => $imagePath,
    'name' => $name,
  ];
}

// Function to create a JavaScript-readable array
function createArray($directory) {
  $htmlFiles = glob($directory . '/*.html');
  $array = [];

  foreach ($htmlFiles as $file) {
    $htmlContent = file_get_contents($file);
    $info = extractInfo($htmlContent);
    $fileName = basename($file);

    // Create an array entry with title, link, image path, and name
    $array[] = [
      'title' => $info['title'],
      'link' => './projects/' . $fileName,
      'imagePath' => $info['imagePath'],
      'name' => $info['name'],
    ];
  }

  return $array;
}

// Specify the path to the "projects" folder
$projectsFolderPath = '../projects';

// Generate the array
$array = createArray($projectsFolderPath);

// Set the content type to JSON
header('Content-Type: application/json');

// Output as JSON
echo json_encode($array);

