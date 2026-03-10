#!/bin/bash

# LocalFind AI Installation Script
# Created by Mohammad Faiz (Rasauli)

echo "🤖 LocalFind AI Installation"
echo "=============================="
echo ""

# Check if directories exist
if [ ! -d "js/ai" ]; then
    echo "✅ Creating js/ai directory..."
    mkdir -p js/ai
fi

if [ ! -d "css/ai" ]; then
    echo "✅ Creating css/ai directory..."
    mkdir -p css/ai
fi

# Check if files exist
echo ""
echo "📦 Checking AI files..."
echo ""

files=(
    "js/ai/ai-config.js"
    "js/ai/ai-security.js"
    "js/ai/ai-cache.js"
    "js/ai/ai-analytics.js"
    "js/ai/ai-chatbot.js"
    "js/ai/ai-search.js"
    "js/ai/ai-ui.js"
    "js/ai/ai-init.js"
    "css/ai/ai-chatbot.css"
)

all_exist=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_exist=false
    fi
done

echo ""

if [ "$all_exist" = true ]; then
    echo "✅ All AI files are present!"
    echo ""
    echo "🎉 Installation Complete!"
    echo ""
    echo "Next steps:"
    echo "1. Open index.html in your browser"
    echo "2. Click the AI button (bottom-right)"
    echo "3. Try asking: 'Who created you?'"
    echo ""
    echo "Configuration:"
    echo "- Edit js/ai/ai-config.js to customize"
    echo "- Set AI_CONFIG.enabled = false to disable"
    echo ""
    echo "Documentation:"
    echo "- Read AI_IMPLEMENTATION_COMPLETE.md"
    echo "- Read AI_INTEGRATION_STRATEGY.md"
    echo ""
    echo "Created by Mohammad Faiz (Rasauli)"
else
    echo "❌ Some files are missing!"
    echo ""
    echo "Please ensure all AI files are created."
    echo "Check AI_IMPLEMENTATION_COMPLETE.md for details."
fi

echo ""
