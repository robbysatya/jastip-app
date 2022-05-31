import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = ({ navigation }) => {

    const [email, setEmail] = useState('p.nestiawan@gmail.com');
    const [password, setPassword] = useState('perdi321');
    const [loginData, setLogin] = useState(false);
    const [errorValidation, setValidation] = useState();

    useEffect(() => {
        const _validationLogin = async () => {
            const truthLogin = await AsyncStorage.getItem('sessionLogin');
            const roleAccess = await AsyncStorage.getItem('sessionRole');

            if (truthLogin && roleAccess == 'user') {
                return navigation.replace('Home')
            } else if (truthLogin && roleAccess == 'admin') {
                return navigation.replace('DashboardAdmin')
            }
        }

        _validationLogin();
    }, [])

    const login = async () => {
        if (!email.trim() && !password.trim()) {
            setValidation(true);
            setLogin(false);
        } else {
            setValidation(false);
            setLogin(true);

            try {
                await fetch("https://tubes-pam-api.herokuapp.com/login", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': email,
                        'password': password,
                    })
                }).then(
                    res => res.json()
                ).then(resData => {
                    AsyncStorage.setItem('sessionLogin', "true");
                    AsyncStorage.setItem('sessionID', resData.data.user.id.toString());
                    AsyncStorage.setItem('sessionNama', resData.data.user.name);
                    AsyncStorage.setItem('sessionEmail', resData.data.user.email);
                    AsyncStorage.setItem('sessionRole', resData.data.user.role);
                    AsyncStorage.setItem('sessionNoTelfon', resData.data.user.noTelfon.toString());
                    AsyncStorage.setItem('sessionToken', resData.data.token);

                    Alert.alert(
                        'Berhasil',
                        resData.message,
                    );

                    if (resData.data.user.role == 'user') {
                        navigation.replace('Home');
                    } else if (resData.data.user.role == 'admin') {
                        navigation.replace('DashboardAdmin');
                    }
                })
            } catch (error) {
                Alert.alert(
                    'Gagal',
                    "Username dan Password Tidak Terdaftar",
                );
                setLogin(false);
            }
        }
    }

    return (
        <ScrollView style={stylesLogin.login}>
            <View style={stylesLogin.headersTitle}>
                <Image
                    source={require('.././assets/logo.png')}
                    style={{ width: 50, height: 80 }}
                />
                <Text style={stylesLogin.titles}> Jastip </Text>
                <View style={stylesLogin.borderBottomTitle}></View>
            </View>
            <View style={stylesLogin.contentLogin}>
                <View style={stylesLogin.textHeaderForm}>
                    <Text style={stylesLogin.textDaftar}>Masuk</Text>
                    <Text style={stylesLogin.textDaftarPraf}>Masuk untuk memulai penitipan barang</Text>
                </View>
                <Text> {errorValidation == true ? "Silakan Isi Formnya" : ""} </Text>
                <View style={stylesLogin.contentForm}>
                    <TextInput style={stylesLogin.textInput} placeholder="Email"
                        onChangeText={(email) => { setEmail(email), email == null ? setValidation(true) : setValidation(false) }}
                        value={email} />
                    <TextInput style={stylesLogin.textInput} secureTextEntry={true} placeholder="Password"
                        onChangeText={(password) => { setPassword(password), password == null ? setValidation(true) : setValidation(false) }}
                        value={password} />
                    {/* <TouchableOpacity style={stylesLogin.ButtonStart} onPress={() => navigation.replace('Home')}> */}
                    <TouchableOpacity style={stylesLogin.ButtonStart} disabled={loginData} onPress={() => { login() }}>
                        <Text style={stylesLogin.ButtonStartText}>
                            {loginData == false ? "Masuk" : "Tunggu Sebentar"}
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={stylesLogin.ButtonStart} onPress={() => navigation.replace('DashboardAdmin')}>
                        <Text style={stylesLogin.ButtonStartText}>Masuk Dashboard Admin</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            <View style={stylesLogin.footerLogin}>
                <Text>Belum punya akun ?
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={stylesLogin.textMasukButtom}>Daftar</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ScrollView>
    )
}

export default login;

const stylesLogin = StyleSheet.create({
    login: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    headersTitle: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 70,
    },
    borderBottomTitle: {
        borderWidth: 1.5,
        borderColor: "#259A62",
        borderRadius: 10,
        width: 40,
        marginBottom: 20,
    },
    titles: {
        fontSize: 45,
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
    textMasukButtom: {
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
