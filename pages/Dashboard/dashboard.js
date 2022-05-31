import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// components
import Header from '.././component/header'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const dashboard = ({ navigation }) => {

    const [dataKendaraan, setDataKendaraan] =  useState([]); 
    const [dataKendaraanAcc, setDataKendaraanAcc] =  useState([]); 

    const emptyData = () => {}

    const terima = ($id) => {
        let url = "http://tubes-pam-api.herokuapp.com/api/get/kendaraan/acc/" + $id;

        fetch(url) 
        .then(res => res.json())
        .then( resData => {
            Alert.alert(
                'Berhasil',
                resData.message,
            );
            getData();
            getDataACC();
        });
    }

    const tolak = ($id) => {
        let url = "http://tubes-pam-api.herokuapp.com/api/get/kendaraan/dec/" + $id;

        fetch(url) 
        .then(res => res.json())
        .then( resData => {
            Alert.alert(
                'Berhasil',
                resData.message,
            );
            getData();
            getDataACC();
        });
    }

    const getData = async() => {
        fetch("http://tubes-pam-api.herokuapp.com/api/get/kendaraan/proses") 
        .then(res => res.json())
        .then( resData => {
            setDataKendaraan(resData.data);
        });
    }

    const getDataACC = async() => {
        fetch("http://tubes-pam-api.herokuapp.com/api/get/kendaraan/acc") 
        .then(res => res.json())
        .then( resData => {
            setDataKendaraanAcc(resData.data)
        });
    }

    useEffect(() => {
        getData();
        getDataACC();
    },[]);

    let [fontsLoad] = useFonts({
        'DM-Sans-Bold': require('../.././assets/fonts/DMSans-Bold.ttf'),
        'DM-Sans-Regular': require('../.././assets/fonts/DMSans-Regular.ttf'),
    })
    
    if(!fontsLoad){
        return (
            <AppLoading />
        )
    } else {
        return (
            <ScrollView style={styles.dashboard} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Header nav={navigation} name="Dashbord Admin" />

                <View style={styles.viewPengajuan}> 
                    <Text style={styles.textTitleCard}> Daftar Pengajuan Penitipan </Text>
                    
                    {
                        dataKendaraan.slice(0, 5).map((datasKendaraan, index) => 
                            <View style={styles.viewCard}>
                                <View style={styles.textView}>
                                    <Text style={styles.tagText} > Penitipan Kendaraan </Text>
                                    <Text style={styles.infoBarang} > { datasKendaraan.merekKendaraan } </Text>
                                    <Text style={styles.namaPemilik} > Oleh : { datasKendaraan.namaPemilik } </Text>
                                    <Text style={styles.lamaPenitipan} > Batas Penitipan : { datasKendaraan.batasPenitipan } </Text>
                                </View>
                                <View style={styles.viewButton}>
                                    <TouchableOpacity style={styles.buttonTerima} onPress={() => { terima(datasKendaraan.id) }} >
                                        <Text style={styles.textButton}> Terima </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonTolak} onPress={() => { tolak(datasKendaraan.id) }} >
                                        <Text style={styles.textButton}> Tolak </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonCheck} onPress={ () => { navigation.navigate('viewPengajuan',  { id: datasKendaraan.id, tag: 'kendaraan' }) } }>
                                        <Text style={styles.textButton}> Lihat </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>    
                        )
                    }

                    <TouchableOpacity style={styles.buttonSelengkapnya} onPress={ () => { navigation.navigate('dataPengajuan') }} >
                        <Text style={styles.textSelengkapnya}> Selengkapnya </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewRiwajatPenitipan}> 
                    <Text style={styles.textTitleCard}> Daftar Riwayat Penitipan </Text>
                    
                    {
                        dataKendaraanAcc.slice(0, 5).map((datasKendaraan, index) => 
                            datasKendaraan.status === 'diTerima' ? 
                                <View style={styles.viewCard}>
                                    <View style={styles.textView}>
                                        <Text style={styles.tagText} > Penitipan Kendaraan </Text>
                                        <Text style={styles.infoBarang} > { datasKendaraan.merekKendaraan } </Text>
                                        <Text style={styles.namaPemilik} > Oleh : { datasKendaraan.namaPemilik } </Text>
                                        <Text style={styles.lamaPenitipan} > Batas Penitipan : { datasKendaraan.batasPenitipan } </Text>
                                    </View>
                                    <View style={styles.viewButton}>
                                        <TouchableOpacity style={styles.buttonCheck} onPress={ () => navigation.navigate('viewPembaruan', { id:1, tag: "kendaraan"}) } >
                                            <Text style={styles.textButton}> Perbaharui </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            :  emptyData()
                        )
                    }

                    <TouchableOpacity style={styles.buttonSelengkapnya} onPress={ () => { navigation.navigate('riwayatPenitipan') } }>
                        <Text style={styles.textSelengkapnya}> Selengkapnya </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

export default dashboard;

const styles = StyleSheet.create({
    dashboard:{ 
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
    },
    viewPengajuan :{
        marginVertical: 10,
    },
    textTitleCard: {
        fontSize: 18,
        fontFamily: 'DM-Sans-Regular',
        fontWeight: '700',
        marginBottom: 10,
    },
    viewRiwajatPenitipan: {
        marginVertical: 10,
    },  
    viewCard: {
        backgroundColor: '#F3F3F3',
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: '#E6E6E6',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    textView:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    tagText: {
        fontFamily: 'DM-Sans-Regular',
        fontSize: 12,
    },
    infoBarang: {
        fontSize: 18,
        fontFamily: 'DM-Sans-Bold',
        fontWeight: '600',
        marginVertical: 5,
    },
    namaPemilik: {
        fontSize: 12,
        fontFamily: 'DM-Sans-Regular',
        marginBottom: 3,
    },
    lamaPenitipan: {
        fontSize: 12,
        fontFamily: 'DM-Sans-Regular',
    },
    viewButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textButton: {
        color: '#ffffff',
        fontFamily: 'DM-Sans-Regular',
        textAlign: 'center',
        fontSize: 12,
    },  
    buttonTerima: {
        padding: 7,
        backgroundColor: '#259A62',
        borderRadius: 6,
        marginVertical: 2,
    },
    buttonTolak: {
        padding: 7,
        backgroundColor: '#A53939',
        borderRadius: 6,
        marginVertical: 2,
    },
    buttonCheck: {
        padding: 7,
        backgroundColor: '#3B6DAE',
        borderRadius: 6,
        marginVertical: 2,
    },
    buttonSelengkapnya: {
        marginVertical: 10,
    },
    textSelengkapnya: {
        fontFamily: 'DM-Sans-Regular',
        color: '#3B6DAE',
    }
});
