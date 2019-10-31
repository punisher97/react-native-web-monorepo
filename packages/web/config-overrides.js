const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
//const util = require('util');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// our packages that will now be included in the CRA build step
const appIncludes = [
  resolveApp('src'),
  resolveApp('../shared/src'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  //  resolveApp('../../node_modules/react-router-native')
];

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(plugin => plugin.constructor.name !== 'ModuleScopePlugin');
  config.module.rules[0].include = appIncludes;
  config.module.rules[1] = null;
  config.module.rules[2].oneOf[1].include = appIncludes;
  config.module.rules[2].oneOf[1].exclude = /node_modules\/(?!(material-bread|react-native-vector-icons)\/).*/;
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-transform-flow-strip-types'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-transform-runtime'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins);
  Object.assign(config.resolve.alias, {
    'react-native-vector-icons': 'react-native-vector-icons/dist',
    'react-native-svg': 'react-native-svg-web',
  });
  config.module.rules = config.module.rules.filter(Boolean);
  config.plugins.push(new webpack.DefinePlugin({ __DEV__: env !== 'production' }));
  //fs.writeFileSync("./config.json",JSON.stringify(config,null,2))
  return config;
};
