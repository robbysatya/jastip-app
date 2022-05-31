import React, {useState, useEffect} from 'react'
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const register = ({ navigation }) => {

    const [name, setName]               = useState('Nestiawan Ferdiyanto');
    const [noPhone, setNoPhone]         = useState('083412337586');
    const [email, setEmail]             = useState('p.nestiawan@gmail.com');
    const [password, setPassword]       = useState('perdi321');

    useEffect(() => {
        const _validationLogin = async() => {
            const truthLogin = await AsyncStorage.getItem('sessionLogin');
            const roleAccess = await AsyncStorage.getItem('sessionRole');

            if(truthLogin && roleAccess == 'user'){
                return navigation.replace('Home') 
            } else if(truthLogin && roleAccess == 'admin'){
                return navigation.replace('DashboardAdmin')
            }
        }

        _validationLogin();
    }, [])

    const register = async() => {
        await fetch("https://tubes-pam-api.herokuapp.com/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'noTelp': noPhone,
                'email': email,
                'password': password,
            })
        }).then(res => res.json())
        .then(resData => {
            alert(resData.message);
            navigation.replace('Login');
        })
    }

    return (
        <ScrollView style={stylesLogin.register}> 
            <View style={stylesLogin.headersTitle}>
                <Text style={stylesLogin.titles}> Jastip </Text>
                <View style={stylesLogin.borderBottomTitle}></View>
            </View> 
            <View style={stylesLogin.contentLogin}>
                <View style={stylesLogin.textHeaderForm}>
                    <Text style={stylesLogin.textDaftar}>Daftar</Text>
                    <Text style={stylesLogin.textDaftarPraf}>Daftarkan diri anda untuk malakukan penitipan barang</Text>
                </View>
                <View style={stylesLogin.contentForm}>
                    <TextInput style={stylesLogin.textInput} placeholder="Name" 
                        onChangeText={(name) => setName(name) }  
                        value={ name } />
                    <TextInput style={stylesLogin.textInput} placeholder="NoPhone" 
                        onChangeText={(noPhone) => setNoPhone(noPhone) }  
                        value={ noPhone } />
                    <TextInput style={stylesLogin.textInput} placeholder="Email" 
                        onChangeText={(email) => setEmail(email) }  
                        value={ email } />
                    <TextInput style={stylesLogin.textInput} secureTextEntry={true} placeholder="Password" 
                        onChangeText={(password) => setPassword(password) }  
                        value={ password } />
                    <TouchableOpacity style={stylesLogin.ButtonStart} onPress={ () => { register() } }>
                        <Text style={stylesLogin.ButtonStartText}>Daftar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={stylesLogin.footerLogin}>
                <Text>Sudah punya akun ? 
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={stylesLogin.textMasukButtom}>Login</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ScrollView>
    )
}

export default register;

const stylesLogin = StyleSheet.create({
    register: {
        flex:1, 
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    headersTitle: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        marginTop: 50, 
    }, 
    borderBottomTitle: {
        borderWidth: 1.5,
        borderColor: "#259A62",
        borderRadius: 10,
        width: 40,
        marginBottom: 20,
    },  
    titles: {
        marginTop: 60,
        fontSize:45,
        color: "#259A62",
        fontWeight: "700",
    },
    borderBottomTitles: {
        borderWidth: 1.5,
        borderColor: "#259A62",
        borderRadius: 10,
        width: 40,
        marginBottom: 20,
    },
    textHeaderForm: {
        marginBottom: 20,
    },
    textMasukButtom:  {
        marginTop: 10,
        position: 'relative',
        top: 3, 
        marginLeft: 5, 
        color: '#259A62'
    },
    textDaftar: {
        fontSize: 26, 
        color: "#259A62",
        fontWeight: "700",
        marginBottom: 2,
    },
    footerLogin: {
        flex: 7,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentLogin: {
        flex: 5,
        padding: 20,
    },
    textInput: {
        marginTop: 5, 
        marginBottom: 5, 
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10, 
    },
    ButtonStart: {
        marginTop: 6,
    },
    ButtonStartText: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#259A62',
        borderColor: '#259A62',
        borderWidth: 1,
        color: '#ffffff',
        borderRadius: 5, 
    }
})
