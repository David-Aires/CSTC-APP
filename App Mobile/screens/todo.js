import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View, FlatList, ActivityIndicator, Modal, Image, Dimensions} from "react-native";
import colors from '../src/components/color'
import { TouchableOpacity } from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import {Header,Left,Icon} from 'native-base'
import gql from 'graphql-tag';
import TodoList from '../src/components/todoList'
import AddTodoModal from '../src/components/AddTodoModal'
import '../src/components/global.js'
import settings from '../src/components/settings'
import { useQuery, useSubscription } from "@apollo/react-hooks";





const Todo = ({navigation}) => {

    

    const FETCH_TODOS = gql`
        query {
            todos(where: {id_customer: {_eq:"${settings.group}"}}) {
            id
            id_customer
            text
            is_completed
            }
        }
    `;

    const [addTodoVisible,setaddTodoVisible] = useState(false);
    const { data, error, loading, refetch} = useQuery(FETCH_TODOS);
    const height = Math.round(Dimensions.get('window').height)/2
    

        if (loading) {
            return (
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
            )} 
        return (
            <View style={{flex:1}}>
                    <Header style={{backgroundColor:'#008585'}}>
                            <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
                            <Icon name='menu' onPress={() => navigation.openDrawer()} style={{color: '#fff'}}/>
                            </View>
                            <Left>
                            <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
                            </Left>
                    </Header>
                    <View style={styles.container}>
                        <Modal 
                        animationType="slide" 
                        visible={addTodoVisible}
                        onRequestClose={()=> setaddTodoVisible(!addTodoVisible)}
                        >
                            <AddTodoModal closeModal={()=> setaddTodoVisible(!addTodoVisible)} id_customer={settings.group} query={FETCH_TODOS} />
                        </Modal>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>
                                Todo <Text style={{fontWeight:'300',color: colors.orange}}>List</Text>
                            </Text>
                            <View style={styles.divider}/>
                        </View>

                        <View style={{marginVertical:48,flexDirection:'row'}} >
                            <TouchableOpacity style={[styles.addList,{marginRight:20}]} onPress={()=> setaddTodoVisible(!addTodoVisible)}>
                                <AntDesign name='plus' size={16} color={colors.orange} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addList} onPress={refetch}>
                                <AntDesign name='loading1' size={16} color={colors.orange} />
                            </TouchableOpacity>
                            

                            
                        </View>

                        <View style={{height:275, paddingLeft: 32}}>
                            <FlatList
                            data={data.todos}
                            renderItem= {(item) => <TodoList list={item.item} query={FETCH_TODOS}/>}
                            keyExtractor= {(item) => item.id.toString()}
                            horizontal= {true}
                            showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
            </View>
        )
}

export default Todo




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