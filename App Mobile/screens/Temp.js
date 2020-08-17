import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TextInput, AsyncStorage} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {Header,Left,Icon} from 'native-base'
import '../src/components/global.js'

export default class Temp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      email:"",
      password:"",
      searchText: "",
      filteredData: []
    };
  }
  
  static navigationOptions = {
    header: null,
    title: 'Modules',
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
    const url = `https://digitalconstructionhub.ovh/api/api.php?email=${this.state.email}&pass=${this.state.password}&asset=true`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {},
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="  Recherche.."
        onChangeText={text => this.searchItems(text)}
        value={this.state.searchText}
      />
    )
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  searchItems = text => {
    this.setState({searchText: text});

    let filteredData = this.state.data.filter(function (item) {
      return item.name.includes(text);
    });

    this.setState({filteredData: filteredData});
  };

  

  render() {
    return (
      <View>
        <Header style={{backgroundColor:'#008585'}}>
          <View style={{alignContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
          <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff'}}/>
          </View>
          <Left>
          <Image style={{width:40,height:35}} source={require('../src/img/icon.png')}/>
          </Left>
        </Header>
        <FlatList
          data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data}
          renderItem={({ item }) => (
            <ListItem
              chevron={{color:'black'}}
              title={`${item.name}`}
              subtitle={item.id}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={()=> {this.props.navigation.navigate('Devices',{id:`${item.id}`,email:`${this.state.email}`,pass:`${this.state.password}`})}}
            />
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
        </View>
    );
  }
}
