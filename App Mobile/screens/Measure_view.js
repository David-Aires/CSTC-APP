import React from 'react';
import {View,Text,TouchableOpacity,TouchableWithoutFeedback,StyleSheet,Image} from 'react-native';
import {Header,Left,Icon} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Measure from '../src/components/measure';
import Card from '../src/components/card';
import Chart from '../src/components/chart';

export default class Measure_view extends  React.Component{
    constructor(props) {
        super(props);
    this.state = {
        color : '#136DF3',
        activestate : 'rgba(255, 255, 255, 0.291821)',
        name:""
        }

    this.FocusListener = this.props.navigation.addListener('didFocus', () => {
        this.setState({name:this.props.navigation.state.params.name});
        })
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.name)
        this.setState({name:this.props.navigation.state.params.name});
      }

      static navigationOptions = {
        header: null
      }
    
    render(){
        return(
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
                <View style={styles.containerone}>
                    <View style={styles.boxone}></View>
                    <View style={styles.boxtwo}>
                        <Text style={styles.name}>{ this.state.name }</Text>
                    </View>
                    <View style={styles.boxthree}>
                        <Chart />
                    </View>
                    <View style={styles.boxfour}>
                        <Measure measure='Thu' active={this.state.activestate}/>
                        <Measure measure='Fri'/>
                        <Measure measure='Sat'/>
                    </View>
                </View>
                <View style={styles.containertwo}>
                    <View style={styles.line}></View>
                    <View style={styles.progress}>
                        <Text style={styles.textone}>My Progress</Text>
                    </View>
                    <View style={styles.cards}>
                        <Card 
                        move="bounceInLeft" 
                        title="Mission" 
                        subtitle="85% Completed"
                        completed="85%"
                        screenchange = {()=>this.change()}
                        />

                        <Card 
                        move="bounceInRight" 
                        title="Completed" 
                        subtitle="5 out of 10 tasks"
                        completed="75%"
                        />

                        <Card 
                        move="bounceInRight" 
                        title="Completed" 
                        subtitle="5 out of 10 tasks"
                        completed="75%"
                        />

                        <Card 
                        move="bounceInRight" 
                        title="Completed" 
                        subtitle="5 out of 10 tasks"
                        completed="75%"
                        />
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}
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