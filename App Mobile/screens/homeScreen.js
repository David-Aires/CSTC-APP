import React from 'react';
import { 
  StyleSheet, 
  Text,
  Alert,
  Image, 
  View,
  Button,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  AsyncStorage

 } from 'react-native';



import bgImage from '../src/img/background.jpg'
import logo from '../src/img/icon.png'
import Icon from 'react-native-vector-icons/Ionicons'





const { width: WIDTH}= Dimensions.get('window')

 export default class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      email: "",
      password: "",
      userData: "",
      token: ""
    }
  }

  componentDidMount() {
    this.getToken()
    .then( () => {
      if(this.state.token) {
        this.props.navigation.navigate('Dashboard') 
      }
    })    
 }

  static navigationOptions = {
    header: null,
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({showPass: false,press:true})
    } else {
      this.setState({showPass: true,press: false})
    }
  }

  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };

  async storeToken(user,email,password) {
    try {
       await AsyncStorage.setItem("userData", user);
       await AsyncStorage.setItem("global.Email", email);
       await AsyncStorage.setItem("global.Pass", password);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getToken(user) {
    try {
      let Data = await AsyncStorage.getItem("userData");
      this.setState({ token: Data });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  login = (email,password) => {
    fetch('https://dashboard.digitalconstructionhub.ovh/api/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.token) {
          this.storeToken(responseJson.token,email,password)
          this.props.navigation.navigate("Dashboard")
        } else {
          alert('wrong');
        }
    })
      .catch((error) => {
        console.error(error);
    });
  }

  render(){
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.logoText}>CSTC</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcons}/>
          <TextInput 
            style={styles.input}
            placeholder={'Username'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid = 'transparent'
            onChangeText={this.handleEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcons}/>
          <TextInput 
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid = 'transparent'
            onChangeText={this.handlePassword}
          />

          <TouchableOpacity style={styles.btnEye}
          onPress={this.showPass.bind(this)}>
            <Icon name={this.state.press == false?'ios-eye':'ios-eye-off'} size={27} color={'rgba(255,255,255,0.7)'} />
          </TouchableOpacity>
        </View>
        

        <TouchableOpacity style={styles.btnLogin} onPress={() => this.login(this.state.email, this.state.password)}>
          <Text style={styles.text} >Login</Text>
        </TouchableOpacity>
          
      </ImageBackground>
    );
  }
}





const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5
  },
  input: {
    width: WIDTH -55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(255,255,255,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },
  inputIcons: {
    position: 'absolute',
    top: 8,
    left: 37  
  },
  inputContainer: {
    marginTop: 10
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37  
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center'
  },
  btnLogin: {
    width: WIDTH -55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#fab028',
    justifyContent: 'center',
    marginTop: 20
  }
});

