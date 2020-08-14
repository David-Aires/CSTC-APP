import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';

import {Header,Left,Right,Center,Icon} from 'native-base'
import MapView, { Marker } from 'react-native-maps';


export default class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      }
    static navigationOptions = {
        header: null, 
      };
    
      state = {
        region: {
          latitude: 50.665791,
          longitude: 4.612230,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
          error:null,
        },
    
      };

      componentDidMount(){
        navigator.geolocation.getCurrentPosition(position => {
          this.setState({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            error: null,
          });
        }, error=> this.setState({error:error.message}),
        {enableHighAccuracy:true,timeout:20000,maximumAge:2000});
      }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor:'#483a9c'}}>
          <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
          <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff'}}/>
          </View>
          <Left>
          <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
          </Left>
        </Header>
        <MapView 
        region={{ 
          latitude: 50.665791,
          longitude: 4.612230,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,}}
        zoomEnabled={true}
        style={styles.mapStyle}>
          <Marker coordinate={this.state} />
        </MapView>
      </View>
    );
  }
}
  



const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  mapStyle: {

    width: Dimensions.get('window').width,

    height: Dimensions.get('window').height,

  },
})