#!/bin/bash

echo "🚀 Starting optimized build for Gramee Delivery..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
flutter clean

# Get dependencies
echo "📦 Getting dependencies..."
flutter pub get

# Build optimized APK
echo "🔨 Building optimized APK..."
flutter build apk --release --split-per-abi --obfuscate --split-debug-info=build/debug-info

# Build optimized App Bundle (recommended for Play Store)
echo "📦 Building optimized App Bundle..."
flutter build appbundle --release --obfuscate --split-debug-info=build/debug-info

echo "✅ Build completed!"
echo ""
echo "📱 APK files location:"
echo "   - build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk"
echo "   - build/app/outputs/flutter-apk/app-arm64-v8a-release.apk"
echo "   - build/app/outputs/flutter-apk/app-x86_64-release.apk"
echo ""
echo "📦 App Bundle location:"
echo "   - build/app/outputs/bundle/release/app-release.aab"
echo ""
echo "📊 To check APK size:"
echo "   ls -lh build/app/outputs/flutter-apk/"
echo ""
echo "📊 To check App Bundle size:"
echo "   ls -lh build/app/outputs/bundle/release/" 