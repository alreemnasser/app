import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View,TouchableOpacity, Button } from "react-native";
import background from './Images/astro.png'
import { Entypo } from '@expo/vector-icons';
import { getAuth, signOut } from "firebase/auth";

export default function IWantTo(props){
    const[selectedQuestions,setSelectedQuestions]=useState([])

    const questions=[
        'sleep better',
        'Feel calm and relaxed',
        'Reduce Stress',
        'Manage Anxiety',
        'Be present and mindfull',
        'something else'

    ]
    const[question,setQuestion]=useState(questions)
    const[selectedIndex,setSelectedIndex]=useState(0)

    useEffect(()=>{

    },[selectedQuestions])

    function logOut(){
  
        const auth = getAuth();
        signOut(auth).then((res) => {
          // Sign-out successful.
          console.log(res,"signou")
        }).catch((error) => {
          // An error happened.
        });
         }
    return(
        <View style={styles.container}>
            {/* <Button
        title="logOut"
        color={"#007AFF"}
        onPress={() => {
          logOut();
        }}
      /> */}
            <Image style={styles.image}  source={background}/>
            <View>
                <Text style={styles.title} >
                    What's on your mind
                </Text>
            </View>
            <View>
                <Text style={styles.text} >
                    I Want to
                </Text>
            </View>
            <View style={{width:"100%"}}>

                {question? question.map((question,index)=>(
                    <TouchableOpacity key={index} onPress={()=>{
                        
                        setSelectedIndex(index)
                    }}>
                    <View style={styles.card}>
                    <View>
                    <Text style={styles.text}>
                        {question}
                    </Text>
                    </View>
                    <View style={{backgroundColor:'black',width:30,height:30,borderRadius:100,marginRight:20}}>
                    { selectedIndex==index? <Entypo name="check" size={24} color="white" />:null}
                    </View>

                </View>
                </TouchableOpacity>
                )):null}
                <TouchableOpacity   onPress={()=>{
                   props.navigation.navigate("ai",{
                    selectedPrompt:question[selectedIndex]
                   })

                }}>
                <View style={{...styles.card,backgroundColor:'black',justifyContent:'center'}}>
                    <View>
                    <Text style={{...styles.text,color:'white',alignSelf:'center'}}>
                        Continue
                    </Text>
                    </View>
                   

                </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        alignItems:"center"
    },
    image:{
        width:'100%',
        height:'30%'
    },
    title:{
        marginTop:10,
        alignItems:'center',
        fontSize:30
    },
    text:{
        fontSize:20,
        marginLeft:5
   
    },
    card:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10,
        paddingLeft:10,
        
        borderRadius:100,
        height:50,
        borderWidth:1,
        width:"90%",
        marginVertical:10,
        marginHorizontal:'5%',
    
    }
    
})