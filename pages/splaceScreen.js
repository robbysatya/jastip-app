import React, { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const splaceScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        'DM-Sans-Bold': require('.././assets/fonts/DMSans-Bold.ttf'),
        'DM-Sans-Regular': require('.././assets/fonts/DMSans-Regular.ttf')
    })

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login')
        }, 2000)
    }, []);

    if (!fontsLoaded) {
        return (
            <AppLoading />
        );
    } else {
        return (
            <View style={styles.content}>
                <Image
                    source={require('.././assets/logo.png')}
                    style={{ width: 95, height: 150 }}
                />
                <Text style={styles.title}> Jastip </Text>
                <View style={styles.borderBottomTitle}></View>
                <Text style={styles.paragraph}> Titip Barangmu tanpa Khawatir akan kehilangan atau kerusakan </Text>
            </View>
        )
    }
};

export default splaceScreen;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'DM-Sans-Bold'
    },
    title: {
        fontSize: 55,
        color: "#259A62",
        fontWeight: "700",
        marginBottom: 5,
    },
    borderBottomTitle: {
        borderWidth: 1.5,
        borderColor: "#259A62",
        borderRadius: 10,
        width: 40,
        marginBottom: 20,
    },
    paragraph: {
        width: 230,
        textAlign: "center",
        color: "#606060",
        fontFamily: 'DM-Sans-Regular'
    },
    ButtonStart: {
        marginTop: 50,
        padding: 10,
        borderWidth: 1.3,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        borderColor: '#259A62',
        backgroundColor: '#259A62',
    },
    ButtonStartText: {
        color: '#ffffff',
        fontSize: 16,
        letterSpacing: 1.2,
        fontWeight: '600',
        fontFamily: 'DM-Sans-Regular'
    }
});
