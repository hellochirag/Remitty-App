/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid,
    AsyncStorage,
    FlatList,
    TouchableHighlight
} from 'react-native';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
import GradiantButton from '../componentItem/gradiantButton'
import SelectButton from '../componentItem/selectButton'
import TextIconButtonSnd from '../componentItem/send/IconTextButton'
import TextButton from '../componentItem/send/TextButton'
import InputText from '../componentItem/Offer/InputText'
import InputTextSnd from '../componentItem/send/InputText'

import bitcoinIcon from '../../assets/images/bitcoin.png';
import ethIcon from '../../assets/images/eth.png';
import RemityIcon from '../../assets/images/R.png';
import ArroryIcon from '../../assets/images/arrowdown.png';
import ExchangeIcon from '../../assets/images/exchange.png';
import litecoinIcon from '../../assets/images/litecoin.png';
import { Dropdown } from 'react-native-material-dropdown';
import Contacts from 'react-native-contacts';
import Autocomplete from 'react-native-autocomplete-input';
import ContactsWrapper from 'react-native-contacts-wrapper';

import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';
import {
    Content,
    Container
} from 'native-base';

const countries = [{
    value: 'Ghana(Ghana mobile money)'
}, {
    value: 'Kenya(Mpesa)'
}, {
    value: 'Tanzania(Mpesa)'
}, {
    value: 'Rwanda(Rwanda mobile money)'
}, {
    value: 'Nigeria(Account Bank)'
}, {
    value: 'Uganda(Uganda mobile money)'
}];
const operators = [{
    value: 'MTN'
}, {
    value: 'MPS'
}];
const currencies = [{
    value: 'USD'
}, {
    value: 'GBP'
}, {
    value: 'EUR'
}, {
    value: 'BTC(Bitcoin)'
}, {
    value: 'LTC(Litecoin)'
}, {
    value: 'ETH(Ethereum)'
}];
const currency_gets = ['GHS', 'KES', 'TZS', 'RWF', 'NGN', 'UGX'];
const exchange_currency = require('../../assets/images/exchange_currency.png');
export default class currencyWithdraw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operators: operators,
            currency_get: 'GHS',
            currency: 'USD',
            account_bank: 'MTN',
            balance_btc: '0.0',
            balance_eth: '0.0',
            balance_ltc: '0.0',
            recipient_get: '0.0',
            sedd: false,
            country: 'Ghana(Ghana mobile money)',
            r_name: 0,
            r_account: 0,
            r_amount: 0,
            selectedIndex: 0,
            currency: '',
            rate: '0.0',
            balance: 0,
            showme: true,
            user_id: 0,
            requestdetail: [],
            contacts: [],
            query: '',
            text: "Choose Recipients"
        };

        this.myTextInput = React.createRef();

        try {
            fetch(Constant.token_url, {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.paylist(res.token);
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }

    }
    componentDidMount() {
        this.initialize();
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.'
            }
        ).then(() => {
            Contacts.getAll((err, contacts) => {
                if (err === 'denied') {
                    // error
                } else {
                    // contacts returned in Array
                    this.setState({ contacts });
                }
            })
        })
    }
    initialize = async () => {
        this.setState({
            user_id: await AsyncStorage.getItem('user_id')
        })
    }
    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showme: false
            })
        }, 3000)
        const url = 'https://api.ravepay.co/v2/banks/NG?public_key=FLWPUBK_TEST-fc1356183ca31a6b449d32d06aadf597-X'
        // try {
        //     fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //     }).then((response) => response.json())
        //         .then((res => {
        //             if (res.status == 'success') {
        //                 // alert(res.data.Banks[0].Code);
        //                 let bank_codes = [];
        //                 let bank_names = [];
        //                 for (let i = 0; i < res.data.Banks.length; i++) {
        //                     bank_codes.push(res.data.Banks[i].Code);
        //                     bank_names.push({ value: res.data.Banks[i].Name });
        //                 }
        //                 this.setState({
        //                     bank_codes: bank_codes,
        //                     bank_names: bank_names
        //                 })
        //             }
        //             else {
        //                 alert(JSON.stringify(res));
        //             }
        //         })
        //         );
        // }
        // catch (e) {
        //     alert(e)
        // }

    }
    // onButtonPressed() {
    //     ContactsWrapper.getContact()
    //     .then((contact) => {
    //     this.setState({r_account:contact.phone});
    //     this.setState({text:contact.name});
    //     })
    //     .catch((error) => {
    //     console.log("ERROR CODE: ", error.code);
    //     console.log("ERROR MESSAGE: ", error.message);
    //     });
    // }
    gowithfee = () => {
        if (this.state.r_amount == 0 || this.state.r_account == 0) { alert('input full data'); return; }
        try {
            this.setState({
                showme: true
            })
            fetch(Constant.token_url, {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.request(res.token);
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }

    }
    gettoken = () => {
        if (this.state.r_amount == 0 || this.state.r_account == 0) { alert('input full data'); return; }
        try {
            this.setState({
                showme: true
            })
            fetch(Constant.token_url, {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        this.request(res.token);
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }

    }
    paylist = (token) => {
        try {
            fetch(Constant.req_url + "getpayrequests", {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    user_id: this.state.user_id,
                    id: this.props.navigation.getParam('id', 'BTC'),
                }),
            }).then((response) => response.json())
                .then((res => {

                    if (res.status) {
                        if (typeof res.result[0].method != 'undefined') {
                            var curs = res.result[0].method.split('_');
                            var curr = curs[0];
                        }
                        else {
                            var curr = 'BTC';
                        }
                        this.setState({ requestdetail: res.result[0], r_amount: res.result[0].amount, r_account: res.result[0].phonenum, currency: curr });
                        console.log(this.state.r_amount);
                        console.log(this.state.r_account);
                        this.gettoken('balance');
                    }
                    else {
                        alert(JSON.stringify(res));
                        this.props.navigation.navigate('payList')
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }
    }
    balance = (token) => {
        try {
            fetch(Constant.req_url + "getparticularbalance", {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    currency: this.state.currency,
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {

                        this.setState({ balance: parseFloat(res.result).toFixed(8) });
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }
    }

    cancel = (token) => {
        try {
            fetch(Constant.req_url + "cancelpay", {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    id: this.props.navigation.getParam('id', 'BTC'),
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {

                        this.props.navigation.navigate('payList')
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }
    }
    gettoken = (name) => {
        try {
            fetch(Constant.token_url, {
                method: 'POST',
                body: JSON.stringify({
                    email: Constant.authemail,
                    password: Constant.authpass,
                }),
            }).then((response) => response.json())
                .then((res => {
                    if (res.status) {
                        if (name == 'balance') {
                            this.balance(res.token);
                        }
                        if (name == 'cancel') {
                            this.cancel(res.token);
                        }
                    }
                    else {
                        alert(JSON.stringify(res));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }
    }
    request = (token) => {
        if (this.state.r_amount == 0 || this.state.r_account == 0) { alert('input full data'); return; }
        try {
            fetch(Constant.req_url + "pay", {
                method: 'POST',
                body: JSON.stringify({
                    phone_number: this.state.r_account,
                    amount: this.state.r_amount,
                    user_id: this.state.user_id,
                    currency: this.state.currency,
                    id: this.props.navigation.getParam('id', 'BTC'),
                    token: token
                }),
            }).then((response) => response.json())
                .then((res => {
                    this.setState({
                        showme: false
                    })
                    if (res.status) {
                        //this.request(res.token);
                        alert(res.result);
                        this.gettoken('balance');
                        this.setState({
                            r_amount: '',
                            r_account: ''
                        });
                    }
                    else {
                        alert(JSON.stringify(res.message));
                    }
                })
                );
        }
        catch (e) {
            alert(e)
        }

    }

    findFilm(query) {
        //method called everytime when we change the value of the input
        if (query === '') {
            //if the query is null then return blank
            return [];
        }

        const { contacts } = this.state;
        //making a case insensitive regular expression to get similar value from the film json
        const regex = new RegExp(`${query.trim()}`, 'i');
        //return the filtered film array according the query from the input
        return contacts.filter(film => film.phoneNumbers[0].number.search(regex) >= 0);
        console.log(this.state.requestdetail);
    }

    render() {
        let { balance_btc } = this.state;
        let { balance_eth } = this.state;
        let { balance_ltc } = this.state;
        // let { currency } =  this.state.requestdetail.method.split("_");;
        const { query } = this.state;
        const contacts = this.findFilm(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        // this.state.currency = currency[0];
        return (
            <View style={styles.container}>
                {
                    this.state.showme ? <ActivityIndicator style={{ flex: 1 }} size="large" /> :

                        <Content style={{ width: '100%' }}>

                            <Text style={[styles.title, { marginTop: 25 }]}>{this.state.currency} Request </Text>

                            <View style={{
                                textAlign: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', width: '90%', height: 90, elevation: 5, shadowOffset: { height: 2 },
                                shadowOpacity: 0.3, marginTop: 15, marginBottom: 20, borderWidth: 1,
                                borderColor: 'rgba(240,240,240,0.8)', alignSelf: 'center'
                            }}>
                                <Text style={{ fontWeight: "200", fontSize: 18, color: '#1A1F84', marginTop: 5 }}>Available Balance</Text>
                                <Text style={{ fontWeight: "400", fontSize: 20, color: 'black', marginTop: 5 }}>{this.state.balance + ' ' + this.state.currency}</Text>
                            </View>



                            <InputText
                                style={{ alignSelf: 'center', }}
                                txtplaceholder="Account"
                                onChangeText={(r_account) => this.setState({ r_account })}
                                value={this.state.r_account}
                            />

                            <InputText
                                style={{ alignSelf: 'center', }}
                                txtplaceholder="Amount"
                                onChangeText={(r_amount) => this.setState({ r_amount })}
                                value={this.state.r_amount}
                            />
                            <GradiantButton
                                style={{ width: 200 }}
                                textIndo="Pay"
                                onPress={() => this.gowithfee()}
                            />

                            <GradiantButton
                                style={{ width: 200 }}
                                textIndo="Cancel"
                                onPress={() => this.gettoken('cancel')}
                            />

                        </Content>
                }
                <Header navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    send_part: {
        flexDirection: 'row',
        marginTop: 20,
        width: '80%',
        height: 70,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        alignSelf: 'center',
        elevation: 3,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
    },
    destext: {
        marginTop: 25,
        alignSelf: 'center',
        color: 'black',
        fontSize: 15,

    },
    countries: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        padding: 0,
        borderRadius: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
    },
    texttop: {
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 15,
        flexDirection: 'row'
    },
    textamount: {
        marginTop: 5,
        color: 'rgb(0, 0, 0)',
        textAlign: 'left',
        fontSize: 15,
        padding: 5
    },
    textunder: {
        color: 'rgb(0, 0, 0)',
        textAlign: 'center',
        fontSize: 15,
        marginRight: 5
    },
    topitems: {
        width: '80%',
        paddingTop: 25,
        paddingLeft: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 20,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'rgba(240,240,240,0.8)',
        borderWidth: 1,
        flexDirection: 'row',
        height: 70,
    },
    amountcontainer: {
        width: '90%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        // marginHorizontal: 3,
        marginTop: 5,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        //marginHorizontal:15,
        elevation: 3,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
        backgroundColor: 'white',
        padding: 0
    },
    selectcountry: {
        flexDirection: 'row',
        marginTop: 20,
        width: '80%',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 3,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
        alignSelf: 'center'
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    containerSub: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        fontWeight: "bold",
        color: 'green'
    },
    txtsub: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        fontWeight: "600",
        color: 'black'
    },
    textcontainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: '80%',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        paddingLeft: 10,
        elevation: 2,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(240,240,240,0.8)',
    },
});
