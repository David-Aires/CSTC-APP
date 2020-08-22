import React from "react";
import gql from 'graphql-tag';
import {useSubscription, useQuery} from '@apollo/react-hooks';
import {AsyncStorage} from "react-native";
import './global.js'

const FETCH_GROUP= gql`
  query($email: String!) {
    tb_user(where: {email: {_eq:$email}}) {
        customer_id
      }
    }
`;

async function  getGlobal() {
    try {
      const email = await AsyncStorage.getItem("global.Email");
      return email
    } catch (error) {
      console.log("Something went wrong", error);
    }
}

const getWorkGroup = () => {

    try {
        const email = getGlobal().then(()=>{
            const { data, error, loading } = useQuery(FETCH_GROUP, {variables: {email: email}});
            return data.tb_user.customer_id
        })
      } catch (error) {
        console.log("Something went wrong", error);
      }
      
      
}

export default getWorkGroup;


