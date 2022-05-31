import React, { useState, useEffect } from 'react';

import { Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Avatar } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// components
import Header from './component/header'

const homeScreen = ({ navigation }) => {

    const [nameSession, sessionNama]        =  useState('');
    const [idSession, setIDSession]         =  useState('');
    const [dataKendaraan, setDataKendaraan] =  useState([]);    

    useEffect(() => {
        AsyncStorage.getItem('sessionNama').then((name) => {
            if (name) {
                sessionNama(name);
            }
        });
        AsyncStorage.getItem('sessionID').then((id) => {
            if(id){
                setIDSession(id);
            }
        });

        let url = "https://tubes-pam-api.herokuapp.com/api/get/kendaraan/" + idSession;

        fetch(url) 
        .then(res => res.json())
        .then( resData => {
            setDataKendaraan(resData.data);
        });
    });

    let [fontsLoad] = useFonts({
        'DM-Sans-Bold': require('.././assets/fonts/DMSans-Bold.ttf'),
        'DM-Sans-Regular': require('.././assets/fonts/DMSans-Regular.ttf'),
    })

    if (!fontsLoad) {
        return (
            <AppLoading />
        )
    } else {
        return (
            <ScrollView style={styles.home} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Header nav={navigation} />
                <View style={styles.HelloUser}>
                    <Text style={styles.textHi}>Hi, {nameSession}</Text>
                    <Text style={styles.textDoing}>Apa yang ingin kamu lakukan hari ini ?</Text>
                </View>
                <View style={styles.TitipHistory}>
                    <Text style={styles.textTitip}>Barang apa yang ingin kamu titipkan ?</Text>
                    <ScrollView style={styles.Titip} horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={styles.cardTitip} onPress={() => navigation.navigate('FromPenitipanRumah')}>
                            <Image style={styles.iconTitip} source={require('../assets/home.png')} />
                            <Text>Rumah</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardTitip} onPress={() => navigation.navigate('FromPenitipanPerhiasan')}>
                            <Image style={styles.iconTitip} source={require('../assets/diamond.png')} />
                            <Text>Perhiasan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardTitip} onPress={() => navigation.navigate('FromPenitipanKendaraan')}>
                            <Image style={styles.iconTitip} source={require('../assets/car.png')} />
                            <Text>Kendaraan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardTitip} onPress={() => navigation.navigate('FromPenitipanBarang')}>
                            <Image style={styles.iconTitip} source={require('../assets/box.png')} />
                            <Text>Barang</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.History}>
                        <Text style={styles.textTitip}>Barang yang kamu titipkan</Text>
                        <View style={styles.history}>
                            { 
                                (dataKendaraan !== null) ? 
                                    dataKendaraan.map((datasKendaraan, index) => 
                                        <TouchableOpacity style={styles.cardHistory} onPress={() => { navigation.navigate('ViewHistory', { idKendaraan: datasKendaraan.id, tag: 'kendaraan' }) }}>
                                            <Image style={styles.imgHistory} source={{ uri: 'https://picsum.photos/200/300' }} />
                                            <View style={styles.textCardHistory}>
                                                <Text style={styles.textHistoryTag}>#Kendaraan</Text>
                                                <Text style={styles.textHistoryTitle}> { datasKendaraan.namaPemilik } </Text>
                                                <Text style={styles.textHistoryLocation}>{ datasKendaraan.provinsi }, { datasKendaraan.kota }</Text>
                                                <Text style={styles.textHistoryTime}>Lama Waktu : { datasKendaraan.batasPenitipan } </Text>
                                                <Text style={styles.textStatus}>Status : { datasKendaraan.status } </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                : <Text>null</Text>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default homeScreen;

const styles = StyleSheet.create({
    AppBar: {
        backgroundColor: '#fff'
    },
    home: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff'
    },
    HelloUser: {
        marginTop: 25,
        marginBottom: 30,
    },
    textHi: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'DM-Sans-Regular',
    },
    textDoing: {
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'DM-Sans-Bold'
    },
    textTitip: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: 'DM-Sans-Bold',
        marginBottom: 10,
    },
    Titip: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 17,
    },
    alertText:{
        display: 'flex',  
        fontFamily: 'DM-Sans-Regular',
        fontSize: 16,
        color: '#882D2D',
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20,     
        alignItems: 'center', 
        justifyContent: 'center',
    },
    history: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 17,
    },
    cardTitip: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 5,
        backgroundColor: '#f4f4f4',
        paddingVertical: 15,
        paddingHorizontal: 20,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        fontSize: 11.5,
        elevation: 1.55,
        shadowColor: '#efefef',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        marginBottom: 5,
    },
    iconTitip: {
        width: 50,
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
    },
    cardHistory: {
        width: '47.2%',
        height: 'auto',
        // backgroundColor: '#e8e8e8',
        borderRadius: 10,
        textAlign: 'left',
        marginRight: 10,
        marginTop: 10
    },
    imgHistory: {
        // width: 180,
        resizeMode: 'cover',
        height: 120,
        borderRadius: 10,
    },
    textHistory: {
        marginVertical: 6,
        marginHorizontal: 3
    },
    textCardHistory: {
        marginVertical: 10,
    },
    textHistoryTag: {
        fontFamily: 'DM-Sans-Regular',
        fontSize: 13,
        marginBottom: 5,
        color: '#259A62'
    },
    textHistoryTitle: {
        fontWeight: '700',
        fontSize: 17,
        fontFamily: 'DM-Sans-Bold',
    },
    textHistoryLocation: {
        fontWeight: '500',
        fontSize: 14,
        fontFamily: 'DM-Sans-Regular',
    },
    textHistoryTime: {
        marginTop: 10,
        fontFamily: 'DM-Sans-Regular',
        marginBottom: 0
    },
    textStatus: {
        fontFamily: 'DM-Sans-Regular',
    }
})