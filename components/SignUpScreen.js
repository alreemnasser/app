import React, { useState, createRef, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign, Feather } from '@expo/vector-icons';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import countryList from './countryList'
import Loader from './Loader';
import logo from './Images/logo.png'
import { getAuth, createUserWithEmailAndPassword, parseActionCodeURL } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import app, { auth, createUser } from '../firebaseConfig'
import { MaterialIcons } from '@expo/vector-icons';
import { async } from '@firebase/util';
import getCities from '../firebaseConfig';
import logoBack from './Images/title.png'
import { LinearGradient } from 'expo-linear-gradient';
import facebook from './Images/facebook.png'
import google from './Images/google.webp'
import apple from './Images/apple.png'
import button from './Images/signUpButton.png'
const RegisterScreen = (props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userMobileNumber, setUserMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const [country, setCountry] = useState(countryList);
  const [showPassword, setShowPassword] = useState(false);
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);
  const auth = getAuth();
  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async userCredentials => {
        const user = userCredentials.user;
        createUser({
          uid: user.uid,
          userEmail: userEmail,
          userName: userName,
          userAge: userAge,
          userMobileNumber: userMobileNumber,
          userCountry: userCountry,
          zipCode: zipCode
        }, "users")
          .then((responseJson) => {
            //Hide Loader
            setLoading(false);
            console.log(responseJson);
            props.navigation.navigate("home")
          })
          .catch((error) => {
            //Hide Loader
            setLoading(false);
            console.error(error);
          });
        console.log('Registered with:', user.email);
      })
      .catch(error => {


        alert(error.message)
      })
  }


  async function addUser(user) {

  }
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
  const onCompanyOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    handleSignUp()

  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={logo}
          style={{
            height: 10,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Loader loading={loading} />

      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <Image style={{ width: '100%' }} source={logoBack} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 8, borderTopEndRadius: 50 }}>
          {
        }
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <View>
              <FontAwesome name="user" size={24} style={{ top: 8 }} color="black" />
            </View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <View>
              <MaterialIcons name="email" style={{ top: 8 }} size={24} color="black" />
            </View>

            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            >
            </TextInput>
          </View>
          <View style={styles.SectionStyle}>
            <View>
              <MaterialCommunityIcons name="key" size={24} color="black" />
            </View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"

              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={!showPassword}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
            <Feather name={showPassword ? "eye" : "eye-off"} style={{ top: 6 }} size={24} color="black" onPress={() => setShowPassword(!showPassword)} />

          </View>
          {/
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}

          <TouchableOpacity
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
            activeOpacity={0.5}
            onPress={() => {
              // props.navigation.navigate("home")
              handleSubmitButton()



            }}>
            <Image style={{ borderRadius: 10, marginVertical: 30 }} source={button} />

            {}
          </TouchableOpacity>
          {
        </View> */}
          <Text
            style={styles.registerTextStyle}
            onPress={() => props.navigation.navigate('login')}>
            Already Have an account   ? <Text style={{ color: '#4d97f0' }}>Sign In</Text>
          </Text>
        </KeyboardAvoidingView>

      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0.8,
    borderRadius: 30,
    borderColor: 'black',
  },
  DropDown: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 18,
    marginRight: 18,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,

  },
  buttonStyle: {
    backgroundColor: '#4d97f0',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 60,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    marginLeft: 30
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 40,



    borderWidth: 0.8,
    borderRadius: 30,
    borderColor: 'black',


  },
  placeholderStyles: {
    height: 20
  },
  socialMediaIcon: {
    height: 50,
    width: 50,
    borderWidth: 2, marginHorizontal: 10, borderRadius: 10, borderColor: 'grey'
  }
});
