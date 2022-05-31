import React,  { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title, RadioButton, Checkbox } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// component
import Header from './component/header'

const penitipanKendaraan = ({ navigation }) => {

    const [userId,          setuserID]          = useState();
    const [namaPemilik,     setNamaPemilik]     = useState("Nestiawan ferdiyanto");
    const [nikPemilik,      setNikPemilik]      = useState("238282828832832832");
    const [alamatPemilik,   setAlamatPemilik]   = useState("Perum Nusantara Permai, Sukabumi");
    const [noPemilik,       setNoPemilik]       = useState("08123123122323");
    const [provinsi,        setProvinsi]        = useState("Lampung");
    const [kota,            setKota]            = useState("Bandar Lampung");
    const [kodePos,         setKodePos]         = useState("34553");
    const [note,            setNote]            = useState("barang harus di jaga dengan baik dan sering di panaskam.");
    const [jenisKendaran,   setJenisKendaran]   = useState();
    const [merekKendaraan,  setMerekKendaraan]  = useState("Honda");
    const [warnaKendaraan,  setWarnaKendaraan]  = useState("Hitam");
    const [typeKendaraan,   setTypeKendaraan]   = useState("Brio");
    const [tahunPembuatan,  setTahunPembuatan]  = useState("2018");
    const [nomorRangka,     setNomorRangka]     = useState("KJS323DSD93958GHDDF");
    const [nomorMesin,      setNomorMesin]      = useState("LLKSD332304I85SDDSD");
    const [nomorPlat,       setNomorPlat]       = useState("BE 33423 AD");
    const [batasPenitipan,  setBatasPenitipan]  = useState(new Date());
    const [mobil,           setMobil]           = useState(true);
    const [motor,           setMotor]           = useState(false);
    const [sepeda,          setSepeda]          = useState(false);
    const [checked,         setChecked]         = useState(false);
    const [validation,      setValidation]      = useState(false);
    const [loadingBtn,      setLoadingBtn]      = useState(false);

    useEffect( () => {

        AsyncStorage.getItem('sessionID').then((id) => {
            if(id){
                setuserID(id);
            }
        });

    }, []);

    const pengajuanKendaraan = async() => {

        if(!userId.trim() && !namaPemilik.trim() && !nikPemilik.trim() && !alamatPemilik.trim() && !noPemilik.trim() && !provinsi.trim() && !kota.trim() && !kodePos.trim() && 
            !note.trim() && !merekKendaraan.trim() && !warnaKendaraan.trim() && !typeKendaraan.trim() && !tahunPembuatan.trim() && !nomorRangka.trim() && !nomorMesin.trim() &&
            !nomorPlat.trim()){

                setValidation(true);
                setLoadingBtn(false)

        } else {
            setValidation(false);
            setLoadingBtn(true);

            if(mobil == true){
                setJenisKendaran('mobil');
            } else if(motor == true) {
                setJenisKendaran('motor');
            } else if(sepeda == true){
                setJenisKendaran('sepeda');
            }

            await fetch("https://tubes-pam-api.herokuapp.com/api/post/kendaraan", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    "user_id"               : userId,
                    "namaPemilik"           : namaPemilik,
                    "NIKPemilik"            : nikPemilik,
                    "alamatRumah"           : alamatPemilik,
                    "noTelfon"              : noPemilik,
                    "provinsi"              : provinsi,
                    "kota"                  : kota,
                    "kodePos"               : kodePos,
                    "jenisKendaraan"        : jenisKendaran,
                    "tahunKendaraan"        : tahunPembuatan,
                    "merekKendaraan"        : merekKendaraan,
                    "warnaKendaraan"        : warnaKendaraan,
                    "typeKendaraan"         : typeKendaraan,
                    "nomorRangkaKendaraan"  : nomorRangka,
                    "nomotMesinKendaraan"   : nomorMesin,
                    "nomotPlatKendaraan"    : nomorPlat,
                    "batasPenitipan"        : batasPenitipan,
                    "catatan"               : note,
                })
            }).then(res => res.json())
            .then(resData => {
                // alert(resData.message);
                Alert.alert(
                    resData.status == true ? "Berhasil" : "Gagal",
                    resData.message,
                );
                setLoadingBtn(false);
                navigation.navigate('Home');
            })
        }

    }

    let [fontsLoad] = useFonts({
        'DM-Sans-Bold': require('.././assets/fonts/DMSans-Bold.ttf'),
        'DM-Sans-Regular': require('.././assets/fonts/DMSans-Regular.ttf'),
    })

    if(!fontsLoad){
        return <AppLoading />
    } else {
        return (
            <ScrollView style={styles.penitianRumah} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}> 
                <Header back="true" nav={navigation} />
                
                <View style={styles.contentTitip}>
                    <Title style={styles.textTitleTitip}> Penitipan Kendaraan </Title>
                    <View style={styles.borderBtmTitle}></View>

                    <Text style={styles.noteInfoText}>
                        Silakan isikan data dibawah ini untuk melakukan penitipan barang.
                        pastikan data yang kamu isikan merubakan data asli pemilik barang.
                    </Text>
                    <Text style={styles.noteInfoText}> Note: Silakan isikan data form bedasarkan STNK kendaraan. </Text>                    

                    <Text> { validation == true ? "Silakan Isi semua datanya" : ""} </Text> 
                    <View style={styles.contentForm}>
                        <View style={styles.contentForm}>
                            <TextInput style={styles.textInput} 
                                onChangeText={(namaPemilik) => setNamaPemilik(namaPemilik) } 
                                placeholder="Nama Pemilik" 
                                value={namaPemilik} />
                            <TextInput style={styles.textInput} 
                                onChangeText={(nikPemilik) => setNikPemilik(nikPemilik) } 
                                placeholder="NIK Pemilik" 
                                value={nikPemilik} />
                            <TextInput style={styles.textInput} 
                                onChangeText={(alamatPemilik) => setAlamatPemilik(alamatPemilik) } 
                                placeholder="Alamat Rumah" 
                                value={alamatPemilik} />
                            <TextInput style={styles.textInput} 
                                onChangeText={(noPemilik) => setNoPemilik(noPemilik)} 
                                placeholder="No Telfon" 
                                value={noPemilik} />
                            <TextInput style={styles.textInput} 
                                onChangeText={(provinsi) => setProvinsi(provinsi)} 
                                placeholder="Provinsi" 
                                value={provinsi} />
                            <TextInput style={styles.textInput} 
                                onChangeText={(kota) => setKota(kota)} 
                                placeholder="Kota" 
                                value={kota} />
                            <TextInput style={styles.textInput} 
                                onChangeText={(kodePos) => setKodePos(kodePos) } 
                                placeholder="Kode Pos" 
                                value={kodePos} />

                            <Text style={styles.textTitleCheckBox}> Jenis Kendaraan </Text>
                            <View style={styles.rowItems}>
                                <Checkbox
                                    status={ mobil ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setMobil(!mobil);
                                    }} />
                                <Text style={styles.textCheckBox}> Mobil </Text> 
                            </View>
                            <View style={styles.rowItems}>
                                <Checkbox
                                    status={ motor ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setMotor(!motor);
                                    }} />
                                <Text style={styles.textCheckBox}> Motor </Text> 
                            </View>
                            <View style={styles.rowItems}>
                                <Checkbox
                                    status={ sepeda ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setSepeda(!sepeda);
                                    }} />
                                <Text style={styles.textCheckBox}> Sepeda </Text> 
                            </View>

                            <TextInput style={styles.textInput} 
                                onChangeText={(merekKendaraan) =>  setMerekKendaraan(merekKendaraan)} 
                                placeholder="Merek Kendaraan" 
                                value={merekKendaraan} />
                            
                            <TextInput style={styles.textInput} 
                                onChangeText={(warnaKendaraan) =>  setWarnaKendaraan(warnaKendaraan)} 
                                placeholder="Warna Kendaraan" 
                                value={warnaKendaraan} />
                            
                            <TextInput style={styles.textInput} 
                                onChangeText={(typeKendaraan) =>  setTypeKendaraan(typeKendaraan)} 
                                placeholder="Type Kendaraan" 
                                value={typeKendaraan} />

                            <TextInput style={styles.textInput} 
                                onChangeText={(tahunPembuatan) =>  setTahunPembuatan(tahunPembuatan)} 
                                placeholder="Tahun Pembuatan Kendaraan" 
                                value={tahunPembuatan} />

                            <TextInput style={styles.textInput} 
                                onChangeText={(nomorRangka) =>  setNomorRangka(nomorRangka)} 
                                placeholder="Nomor Rangka Kendaraan" 
                                value={nomorRangka} />

                            <TextInput style={styles.textInput} 
                                onChangeText={(nomorMesin) =>  setNomorMesin(nomorMesin)} 
                                placeholder="Nomor Mesin Kendaraan" 
                                value={nomorMesin} />

                            <TextInput style={styles.textInput} 
                                onChangeText={(nomorPlat) =>  setNomorPlat(nomorPlat)} 
                                placeholder="Nomor Plat Kendaraan" 
                                value={nomorPlat} />

                            <Text> Batas Penitipan </Text>
                            <DatePicker
                                style={{width: 200}}
                                date={batasPenitipan}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2019-05-01"
                                maxDate="2030-12-30"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(batasPenitipan) => {setBatasPenitipan(batasPenitipan)}}
                            />

                            <TextInput style={[styles.textInput, {textAlignVertical: 'top' }]} 
                                numberOfLines={4}
                                multiline={true}
                                onChangeText={(note) =>  setNote(note)} 
                                placeholder="Catatan Tambahan" 
                                value={note} />
                            
                            <View style={styles.rowItems}>
                                <RadioButton
                                    value="first"
                                    color="#259A62"
                                    status={ checked === true ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked(!checked)}
                                />
                                <Text style={styles.syaratKetentuanText}> Saya setuju dengan ketentuan dan syarat yang berlaku. </Text>
                            </View>

                            <TouchableOpacity style={styles.ButtonKirim} onPress={ () => { pengajuanKendaraan() } }>
                                <Text style={styles.TextButtonKirim}>Ajukan Penitipan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default penitipanKendaraan;

