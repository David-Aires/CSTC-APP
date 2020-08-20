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
import Icon from 'react-native-vector-icons/AntDesign';


import Dashboard from '../../screens/Dashboard'
import HomeScreen from '../../screens/homeScreen'
import Temp from '../../screens/Temp'
import Profile from '../../screens/Profile'
import Devices from '../../screens/devices';
import Measure_view from '../../screens/Measure_view'
import test from '../../screens/test'


const MainNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions : {
      gesturesEnabled: false,
    }
  } 
},
{
  headerMode: 'none',
  initialRouteName: 'HomeScreen'
}
);

const hideNavigator = createStackNavigator({
  Dashboard: Dashboard,
  Devices:Devices,
  Mesures: Measure_view  
},
{
  headerMode: 'none',
  initialRouteName: 'Dashboard'
}
);

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
      <Image source={require('../img/icon.png')} style={{height: 60, width:70}} />
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
      drawerLabel: () => null,
      drawerLockMode: 'locked-closed'
    }
  },
  'Module courant': {
    screen: hideNavigator,
    navigationOptions : {
      drawerIcon: ({tintColor}) => (<Icon name='pushpino' style={{fontSize:14,color:tintColor}}></Icon>)
    }
  },
  'Modules': {
    screen: Temp,
    navigationOptions : {
      drawerIcon: ({tintColor}) => (<Icon name='database' style={{fontSize:14,color:tintColor}}></Icon>)
    }
  },
  'Profil': {
    screen: Profile,
    navigationOptions : {
      drawerIcon: ({tintColor}) => (<Icon name='user' style={{fontSize:14,color:tintColor}}></Icon>)
    }
  },
  Test:test
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#C5E1A5',
    inactiveTintColor: '#fff'
  },
}
)



const Drawer = createAppContainer(MainDrawer);



export default Drawer;
