module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          components: './src/components',
          constants: './src/constants',
          contexts: './src/contexts',
          files: './src/files',
          navigation: './src/navigation',
          screens: './src/screens',
          services: './src/services',
          utils: './src/utils',
          images: './assets/images'
        }
      }
    ]
  ]
};
