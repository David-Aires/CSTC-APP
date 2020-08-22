import React from "react";
import {StyleSheet,Text,View, FlatList, ActivityIndicator, Modal, Image} from "react-native";
import colors from '../src/components/color'
import { TouchableOpacity } from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import { Query } from 'react-apollo'
import {Header,Left,Icon} from 'native-base'
import gql from 'graphql-tag';
import TodoList from '../src/components/todoList'
import AddTodoModal from '../src/components/AddTodoModal'
import '../src/components/global.js'

export const FETCH_TODOS = gql`
  query {
    todos(where: {id_customer: {_eq: "${global.Group}"}}) {
      id
      id_customer
      text
      is_completed
    }
  }
`;

export default class Todo extends React.Component {
    state = {
        addTodoVisible: false,
    };

    

    toggleAddTodoModal() {
        this.setState({addTodoVisible: !this.state.addTodoVisible})
    }

   

    

    
    

    render() {
        
        return (
            <Query
            fetchPolicy={'network-only'}
        query={FETCH_TODOS}
      >
        {
          ({data, error, loading}) => {
            if (error || loading) {
              return  (
              <View style={styles.center}>
                <ActivityIndicator animating={true} size='large' color='#FAB511'/>
             </View>
             )
            }
            return (
                <View style={{flex:1}}>
                    <Header style={{backgroundColor:'#008585'}}>
                        <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff'}}/>
                        </View>
                        <Left>
                        <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
                        </Left>
                    </Header>
                    <View style={styles.container}>
                        <Modal 
                        animationType="slide" 
                        visible={this.state.addTodoVisible}
                        onRequestClose={()=>this.toggleAddTodoModal()}
                        >
                            <AddTodoModal closeModal={()=> this.toggleAddTodoModal()} id_customer='1ea5df09d9197409cecbbb9a6cdb452'/>
                        </Modal>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>
                                Todo <Text style={{fontWeight:'300',color: colors.orange}}>List</Text>
                            </Text>
                            <View style={styles.divider}/>
                        </View>

                        <View style={{marginVertical:48}} >
                            <TouchableOpacity style={styles.addList} onPress={()=> this.toggleAddTodoModal()}>
                                <AntDesign name='plus' size={16} color={colors.orange} />
                            </TouchableOpacity>

                            <Text style={styles.add} >Ajouter</Text>
                        </View>

                        <View style={{height:275, paddingLeft: 32}}>
                            <FlatList
                            data={data.todos}
                            renderItem= {(item) => <TodoList list={item.item}/>}
                            keyExtractor= {(item) => item.id.toString()}
                            horizontal= {true}
                            showsHorizontalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                            />
                        </View>
                    </View>
                </View>
            )
          }
        }
      </Query>
    )
  }
}




const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
        alignItems:'center',
        justifyContent:'center'
    },
    divider: {
        backgroundColor: colors.orange,
        height:1,
        flex:1,
        alignSelf:'center'
    },
    title: {
        fontSize: 38,
        fontWeight:"800",
        color: colors.black,
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.orange,
        borderRadius: 4,
        padding:16,
        alignItems:'center',
        justifyContent:'center'
    },
    add: {
        color: colors.orange,
        fontWeight: '600',
        fontSize: 14,
        marginTop: 8
    },
    center: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    }
})