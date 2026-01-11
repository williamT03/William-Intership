#!/bin/bash

# Script to fix package-lock.json sync issues

echo "Fixing package-lock.json sync issues..."

# Remove the existing package-lock.json
echo "Removing outdated package-lock.json..."
rm -f package-lock.json

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Install dependencies and regenerate package-lock.json
echo "Installing dependencies and regenerating package-lock.json..."
npm install

echo "✅ package-lock.json has been regenerated successfully!"
echo "Your dependencies are now in sync."