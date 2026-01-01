module.exports = {
  packagerConfig: {
    asar: true,
    appBundleId: 'com.aliaskeep.app',
    appCategoryType: 'public.app-category.utilities',
    name: 'alias-keep',
    executableName: 'alias-keep',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'alias-keep',
        authors: 'Sam',
        description: 'Secure local alias generator with encrypted storage',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Sam',
          homepage: 'https://github.com/Forworddash/AliasKeep',
          categories: ['Utility'],
          description: 'Secure local alias generator with encrypted storage - no data collection',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          homepage: 'https://github.com/Forworddash/AliasKeep',
          categories: ['Utility'],
          description: 'Secure local alias generator with encrypted storage - no data collection',
        },
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
