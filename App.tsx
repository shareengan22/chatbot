import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './UI/Home';
import About from './UI/About';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: 'black',
            },

            drawerActiveBackgroundColor: '#333333',
            drawerActiveTintColor: 'white',
            drawerInactiveBackgroundColor: '#1E1E1E',
            drawerInactiveTintColor: '#D3D3D3',
          }}>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: 'LpuQueryBot',
              headerStyle: {backgroundColor: 'black'},
              headerTintColor: 'silver',
              headerTitleAlign: 'center',
            }}
          />
          <Drawer.Screen name="About" component={About} 
            options={{
              headerStyle: {backgroundColor: 'black'},
              headerTintColor: 'silver',
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
