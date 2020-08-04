import React from 'react';

import MapView from 'react-native-maps';

import {  AppRegistry,

  StyleSheet,

  Text,

  View,

  ScrollView,

  Animated,

  Image,

  Dimensions, } from 'react-native';



export default class Temp extends React.Component {

  

  state = {

    markers: [

      {

        coordinate: {

          latitude: 50.665791,

          longitude: 4.612230,

        },

        title: "EPHEC",

        description: "SCHOOL",

      },

    ],

    region: {

      latitude: 50.665791,

      longitude: 4.612230,

      latitudeDelta: 0.005,

      longitudeDelta: 0.005,

    },

  };



  render() {

    {this.state.markers.map((marker, index) => {

      return (

        <MapView.Marker key={index} coordinate={marker.coordinate}>

          <Animated.View style={[styles.markerWrap]}>

            <Animated.View style={[styles.ring]} />

            <View style={styles.marker} />

          </Animated.View>

        </MapView.Marker>

      );

    })}

    

    return (

      <View style={styles.container}>

        <MapView 

        region={this.state.region}


        zoomEnabled={true}

        style={styles.mapStyle} />

      </View>

    );

  }

}







const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#fff',

    alignItems: 'center',

    justifyContent: 'center',

  },

  mapStyle: {

    width: Dimensions.get('window').width,

    height: Dimensions.get('window').height,

  },

});