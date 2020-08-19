import React, { useState } from 'react';
import { Text, View,ActivityIndicator, ScrollView, FlatList} from 'react-native';
import {ListItem} from "react-native-elements";
import {useSubscription} from '@apollo/react-hooks';
import gql from 'graphql-tag';



const SUBSCRIBE_TO_DATA = gql`
subscription {
    ts_kv(limit:5,where: {entity_id: {_eq: "1ea67866032ec109cecbbb9a6cdb452"}}, order_by: {ts: desc}) {
        key
        dbl_v
    }
}
`;


const test = ({navigation}) => {
    const { data, error, loading } = useSubscription(SUBSCRIBE_TO_DATA);
    const measure = [];

    if (loading) { return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator animating={true} size='large' color='#FAB511'/>
        </View>
    )} else {
        
    }
    
    return (
        <View>
        <ScrollView>
            {data.ts_kv.map((key) => {
                if (!(measure.includes(key.key))) {
                    measure.push(key.key);
                    return (<Text> {key.key} {key.dbl_v} </Text>)
                }
            })}
        </ScrollView>
        </View>
    );


}

export default test