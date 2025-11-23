# Favicon Setup Instructions

## Download Favicon Files

Please download the collision emoji favicon from:
**https://favicon.io/emoji-favicons/collision**

## Files to Download

After clicking the download button on favicon.io, you'll get a zip file containing these files:

1. `android-chrome-192x192.png`
2. `android-chrome-512x512.png` (This is the biggest one you requested)
3. `apple-touch-icon.png`
4. `favicon-16x16.png`
5. `favicon-32x32.png`
6. `favicon.ico`
7. `site.webmanifest` (already created, but you can replace it if needed)

## Installation Steps

1. Extract the downloaded zip file
2. Copy all the image files (`.png` and `.ico`) to this directory:
   ```
   src/main/resources/static/favicon/
   ```
3. The `site.webmanifest` file is already created, but you can replace it with the one from the download if you prefer

## File Structure

After installation, your `src/main/resources/static/favicon/` directory should contain:
- android-chrome-192x192.png
- android-chrome-512x512.png
- apple-touch-icon.png
- favicon-16x16.png
- favicon-32x32.png
- favicon.ico
- site.webmanifest

## Verification

After placing the files, restart your Spring Boot application and check:
- Browser tab should show the collision emoji favicon
- Mobile devices will use the appropriate icon sizes


