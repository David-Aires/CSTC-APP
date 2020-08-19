import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Measure extends React.Component{
    render(){
        return(
            <View style={styles.box1}>
                <TouchableOpacity style={{borderRadius:10,padding:5,backgroundColor: this.props.active}} onPress={this.props.choice}>
                    <Text style={{color:'#fff'}}>{this.props.measure}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    box1 : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    }
})