const crypto = require.resolve('crypto-browserify')
module.exports = {
  resolver: {
    extraNodeModules: {
      crypto,
      fs: require.resolve('expo-file-system'),
    },
  },
}
