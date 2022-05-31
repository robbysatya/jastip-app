import React, { useState, useEffect } from 'react';
import { Platform, ImageBackground,  ScrollView, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import Header from './component/header'

const Profile = ({ navigation }) => {

    const [nameSession, sessionNama] =  useState('');

    useEffect(() => {
        AsyncStorage.getItem('sessionNama').then((name) => {
            if(name){
                sessionNama(name);
            }
        });
    }, []);

    let [fontsLoad] = useFonts({
        'DM-Sans-Bold': require('.././assets/fonts/DMSans-Bold.ttf'),
        'DM-Sans-Regular': require('.././assets/fonts/DMSans-Regular.ttf'),
    })

    const _logout = async() => {
        await AsyncStorage.clear();
        navigation.replace('Login');
    }
    
    if(!fontsLoad){
        return (
            <AppLoading />
        )
    } else {
        return (
            <ScrollView style={styles.profile} >
                <Header back="true" name="Profile" nav={navigation} profile="true" />
                
                <ImageBackground 
                    style={styles.imgBackground} 
                    blurRadius={4} 
                    imageStyle={styles.backgroundStylesIMG} 
                    source={ require('../assets/background/pexels747964.jpg') }>
                    <View style={styles.backgroundTransparent}>
                        <Image style={styles.imagesProfile} source={ require('../assets/profile_user/man.jpg') } />
                        <Text style={styles.textProfile}> { nameSession } </Text> 
                        <Text style={styles.textProfileDom}> Bandar Lampung - Lampung </Text>
                        <TouchableOpacity style={styles.editProfile}>
                            <Text style={styles.textEditProfile}> Perbarui </Text> 
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.cardJumPenitipan}>
                    <TouchableOpacity style={styles.btnBrngTitip}>
                        <Text style={styles.titleCard}> 5 </Text> 
                        <Text style={styles.textInfoCard}> Barang yang Dititipkan </Text> 
                    </TouchableOpacity>
                    <View style={styles.borderCard}></View>
                    <TouchableOpacity style={styles.btnBrngTitip}>
                        <Text style={styles.titleCard}> 16 </Text> 
                        <Text style={styles.textInfoCard}> Riwayat Penitipan </Text> 
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonLogout} onPress={() => { _logout() }}>
                    <Text style={styles.textLogout}> Keluar </Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default Profile;

const styles = StyleSheet.create({
    profile:{
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
    },
    imgBackground: {
        marginVertical: 15,
        resizeMode: 'cover',
        height: 280, 
        position: 'relative',
        borderRadius: 100,
    },
    backgroundStylesIMG: {
        borderRadius: 20,
    },
    imagesProfile: {
        width: 110, 
        height: 110, 
        borderRadius: 100,
    },
    backgroundTransparent :{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20, 
    },
    textProfile: {
        fontSize: 18, 
        fontWeight: '700',
        fontFamily: 'DM-Sans-Bold',
        color: '#ffffff',
        marginTop: 15,
    },
    textProfileDom: {
        color: '#ffffff',
        fontSize: 12, 
        fontFamily: 'DM-Sans-Regular',
    },
    cardJumPenitipan: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    borderCard: {
        borderWidth: 1,
        height: 65,
        borderRadius: 5, 
        borderColor: '#D3D3D3',
        marginVertical: 15, 
    },
    btnBrngTitip: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',  
        width: '48%'
    },
    titleCard: {
        fontSize: 23, 
        fontFamily: 'DM-Sans-Bold',
        fontWeight: '700',
        color: '#3C3C3C',
    },
    textInfoCard: {
        fontSize: 13, 
        fontFamily: 'DM-Sans-Regular',
        marginTop: 7, 
    },
    textEditProfile:{ 
        fontSize: 17,
        fontFamily: 'DM-Sans-Bold',
        color: '#34A7FF',
        fontWeight: '700',
    },
    editProfile: {
        marginVertical: 5, 
    },
    buttonLogout: {
        marginVertical: 20,
        padding: 13, 
        borderWidth: 1.3,
        borderColor: '#AF4F4F',
        backgroundColor: '#CC4949',
        borderRadius: 7, 
    },
    textLogout: {
        fontSize: 17,
        fontFamily: 'DM-Sans-Bold',
        color: '#FFFFFF',
        textAlign: 'center',
    }
});