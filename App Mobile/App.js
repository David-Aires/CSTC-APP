import React from 'react';
import { 
  StyleSheet, 
  Text,
  Image, 
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert
 } from 'react-native';


import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerView} from 'react-navigation-drawer'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/MaterialIcons';


import Dashboard from './screens/Dashboard'
import HomeScreen from './screens/homeScreen'
import Temp from './screens/Temp'
import Profile from './screens/Profile'
import Devices from './screens/devices';


const MainNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  Dashboard: Dashboard,
  Devices:Devices
});

const clearAppData = async function() {
  try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
  } catch (error) {
      console.error('Error clearing app data.');
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex:1, backgroundColor:'#008585'}}>
    <View style={{height:150,backgroundColor: '#008585', alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
      <Text style={{color: '#fff',fontWeight:'bold',fontSize:20}}>CSTC</Text>
      <Image source={require('./src/img/icon.png')} style={{height: 60, width:70}} />
    </View>
    <ScrollView>
      <DrawerNavigatorItems {...props}/>
        <TouchableOpacity onPress={()=>
              Alert.alert(
                'Log out',
                'Voulez-vous vous déconnecter?',
                [
                  {text: 'Annuler', onPress: () => {return null}},
                  {text: 'Confirmer', onPress: () => {
                    clearAppData()
                    .then(props.navigation.navigate('HomeScreen'))
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16,fontWeight: 'bold',color:'#FF0000'}}>Déconnexion</Text>
        </TouchableOpacity>
    </ScrollView>
    <View style={{alignItems:'center',position: 'absolute', left: 0, right: 0, bottom: 0}}><Text style={{color: '#fff',fontWeight:'bold'}}>Copyright © 2020 CSTC</Text></View>
  </SafeAreaView>
)


const MainDrawer = createDrawerNavigator({
  Map: {
    screen: MainNavigator,
    navigationOptions : {
      drawerIcon: ({tintColor}) => (<Icon name='streetview' style={{fontSize:14,color:tintColor}}></Icon>)
    }
  },
  Temp: Temp,
  Profile:Profile
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#C5E1A5',
    inactiveTintColor: '#fff'
  }
}
)



const Drawer = createAppContainer(MainDrawer);



export default Drawer;
