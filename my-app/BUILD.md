# Building Installers for Alias Keep

This guide explains how to create distributable installers for Windows, macOS, and Linux.

## Prerequisites

1. Install dependencies:
```bash
npm install
```

## Building Installers

### Create Installers for Your Current Platform

```bash
npm run make
```

This will create installers in the `out/make` directory.

### Platform-Specific Installers

#### Windows (from any OS)
Creates a Windows installer (.exe):
```bash
npm run make -- --platform=win32
```
**Output:** `out/make/squirrel.windows/x64/alias-keep-1.0.0 Setup.exe`

#### macOS (requires macOS)
Creates a macOS application bundle (.zip):
```bash
npm run make -- --platform=darwin
```
**Output:** `out/make/zip/darwin/x64/alias-keep-darwin-x64-1.0.0.zip`

#### Linux - Debian/Ubuntu (.deb)
```bash
npm run make -- --platform=linux --arch=x64
```
**Output:** `out/make/deb/x64/alias-keep_1.0.0_amd64.deb`

#### Linux - Fedora/RedHat (.rpm)
```bash
npm run make -- --platform=linux --arch=x64
```
**Output:** `out/make/rpm/x64/alias-keep-1.0.0-1.x86_64.rpm`

## Distribution Methods

### 1. Direct Download (Simplest)
1. Upload installers to GitHub Releases
2. Users download and install for their platform

### 2. GitHub Releases (Recommended)
```bash
# Tag your release
git tag v1.0.0
git push origin v1.0.0

# Go to GitHub → Releases → Create a new release
# Upload the installer files from out/make/
```

### 3. Auto-Update Setup (Advanced)
Configure Electron's auto-updater to check for updates automatically.

## Installation Instructions for Users

### Windows
1. Download `alias-keep-1.0.0 Setup.exe`
2. Double-click to install
3. Windows may show a warning (app is unsigned) - click "More info" → "Run anyway"

### macOS
1. Download the `.zip` file
2. Extract and drag `Alias Keep.app` to Applications folder
3. First launch: Right-click → Open (to bypass Gatekeeper for unsigned apps)

### Linux (Debian/Ubuntu)
```bash
sudo dpkg -i alias-keep_1.0.0_amd64.deb
```

### Linux (Fedora/RedHat)
```bash
sudo rpm -i alias-keep-1.0.0-1.x86_64.rpm
```

## Code Signing (Optional but Recommended)

To avoid security warnings:

### Windows
- Get a code signing certificate ($200-$400/year)
- Sign with `signtool.exe`

### macOS
- Enroll in Apple Developer Program ($99/year)
- Get Developer ID certificate
- Sign and notarize the app

### Linux
- Generally not required

## File Size Optimization

The app bundles Electron and Chromium (~150-200MB). To reduce size:
- Already using `asar: true` for packaging
- Consider using `electron-builder` instead for better compression
- Remove unused dependencies

## Troubleshooting

### "Cannot make for platform X"
Some makers only work on their target platform. Cross-platform builds require additional setup.

### Missing Icons
Place icon files in `my-app/assets/`:
- `icon.png` (512x512 or larger for Linux)
- `icon.ico` (for Windows)
- `icon.icns` (for macOS)

### Build Fails
```bash
# Clean and rebuild
rm -rf out/
rm -rf node_modules/
npm install
npm run make
```

## Publishing to Distribution Platforms

### Microsoft Store (Windows)
Requires Windows Store Developer account ($19 one-time fee)

### Mac App Store
Requires Apple Developer Program ($99/year)

### Snap Store (Linux)
Free, supports auto-updates
```bash
npm install --save-dev @electron-forge/maker-snap
```

## Security Notes

- **No telemetry or analytics** - All data stays local
- **Encrypted by default** - Uses AES-256-GCM encryption
- **No internet required** - Fully offline capable
- **No user accounts** - Master password never leaves device

## Distribution Checklist

- [ ] Update version number in `package.json`
- [ ] Test the app thoroughly
- [ ] Create/update CHANGELOG.md
- [ ] Build installers for all platforms
- [ ] Test installers on clean systems
- [ ] Create GitHub Release with installers
- [ ] Update README with download links
- [ ] Announce release to users

## Quick Release Script

```bash
#!/bin/bash
# Build for all platforms (run on each OS or use CI/CD)

# Clean
rm -rf out/

# Build
npm run make

# Installers will be in out/make/
ls -lh out/make/
```
