import React from 'react';
import {StyleSheet,Text,View, Alert} from 'react-native'
import colors from './color'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { FETCH_TODOS } from '../../screens/todo';

const UPDATE_TODO = gql`
  mutation ($id: Int, $is_completed: Boolean) {
    update_todos (
      _set: {
        is_completed: $is_completed,
      },
      where: {
        id: {
          _eq: $id
        }
      }
    ) {
      returning {
        id
        id_customer
        text
        is_completed
      }
    }
  }
`;


const DELETE_TODO = gql`
  mutation ($id: Int) {
    delete_todos (
      where: {
        id: {
          _eq: $id
        }
      }
    ) {
      affected_rows
    }
  }
`;


export default TodoList = ({list,query}) => {
    return (    
            <View style={[styles.listContainer, {backgroundColor: '#FAB511'}]}>
                 <Mutation
                    mutation={UPDATE_TODO}
                    variables={{
                        id: list.id,
                        is_completed: !list.is_completed
            }}
            >
          {
            (updateTodo, {loading, error}) => {
              if (error) {
                return (<Text> Error </Text>);
              }
              const update = () => {
                if (loading) { return; }
                updateTodo();
              }
              return (
                <Mutation
                mutation={DELETE_TODO}
                variables={{
                  id: list.id,
                }}
                update={(cache) => {
                  const data = cache.readQuery({
                    query: query
                  });
                  const newData = {
                    todos: data.todos.filter((t) => t.id !== list.id)
                  }
                  cache.writeQuery({
                    query: query,
                    data: newData
                  });
                }}
              >
                {
                  (deleteTodo, { loading, error }) => {
                    if (error) {
                      return <Text> Error </Text>;
                    }
                    const remove = () => {
                      if (loading) { return; }
                      Alert.alert(
                        'Suppression Compte',
                        'Voulez-vous vous supprimer ce compte?',
                        [
                          {text: 'Annuler', onPress: () => {return null}},
                          {text: 'Confirmer', onPress: () => {
                            deleteTodo();
                          }},
                        ],
                        { cancelable: false }
                      )   
                    };
                    return (
                        <TouchableOpacity onPress={update} onLongPress={remove} >
                        <Text style={styles.listTitle} numberOfLines={1}>
                            -Tâche-
                        </Text>

                        <View>
                        <View style={{alignItems:'center'}}>
                                <Text style={[styles.subtitle,{textDecorationLine: list.is_completed? 'line-through':"none",color: list.is_completed? colors.gray:colors.black }]}> {list.text} </Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                            </View>
                        </View>
                        </TouchableOpacity>
                );
            }
          }
        </Mutation> 
             )
            }
        }
        </Mutation>
        </View> 
    )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18
    },
    completed: {
        fontSize: 48,
        fontWeight:'200',
        color: colors.white
    },
    subtitle: {
        fontSize:16,
        fontWeight:'700',
    }
})