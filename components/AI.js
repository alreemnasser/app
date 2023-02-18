import { useState } from "react"
import { ImageBackground, ScrollView, StyleSheet, Text, View,ActivityIndicator } from "react-native"
import Home from "./Home"
import background from './Images/splash-screen.png'
export default function AI({route,navigation}){

const[text,setText]=useState("")
const { selectedPrompt } = route.params;   
 return(
        <View >
            
            <ImageBackground style={{height:'100%'}} blurRadius={5} source={background}>
                <View style={styles.container}>
                    <Text style={styles.heading}>
                        {selectedPrompt}
                    </Text>
                  
                  
                    <Home selectedPrompt={selectedPrompt} changeText={(value)=>{
                    setText(value)
                }}/>

                    <ScrollView>              
                         <View>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                    </View>
                    </ScrollView> 
                </View>
                

            </ImageBackground>

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        padding:40,
        marginTop:1
    },
    heading:{
        fontSize:40,
        color:'white'
    },text:{
        marginTop:0,
        fontSize:40,
        color:'white'
    }
})