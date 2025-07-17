import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateFullHtmlDocument(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Craft Page</title>
  <style>
    /* You can include base styles if needed */
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
`.trim();
}


export function downloadHtmlFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
