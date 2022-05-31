import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Title, Caption } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// components
import Header from '.././component/header'

const viewPembaruan = ({ navigation }) => {

    const [dataKendaraan, setDataKendaraan] =  useState([]);    

    useEffect(() => {
        // let url = "https://tubes-pam-api.herokuapp.com/api/get/kendaraan/view/" + navigation.getParam('idKendaraan');
        let url = "https://tubes-pam-api.herokuapp.com/api/get/kendaraan/view/1";

        fetch(url) 
        .then(res => res.json())
        .then( resData => {
            setDataKendaraan(resData.data);
        });
    });

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
            <ScrollView style={styles.viewHistory} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Header back="true" nav={navigation} name="Penitipan" />
                
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

                <View style={styles.history}>
                    <Text style={styles.titleHistoryPenitipan}> History Penitipan </Text>

                    <View style={styles.listHistory}>
                        <View style={styles.budleHistory}>
                            <View style={styles.borderLefthostiry} />
                        </View>
                        <View>
                            <Text style={styles.durationHistoryP}> 12 May 2021 </Text>
                            <Text style={styles.messagehistory}> Melakukan pengecekan kondisi awal rumah </Text>
                        </View>
                    </View>

                    <View style={styles.listHistory}>
                        <View style={styles.budleHistory} />
                        <View>
                            <Text style={styles.messagehistory}> Selesai </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default viewPembaruan;

const styles = StyleSheet.create({
    viewHistory: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
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
    titleHistoryPenitipan: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'DM-Sans-Bold',
        marginBottom: 10, 
    },
    history:{
        marginBottom: 50, 
    },
    listHistory: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10, 
    },
    budleHistory: {
        width: 15, 
        height: 15, 
        borderRadius: 50, 
        backgroundColor: '#259A62',
        marginRight: 10, 
        marginLeft: 5,
        display: 'flex',
        flexDirection: 'column',
    },
    borderLefthostiry: {
        width: 4, 
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#259A62',
        marginLeft: 5,
        borderRadius: 5, 
    },
    durationHistoryP: {
        marginBottom: 5, 
        fontSize: 14, 
        fontFamily: 'DM-Sans-Regular',
        fontWeight: '600',
    },
    messagehistory: {
        fontSize: 16, 
        fontFamily: 'DM-Sans-Regular',
        fontWeight: '700',
    }
})