const styles = StyleSheet.create({
    penitianRumah: {
        backgroundColor: '#fff',
        paddingHorizontal: 15, 
    },
    contentTitip: {
        marginTop: 20, 
    },
    textTitleTitip: {
        fontSize: 23,
        fontFamily: 'DM-Sans-Bold',
        paddingLeft: 0,
        marginLeft: 0,
    },
    borderBtmTitle: {
        width:40, 
        borderWidth: 1.4, 
        marginLeft: 5, 
        borderColor: '#259A62',
    },
    noteInfoText: {
        marginLeft: 5, 
        fontSize: 13,
        marginTop: 10, 
        color: '#383838',
    },
    contentForm: {
        marginVertical: 10,
    },
    textInput: {
        borderWidth: 1, 
        borderColor: '#BDBDBD',
        marginVertical: 5, 
        padding: 10,
        borderRadius: 5, 
        fontFamily: 'DM-Sans-Regular',
        fontSize: 16, 
    },
    ButtonKirim: {
        marginVertical: 10, 
        backgroundColor: '#259A62',
        padding: 15,
        borderRadius: 5 
    },
    TextButtonKirim :{
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'DM-Sans-Bold',
        fontSize: 16,
    },
    rowItems: {
        display: 'flex',
        flexDirection: 'row',
        color: '#259A62'
    },
    syaratKetentuanText: {
        marginVertical: 8, 
        fontFamily: 'DM-Sans-Regular',
        fontSize: 13, 
    },
    textTitleCheckBox: {
        fontSize: 16, 
        fontWeight: '700',
        fontFamily: 'DM-Sans-Regular',
        marginVertical: 5, 
    },
    textCheckBox: {
        marginVertical: 7,
        fontSize: 14,
    }
}); 

