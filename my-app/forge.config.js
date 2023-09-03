module.exports = {
  packagerConfig: {
    asar: true,
    // ...other packagerConfig options
    packageJSONConfig: {
      name: "alias-keep", // Replace with a valid package ID (e.g., lowercase and hyphen-separated)
      productName: "Alias Keep",
      version: "1.0.0",
      description: "My Electron application description",
      author: {
        name: "samuel",
        email: "samuel@samuelbaker.ca"
      },
      // ...other package.json properties
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'alias-keep', // Replace with your package name
        platform: 'win32',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
