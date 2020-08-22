import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native';

import {Header,Left,Right,Center,Icon} from 'native-base'
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'
import settings from '../src/components/settings'



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
    const url = `https://digitalconstructionhub.ovh/api/api.php?email=${data.email}&pass=${data.password}&asset=true`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        this.setState({ error:true, loading: false});
      });
  })
 
  return (
    <View>
      <Text> test </Text>
    </View>
  )
  
}

export default Dashboard;