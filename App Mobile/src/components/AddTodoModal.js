import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TextInput, AsyncStorage, KeyboardAvoidingView, TouchableOpacity, StyleSheet} from "react-native";
import {AntDesign} from '@expo/vector-icons'
import colors from './color'
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import { FETCH_TODOS } from '../../screens/todo';



const INSERT_TODO = gql`
  mutation ($text: String!, $id_customer: String!){
    insert_todos (
      objects: {
        text: $text,
        id_customer: $id_customer,
      }
    ){
      returning {
        id
        id_customer
        text
        is_completed
      }
    }
  }
`;

export default class AddTodoModal extends React.Component {
    state = {
        text: ""
    }

    render() {
    const { text } = this.state;
    const { id_customer } = this.props;
    return (
      <Mutation
        mutation={INSERT_TODO}
        variables={{
          text,
          id_customer,
        }}
        update={(cache, {data: {insert_todos}}) => {
            console.log(FETCH_TODOS)
          const data = cache.readQuery({
            query: this.props.query,
          });
          
          const newTodo = insert_todos.returning[0];
          const newData = {
            todos: [ newTodo, ...data.todos]
          }
          cache.writeQuery({
            query: this.props.query,
            data: newData
          });
        }}
      >
        {
          (insertTodo, { loading, error}) => {
            const submit = () => {
              if (error) {
                return <Text> Error </Text>;
              }
              if (loading || text === '') {
                return;
              }
              this.setState({
                text: ''
              });
              insertTodo();
              this.props.closeModal();
            }
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{position: 'absolute', top:64,right:32}} onPress={this.props.closeModal}>
                    <AntDesign name='close' size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{alignSelf:'stretch',marginHorizontal:32}}>
                    <Text style={styles.title}>Creation d'une nouvelle tâche</Text>
                    <TextInput style={styles.input} placeholder="texte..."  onChangeText={this._handleTextChange} value={text}/>

                    <TouchableOpacity style={styles.create} onPress={submit}>
                        <Text style={{color: colors.white, fontWeight:'600'}}>
                            Ajouter!
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
          }
        }
        </Mutation>
        );
    }

    _handleTextChange = (text) => {
        this.setState({
          text
        })
      }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontSize:28,
        fontWeight:'800',
        color: colors.black,
        alignSelf:'center',
        marginBottom:16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop:8,
        paddingHorizontal:16,
        fontSize: 18

    },
    create: {
        marginTop:24,
        height: 50,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.orange
    }
})