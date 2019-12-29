module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '^react-native$': 'react-native-web',
            'react-native-vector-icons': 'react-native-vector-icons/dist',
            'react-native-svg': 'react-native-svg-web',
          },
        },
      ],
    ],
  };
};
