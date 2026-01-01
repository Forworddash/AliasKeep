# Quick Release Guide

## Step 1: Build the Installers

Navigate to the project directory and run:

```bash
cd /home/deneuve/Documents/AliasKeep/AliasKeep/my-app
npm run make
```

This will create installers in the `out/make/` directory:
- **Linux (Debian):** `out/make/deb/x64/alias-keep_1.0.0_amd64.deb`
- **Linux (RPM):** `out/make/rpm/x64/alias-keep-1.0.0-1.x86_64.rpm`
- **Windows:** (if building on Windows) `out/make/squirrel.windows/x64/`
- **macOS:** (if building on Mac) `out/make/zip/darwin/x64/`

## Step 2: Test the Installer

Before distributing, test on a clean system:

### On Linux (your current system):
```bash
# Install the .deb package
sudo dpkg -i out/make/deb/x64/alias-keep_1.0.0_amd64.deb

# Launch the app
alias-keep

# Or find it in your applications menu
```

To uninstall for testing:
```bash
sudo dpkg -r alias-keep
```

## Step 3: Create GitHub Release

1. **Commit and push your changes:**
```bash
cd /home/deneuve/Documents/AliasKeep/AliasKeep
git add .
git commit -m "v1.0.0 - Add encryption and build configuration"
git push origin main
```

2. **Create a tag:**
```bash
git tag -a v1.0.0 -m "Release v1.0.0 - Secure encrypted storage"
git push origin v1.0.0
```

3. **Create Release on GitHub:**
   - Go to: https://github.com/Forworddash/AliasKeep/releases
   - Click "Draft a new release"
   - Select tag: `v1.0.0`
   - Release title: `v1.0.0 - Secure Encrypted Storage`
   - Description:
   ```markdown
   ## 🔒 First Secure Release
   
   ### New Features
   - ✅ AES-256-GCM encryption for all data
   - ✅ Master password protection
   - ✅ No data collection - 100% local
   - ✅ Dark mode support
   - ✅ Change password functionality
   
   ### Installation
   
   **Linux (Debian/Ubuntu):**
   Download and install the `.deb` file
   
   **Linux (Fedora/RedHat):**
   Download and install the `.rpm` file
   
   **Windows/macOS:**
   Build from source (see README.md)
   
   ### ⚠️ Important
   - Remember your master password - it cannot be recovered
   - All data is encrypted locally on your device
   - No internet connection required
   ```

4. **Upload installers:**
   - Drag and drop files from `my-app/out/make/` to the release
   - Upload: `alias-keep_1.0.0_amd64.deb`
   - Upload: `alias-keep-1.0.0-1.x86_64.rpm`

5. Click "Publish release"

## Step 4: Update README with Download Link

The README already has a link to releases. Users can now download directly!

## Building for Other Platforms

### To create Windows installer:
You need a Windows machine or VM:
```bash
npm run make -- --platform=win32
```

### To create macOS installer:
You need a Mac:
```bash
npm run make -- --platform=darwin
```

### Using CI/CD (GitHub Actions):
Create `.github/workflows/build.yml` to automatically build for all platforms on release.

## Distribution Checklist

- [x] Update version in package.json
- [x] Build installers with `npm run make`
- [ ] Test installer on clean system
- [ ] Create Git tag
- [ ] Create GitHub Release
- [ ] Upload installer files
- [ ] Share release link with users

## File Locations

After `npm run make`, find your installers:
```
my-app/
└── out/
    └── make/
        ├── deb/
        │   └── x64/
        │       └── alias-keep_1.0.0_amd64.deb  (Debian/Ubuntu)
        └── rpm/
            └── x64/
                └── alias-keep-1.0.0-1.x86_64.rpm  (Fedora/RedHat)
```

## User Installation Instructions

### Debian/Ubuntu:
```bash
sudo dpkg -i alias-keep_1.0.0_amd64.deb
```

### Fedora/RedHat:
```bash
sudo rpm -i alias-keep-1.0.0-1.x86_64.rpm
```

### Or double-click in file manager to install via Software Center!

---

**Ready to build?** Run: `npm run make` in the my-app directory!
