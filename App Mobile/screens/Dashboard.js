import React  from 'react';
import { Text, View, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native';

import {Header,Left,Right,Center,Icon} from 'native-base'
import settings from '../src/components/settings'
import colors from '../src/components/color'
import MaterielCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


async function getGlobal() {
  try {
    const email = await AsyncStorage.getItem("global.Email");
    const password= await AsyncStorage.getItem("global.Pass");
    return {
      email : email,
      password: password
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
}


const Dashboard = ({navigation}) => {

  getGlobal().then( (data) => {
    const url = `https://digitalconstructionhub.ovh/api/api.php?email=${data.email}&pass=${data.password}&group=true`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        settings.group =  res.id_customer;
      })
      .catch(error => {
        console.error(error)
      });
  })
 
  return (
    <View style={{flex:1}}>
      <Header style={{backgroundColor:'#008585'}}>
                    <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                    <Icon name='menu' onPress={() => navigation.openDrawer()} style={{color: '#fff'}}/>
                    </View>
                    <Left>
                    <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
                    </Left>
      </Header>
      <View style={styles.container}>
        <MaterielCommunityIcons  name='view-module' style={{color:colors.orange}} size={80}  />
        <Text style={styles.title}>Aucun module courant!</Text>
      </View>
      
    </View>
  )
  
}

export default Dashboard;

const styles = StyleSheet.create({
  title: {
    fontSize:28,
    fontWeight:'800',
    color: colors.orange,
    alignSelf:'center',
    marginBottom:16
  },
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})