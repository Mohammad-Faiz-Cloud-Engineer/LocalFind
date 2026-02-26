#!/bin/bash

# PWA Icon Generator Script
# Generates all required PWA icons from mainlogo.svg
# Requires: ImageMagick (install with: sudo apt install imagemagick)

echo "🎨 Generating PWA icons from mainlogo.svg..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed"
    echo "Install it with: sudo apt install imagemagick"
    exit 1
fi

# Check if source file exists
if [ ! -f "assets/images/mainlogo.svg" ]; then
    echo "❌ Error: assets/images/mainlogo.svg not found"
    exit 1
fi

# Create icons directory if it doesn't exist
mkdir -p assets/images

# Icon sizes for PWA
sizes=(72 96 128 144 152 192 384 512)

# Generate PNG icons
for size in "${sizes[@]}"; do
    echo "Generating ${size}x${size} icon..."
    convert -background none -resize ${size}x${size} assets/images/mainlogo.svg assets/images/icon-${size}x${size}.png
done

# Generate favicon.ico (16x16, 32x32, 48x48)
echo "Generating favicon.ico..."
convert -background none -resize 16x16 assets/images/mainlogo.svg assets/images/favicon-16.png
convert -background none -resize 32x32 assets/images/mainlogo.svg assets/images/favicon-32.png
convert -background none -resize 48x48 assets/images/mainlogo.svg assets/images/favicon-48.png
convert assets/images/favicon-16.png assets/images/favicon-32.png assets/images/favicon-48.png assets/images/favicon.ico

# Clean up temporary files
rm assets/images/favicon-16.png assets/images/favicon-32.png assets/images/favicon-48.png

echo "✅ All PWA icons generated successfully!"
echo ""
echo "Generated files:"
for size in "${sizes[@]}"; do
    echo "  ✓ icon-${size}x${size}.png"
done
echo "  ✓ favicon.ico"
echo ""
echo "📱 Your PWA is ready to install!"
