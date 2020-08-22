import React, { useState } from 'react';
import {View,Text,TouchableOpacity,TouchableWithoutFeedback,StyleSheet,Image, ActivityIndicator, Dimensions} from 'react-native';
import {Header,Left,Icon} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import gql from 'graphql-tag';
import {useSubscription} from '@apollo/react-hooks';
import Card from '../src/components/card';
import Chart from '../src/components/chart';





const Measure_view = ({navigation}) => { 

    this.FocusListener = navigation.addListener('didFocus', () => {
          const name = navigation.state.params.name;
        })

        const SUBSCRIBE_TO_DATA = gql`
        subscription {
            ts_kv(where: {entity_id: {_eq: "${navigation.state.params.id}"}},limit:45,order_by: {ts: desc}) {
                key
                dbl_v
            }
        }
`;
        
    const { data, error, loading } = useSubscription(SUBSCRIBE_TO_DATA);
    const measure = [];
    const tab=[];
    const [choice_tab, setChoice_tab] = useState();
    const height = Math.round(Dimensions.get('window').height)/2
   

    choice = (id) => {   
        junk_tab = [];
        data.ts_kv.map((key) => {
            if(key.key == id ) {
                junk_tab.push(key.dbl_v)
            }
        })
        junk_tab = junk_tab.slice(0,10).reverse();
        console.log(junk_tab)
        return junk_tab
    }


    if (loading) { return(
        <View>
            <Header style={{backgroundColor:'#008585'}}>
                    <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                    <Icon name='menu' onPress={() => navigation.openDrawer()} style={{color: '#fff'}}/>
                    </View>
                    <Left>
                    <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
                    </Left>
            </Header>
            <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:height}}>
                <ActivityIndicator animating={true} size='large' color='#FAB511'/>
            </View>
        </View>
    )} else if(data.ts_kv.length == 0 ) {
        console.log(data.ts_kv)
        return (
            <View style={{backgroundColor:'#FAB511'}}>
                <Header style={{backgroundColor:'#008585'}}>
                    <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                    <Icon name='menu' onPress={() => navigation.openDrawer()} style={{color: '#fff'}}/>
                    </View>
                    <Left>
                    <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
                    </Left>
                </Header>
                <Text style={styles.subtitle} >
                    Aucunes données disponibles
                </Text>
            </View>
        )
    } else {
        data.ts_kv.map((key) => {
            if (!(tab.includes(key.key))) {
                tab.push(key.key);
            }
        })
    }
        
    


    return(
            <View style={{backgroundColor:'#FAB511'}}>
                <Header style={{backgroundColor:'#008585'}}>
                    <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                    <Icon name='menu' onPress={() => navigation.openDrawer()} style={{color: '#fff'}}/>
                    </View>
                    <Left>
                    <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
                    </Left>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.containerone}>
                            <View style={styles.boxone}></View>
                            <View style={styles.boxtwo}>
                                <Text style={styles.name}> {navigation.state.params.name} </Text>
                            </View>
                            <View style={styles.boxthree}>
                                {tab.map((key) => {
                                    return (
                                    <View>
                                        <Text style={styles.subtitle}> {key} </Text>
                                        <Chart data={choice(key)} />
                                    </View>
                                    )
                                })
                                }
                                
                            </View>
                            <View style={styles.boxfour}></View>
                        </View>
                        <View style={styles.containertwo}>
                            <View style={styles.line}></View>
                            <View style={styles.progress}>
                                <Text style={styles.textone}>Données enregistrées</Text>
                            </View>
                            <View style={styles.cards}>
                                {data.ts_kv.map((key) => {
                                    if (!(measure.includes(key.key))) {
                                        measure.push(key.key);
                                        return (
                                            <Card 
                                            move="bounceInLeft" 
                                            title= {key.key }
                                            subtitle=""
                                            completed={key.dbl_v}
                                            />
                                        )
                                    }
                                })}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
    );
}

export default Measure_view;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        display : 'flex',
        backgroundColor : '#FAB511',

    },
    containerone : {
        flex : 1.5,
        display : 'flex'
    },
    containertwo : {
        flex : 1,
        backgroundColor : '#fff',
        borderTopRightRadius : 60,
        borderTopLeftRadius : 60,
    },
    boxone : {
        flex : 1,
    },
    boxtwo : {
        flex : 0.8,
        marginHorizontal : 35
    },
    boxthree : {
        flex : 2.5,
    },
    boxfour : {
        flex : 0.5,
        color : '#fff',
        flexDirection : 'row',
        marginTop: 20,
        marginBottom:20
    },
    name : {
        fontSize : 38,
        color : '#fff',
        fontWeight : 'bold',
        letterSpacing : -0.5,
    },
    subtitle : {
        fontSize : 20,
        color : '#fff'
    },
    line : {
        width : 66,
        height : 4,
        backgroundColor : '#F4F0F0',
        borderRadius : 2,
        marginVertical : 25,
        left : 150
    },
    progress : {
        left : 50
    },
    textone : {
        fontSize : 20,
        color : '#2D2D2D',
        letterSpacing : -0.5
    },
    cards : {
        flex : 1,
        display : 'flex',
        marginTop : 10,
        marginHorizontal : 30
    },
    
})