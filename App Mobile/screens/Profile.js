import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions,AsyncStorage } from 'react-native';

import {Header,Left,Right,Center,Icon} from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import '../src/components/global.js'

export default class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        data: [],
        error: null,
        refreshing: false,
        email:"",
        password:""
      };
      }


      componentDidMount() {
        this.getGlobal().then(
            () => {this.makeRemoteRequest();}
        );
        
      }

      async getGlobal() {
        try {
          this.setState({ email: await AsyncStorage.getItem("global.Email")});
          this.setState({ password: await AsyncStorage.getItem("global.Pass")});
          
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
    
      makeRemoteRequest = () => {
        const url = `https://digitalconstructionhub.ovh/api/api.php?email=${this.state.email}&pass=${this.state.password}&profile=true`;
        this.setState({ loading: true });
    
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: res[0],
              error: res.error || null,
              loading: false,
              refreshing: false
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
          console.log(this.state.data)
      };

      render() {
        return (
        <View style={styles.container}>
            <Header style={{backgroundColor:'#008585'}}>
                <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff'}}/>
                </View>
                <Left>
                <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
                </Left>
            </Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.back} />
                <View style={styles.profileContainer}>
                    <Image source={require('../src/img/avatar.png')} style={styles.profileImage}></Image>
                    <Text style={styles.nom}> {this.state.data.first_name} {this.state.data.last_name} </Text>
                </View>

                <View style={styles.listProfile}>
                    <Image source={require('../src/img/work.png')} style={{width:35,height:35}} />
                    <Text style={styles.textProfile}> {this.state.data.authority == 'CUSTOMER_USER'? 'Utilisateur':'Administrateur'} </Text>
                </View>

                <View style={styles.listProfile}>
                    <Image source={require('../src/img/mail.png')} style={{width:31,height:31,backgroundColor:'#fff'}} />
                    <Text style={styles.textProfile}> {this.state.data.email} </Text>
                </View>

                <TouchableOpacity style={styles.listProfileSup}>
                    <Text style={styles.textProfileSup}>Supprimer</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
            );
        }
}

const styles = StyleSheet.create({
  container : {
    flex: 1
  },
  back: {
      padding: 10,
      width: '100%',
      backgroundColor: '#FAB511',
      height:150,
      opacity:0.8
  },
  profileImage: {
      width:140,
      height:140,
      borderRadius: 100,
      marginTop: -70
  },
  profileContainer: {
      alignItems: 'center'
  },
  nom: {
      fontSize: 25,
      fontWeight:'bold',
      padding:10
  },
  listProfile: {
      alignSelf: 'center',
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'#fff',
      width:'90%',
      padding:20,
      paddingBottom:22,
      borderRadius:10,
      shadowOpacity:5,
      elevation:15,
      marginTop:20
  },
  textProfile: {
      fontSize:20,
      color:'#818181',
      fontWeight:'bold',
      marginLeft:10
  },
  listProfileSup: {
    alignSelf: 'center',
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#FF0000',
    width:'90%',
    padding:20,
    paddingBottom:22,
    borderRadius:10,
    shadowOpacity:5,
    elevation:15,
    marginTop:20
},
textProfileSup: {
    fontSize:20,
    color:'#fff',
    fontWeight:'bold',
    marginLeft:10
},
})