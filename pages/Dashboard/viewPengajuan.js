import React, { useState, useEffect } from 'react';
import { Caption } from 'react-native-paper';
import { Platform, ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// components
import Header from '.././component/header'

const viewPengajuan = ({ navigation }) => {

    const [dataKendaraan, setDataKendaraan] =  useState([]); 

    useEffect(() => {
        let url = "https://tubes-pam-api.herokuapp.com/api/get/kendaraan/view/" + navigation.getParam('id');

        fetch(url) 
        .then(res => res.json())
        .then( resData => {
            setDataKendaraan(resData.data);
        });
    });

    const terima = ($id) => {
        let url = "http://tubes-pam-api.herokuapp.com/api/get/kendaraan/acc/" + $id;

        fetch(url) 
        .then(res => res.json())
        .then( resData => {
            Alert.alert(
                'Berhasil',
                resData.message,
            );
            
            navigation.navigate('dataPengajuan', {refresh: true})
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
            
            navigation.goBack({ refresh: "true" });
        });
    }

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
            <ScrollView style={styles.viewPengajuan} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Header back="true" nav={navigation} name="Pengajuan" />
                
                <View style={styles.headerHistory}>
                    <Image style={styles.imgCoverHistory} source={{ uri: 'https://picsum.photos/200/300' }} />
                    <Caption style={styles.tagHistory}> #{ navigation.getParam('tag') } </Caption>
                    <Text style={styles.titleHistory}> { dataKendaraan.namaPemilik } </Text>
                    <Text style={styles.duraion}>Durasi Penitipan : { dataKendaraan.batasPenitipan } </Text>
                    <Text style={styles.duraion}>Alamat :  { dataKendaraan.alamatRumah } - {dataKendaraan.provinsi} - {dataKendaraan.kota} </Text>
                    <Text style={styles.duraion}>Status : { dataKendaraan.status } </Text>
                    <Text style={styles.duraion}>Konfirmasi : { dataKendaraan.confirmed == false ? "Belum Disetujui" : "Telah diSetuji" } </Text>
                    <Text style={styles.duraion}></Text>

                    {
                        (navigation.getParam('tag') == "kendaraan") ?
                            <View>
                                <Text style={styles.titleHistory}> Info { navigation.getParam('tag') } </Text>
                                <Text style={styles.duraion}>Jenis Kendaraan : { dataKendaraan.dataKendaraan } </Text>
                                <Text style={styles.duraion}>Merek Kendaraan : { dataKendaraan.merekKendaraan } </Text>
                                <Text style={styles.duraion}>Warna Kendaraan : { dataKendaraan.warnaKendaraan } </Text>
                                <Text style={styles.duraion}>Type Kendaraan : { dataKendaraan.typeKendaraan } </Text>
                                <Text style={styles.duraion}>Tahun Kendaraan : { dataKendaraan.tahunKendaraan } </Text>
                                <Text style={styles.duraion}>Nomor Rangka Kendaraan : { dataKendaraan.nomorRangkaKendaraan } </Text>
                                <Text style={styles.duraion}>Nomor Mesin Kendaraan : { dataKendaraan.nomotMesinKendaraan } </Text>
                                <Text style={styles.duraion}>Nomor Plat Kendaraan : { dataKendaraan.nomotPlatKendaraan } </Text>
                            </View>
                        : ""
                    }
                </View>
                <View style={styles.deskripsi}>
                    <Text style={styles.titleDeskripsi}> Deskripsi </Text>
                    <Text style={styles.deskripsiContent}>
                        { dataKendaraan.catatan }
                    </Text>
                </View>

                <View style={styles.cardAcc}>
                    <Text style={styles.textAcc}> Apakah kamu ingin menerima permintaan ini ?  </Text>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.buttonTolak} onPress={ () => { tolak(dataKendaraan.id) } } >
                            <Text style={styles.textButton}> Tolak </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonTerima} onPress={ () => { terima(dataKendaraan.id) } } >
                            <Text style={styles.textButton}> Terima </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default viewPengajuan;

const styles = StyleSheet.create({
    viewPengajuan: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        position: 'relative',
    },
    imgCoverHistory: {
        resizeMode: 'cover',
        height: 250, 
        borderRadius: 10,
    },
    tagHistory: {
        color: '#259A62',
        fontWeight: '700',
        fontSize: 14,
        marginTop: 15,
        marginLeft: 5, 
    },
    titleHistory: {
        marginBottom: 5,
        fontWeight: '700',
        fontSize: 24, 
        fontFamily: 'DM-Sans-Bold',
    },
    headerHistory: {
        marginTop: 20, 
    },
    duraion: {
        fontFamily: 'DM-Sans-Regular',
        marginLeft: 7, 
        fontSize: 14, 
    },
    address:{
        fontFamily: 'DM-Sans-Regular',
        marginLeft: 7, 
        fontSize: 14,
        marginTop: 5, 
    },
    deskripsi: {
        marginVertical: 25, 
    },
    titleDeskripsi: {
        fontFamily: 'DM-Sans-Bold',
        fontSize: 24,
        marginBottom: 10,
    },
    deskripsiContent: {
        marginLeft: 5, 
    },
    cardAcc: {
        backgroundColor: '#FFFFFF',
        marginVertical: 10, 
        padding: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        marginBottom: 40,
    },
    textAcc: {
        fontSize: 16,
        fontFamily: 'DM-Sans-Regular',
        marginBottom: 5,
    },
    button:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonTerima: {
        padding: 10, 
        margin: 10,
        backgroundColor: '#259A62',
        borderRadius: 7, 
        width: '35%'
    },
    buttonTolak: {
        padding: 10, 
        margin: 10,
        backgroundColor: '#A53939',
        borderRadius: 7, 
        width: '35%'
    },
    textButton: {
        textAlign: 'center',
        fontFamily: 'DM-Sans-Regular',
        fontWeight: '600',
        color: '#ffffff',
        fontSize: 15,
    }
})
