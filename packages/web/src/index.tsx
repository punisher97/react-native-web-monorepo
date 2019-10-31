import { AppRegistry } from 'react-native';
import './styles/global.css';
import { App } from 'shared/src/App';

AppRegistry.registerComponent('myprojectname', () => App);
AppRegistry.runApplication('myprojectname', {
  rootTag: document.getElementById('root'),
});
