//general
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import { Dimensions } from "react-native";
import { Rect } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

//actions

function Dash({ user, navigation }) {

    const urlAvatar = (name, surname) => {
        return 'https://ui-avatars.com/api/?name=' + name + '+' + surname + '&background=FFBD69&color=000'
    }

    const initialState = {
        user: {
            id: null,
            name: null,
            surname: null,
            avatar: null,
        },
        load: 0,
        loading: true
    }
    const [state, setState] = useState(initialState);


    useEffect(() => {
        if (!user) return;
        let data = user;
        data.avatar = user.avatar ? user.avatar : urlAvatar(user.name, user.surname);
        setState(state => {
            return {
                ...state,
                user: data,
                load: state.load + 1
            }
        });
    }, [user]);

    useEffect(() => {
        setState(state => {
            return {
                ...state,
                loading: state.load < 1 ? true : false
            }
        })
    }, [state.load])
    return (
        <React.Fragment>
            <ScrollView style={styles.container}>

                <View style={{ marginBottom: 25, ...styles.row }}>
                    <Text style={{ ...styles.nameMessage, ...styles.textWhite, borderBottomColor: '#E94560', borderBottomWidth: 3 }}>Hola, {state.user.name}</Text>
                </View>

                <View style={{ marginBottom: 25, ...styles.row }}>
                    <Image style={styles.imgProfile} source={{ uri: state.user.avatar }} />
                    <View>
                        <Text style={{ ...styles.textWhite }}>Mi dinero</Text>
                        <Text style={{ ...styles.textWhite, fontSize: 25, fontWeight: 'bold' }}>$0</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 18 }}>General</Text>
                    <View style={{ ...styles.row, justifyContent: 'center' }}>
                        <Link component={TouchableOpacity} to="/">
                            <Text style={{ padding: 10, fontWeight: 'bold', color: false ? '#E94560' : '#000' }}>1D</Text>
                        </Link>
                        <Link component={TouchableOpacity} to="/">
                            <Text style={{ padding: 10, fontWeight: 'bold', color: true ? '#E94560' : '#000' }}>7D</Text>
                        </Link>
                        <Link component={TouchableOpacity} to="/">
                            <Text style={{ padding: 10, fontWeight: 'bold', color: false ? '#E94560' : '#000' }}>1M</Text>
                        </Link>
                        <Link component={TouchableOpacity} to="/">
                            <Text style={{ padding: 10, fontWeight: 'bold', color: false ? '#E94560' : '#000' }}>6M</Text>
                        </Link>
                    </View>
                    <View style={{ ...styles.row, marginLeft: 25, marginBottom: 10, marginRight: 25 }}>
                        <View>
                            <Text style={{ textAlign: 'center', borderBottomColor: '#E94560', borderBottomWidth: 3, marginBottom: 5 }}>Ingresos</Text>
                            <Text style={{ fontWeight: 'bold' }}>$0</Text>
                        </View>
                        <View>
                            <Text style={{ textAlign: 'center', borderBottomColor: '#E94560', borderBottomWidth: 3, marginBottom: 5 }}>Gastos</Text>
                            <Text style={{ fontWeight: 'bold' }}>$0</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: 15 }}>
                        <Link style={styles.buttonStats} component={TouchableOpacity} to="/">
                            <Text style={{ padding: 10, fontWeight: 'bold' }}>
                                <Image style={{ width: 15, height: 15 }} source={require('../../assets/stats-white.png')} />
                            </Text>
                        </Link>
                    </View>
                </View>

                <View style={{ ...styles.row, flexWrap: 'wrap', marginBottom: 20 }}>
                    <Link style={styles.panelButton} component={TouchableOpacity} to="/">
                        <Image style={{ width: 32, height: 32, marginTop: 10, alignSelf: 'center' }} source={require('../../assets/transactions.png')} />
                        <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 10 }}>Movimientos</Text>
                    </Link>
                    <TouchableWithoutFeedback  style={styles.panelButton}
                        onPress={() => navigation.navigate('MisDatos')}
                    >
                        <Image style={{ width: 32, height: 32, marginTop: 10, alignSelf: 'center' }} source={require('../../assets/account.png')} />
                        <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 10 }}>Mis datos</Text>
                    </TouchableWithoutFeedback>


                    <Link style={styles.panelButton} component={TouchableOpacity} to="/">
                        <Image style={{ width: 32, height: 32, marginTop: 10, alignSelf: 'center' }} source={require('../../assets/products.png')} />
                        <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 10 }}>Mis productos</Text>
                    </Link>
                </View>

                <View style={styles.row}>
                    <Link style={styles.buttonTransaction} component={TouchableOpacity} to="/">
                        <Image style={{ width: 32, height: 32, marginTop: 10, alignSelf: 'center' }} source={require('../../assets/send.png')} />
                        <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 15, marginBottom: 15, color: 'white', fontWeight: 'bold' }}>ENVIAR</Text>
                    </Link>
                    <Link style={styles.buttonTransaction} component={TouchableOpacity} to="/">
                        <Image style={{ width: 32, height: 32, marginTop: 10, alignSelf: 'center' }} source={require('../../assets/wallet.png')} />
                        <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 15, marginBottom: 15, color: 'white', fontWeight: 'bold' }}>DEPOSITAR</Text>
                    </Link>
                </View>

            </ScrollView>
            {state.loading && (
                <View style={{ position: 'absolute', top: StatusBar.currentHeight, left: 0, right: 0, bottom: 0, backgroundColor: '#221F3B', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#E94560' />
                    <Text style={{ color: 'white', marginTop: 10 }}>CARGANDO...</Text>
                </View>
            )}
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        backgroundColor: '#221F3B',
    },
    buttonTransaction: {
        width: ((Dimensions.get('window').width - 60) / 2) - 10,
        backgroundColor: '#E94560',
        borderRadius: 5
    },
    panelButton: {
        backgroundColor: 'white',
        width: ((Dimensions.get('window').width - 60) / 3) - 10,
        borderRadius: 5
    },
    buttonStats: {
        backgroundColor: '#E94560',
        borderRadius: 20
    },
    textRight: {
        textAlign: 'right',
    },
    textWhite: {
        color: "#EBEBEB"
    },

    nameMessage: {
        fontSize: 14
    },
    imgProfile: {
        width: 64,
        height: 64,
        borderRadius: 5
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 25
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dash);