import React,  { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Title, RadioButton, Checkbox } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// component
import Header from './component/header'

const penitipanPerhiasan = ({ navigation }) => {

    const [namaPemilik,     setNamaPemilik]     = useState();
    const [nikPemilik,      setNikPemilik]      = useState();
    const [alamatPemilik,   setAlamatPemilik]   = useState();
    const [noPemilik,       setNoPemilik]       = useState();
    const [provinsi,        setProvinsi]        = useState();
    const [kota,            setKota]            = useState();
    const [kodePos,         setKodePos]         = useState();
    const [jenisPerhiasan,  setJenisPerhiasan]  = useState();
    const [beratPerhiasan,  setBeratPerhiasan]  = useState();
    const [note,            setNote]            = useState();
    const [checked,         setChecked]         = useState(false);
    const [kalung,          setKalung]          = useState(false);
    const [gelang,          setGelang]          = useState(false);
    const [cincin,          setCincin]          = useState(false);
 
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
                    <Title style={styles.textTitleTitip}> Penitipan Perhiasan </Title>
                    <View style={styles.borderBtmTitle}></View>

                    <Text style={styles.noteInfoText}>
                        Silakan isikan data dibawah ini untuk melakukan penitipan barang.
                        pastikan data yang kamu isikan merubakan data asli pemilik barang.
                    </Text>

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

                            <Text style={styles.textTitleCheckBox}> Jenis Perhiasan </Text>
                            <View style={styles.rowItems}>
                                <Checkbox
                                    status={ kalung ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setKalung(!kalung);
                                    }} />
                                <Text style={styles.textCheckBox}> Kalung Emas </Text> 
                            </View>
                            <View style={styles.rowItems}>
                                <Checkbox
                                    status={ gelang ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setGelang(!gelang);
                                    }} />
                                <Text style={styles.textCheckBox}> Gelang Emas </Text> 
                            </View>
                            <View style={styles.rowItems}>
                                <Checkbox
                                    status={ cincin ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setCincin(!cincin);
                                    }} />
                                <Text style={styles.textCheckBox}> Cincin Emas </Text> 
                            </View>

                            <TextInput style={styles.textInput} 
                                onChangeText={(beratPerhiasan) =>  setBeratPerhiasan(beratPerhiasan)} 
                                placeholder="Berat Perhiasan" 
                                value={beratPerhiasan} />

                            <TextInput style={[styles.textInput, {textAlignVertical: 'top' }]} 
                                numberOfLines={4}
                                multiline={true}
                                onChangeText={(note) =>  setNote(note)} 
                                placeholder="Catatan" 
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

                            <TouchableOpacity style={styles.ButtonKirim}>
                                <Text style={styles.TextButtonKirim}>Ajukan Penitipan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default penitipanPerhiasan;

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
