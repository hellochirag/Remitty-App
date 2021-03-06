import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Alert
} from 'react-native';
import {
    Content,
    Icon,
    Container
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import initial from '../../assets/images/ic_initial.png';
import stringsoflanguages from './stringsoflanguages';
import Header from '../componentItem/Header/Header'
import Constant from '@common/Constant';
const LW = Constant.window.width;
const LH = Constant.window.height;
const MH = Constant.menuHeight;
const options = {
    title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            firstname: '',
            lastname: '',
            email: '',
            phonenum: '',
        }
    }
    componentDidMount() {
        this.initialize()
    }
    someFunction = () => {
        fetch('https://rest.nexmo.com/sms/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: '705d7e8b',
                api_secret: 'zfmAPyzeIgo4QoLw',
                to: '15204063923',
                from: '12404892305',
                text: 'Hello Brian from Jin'
            })
            ,
        }).then((response) => response.json())
            .then((res => {
                alert(JSON.stringify(res));
            })
            ).catch((error) => {
                alert(JSON.stringify(error))
            });
    }
    initialize = async () => {
        this.setState({
            firstname: await AsyncStorage.getItem('username'),
            lastname: await AsyncStorage.getItem('lastname'),
            email: await AsyncStorage.getItem('email'),
            phonenum: await AsyncStorage.getItem('phonenum'),
        });
    }
    getImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    render() {
        let {
            avatarSource,
            firstname,
            lastname
        } = this.state;
        return (
            <View style={styles.container}>
                <Content style={{ width: '100%' }}>
                    <View style={[styles.itembuttoncontainer,
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }]}>
                        <TouchableOpacity onPress={() => this.getImage()} style={styles.imagebutton}>
                            <Image source={avatarSource == null ? initial : avatarSource} style={styles.imagepart} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <Text style={styles.titletext}>
                            {firstname + " " + lastname}
                        </Text>
                    </View>
                    <View style={styles.hori_line1}></View>
                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('FriendList') }} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                            {stringsoflanguages.InviteFriends}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{ height: 30 }}></View>
                    <View style={styles.itembuttoncontainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Personal')} style={styles.addbtn}>
                            <Text style={styles.addtext}>
                                {stringsoflanguages.Personal}
                            </Text>
                            <Icon name="account-box" type="MaterialIcons" style={styles.addicon} />
                        </TouchableOpacity>
                        <View style={styles.hori_line}></View>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <TouchableOpacity style={styles.addbtn}>
                            <Text style={styles.addtext}>
                                {stringsoflanguages.Notifications}
                            </Text>
                            <Icon name="notifications-active" type="MaterialIcons" style={styles.addicon} />
                        </TouchableOpacity>
                        <View style={styles.hori_line}></View>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <TouchableOpacity style={styles.addbtn}>
                            <Text style={styles.addtext}>
                                {stringsoflanguages.Merchant}
                            </Text>
                            <Icon name="store" type="MaterialIcons" style={styles.addicon} />
                        </TouchableOpacity>
                        <View style={styles.hori_line}></View>
                    </View>
                    <View style={styles.itembuttoncontainer}>
                        <TouchableOpacity style={styles.addbtn}>
                            <Text style={styles.addtext}>
                                {stringsoflanguages.Setting}
                            </Text>
                            <Icon name="settings-applications" type="MaterialIcons" style={styles.addicon} />
                        </TouchableOpacity>
                        <View style={styles.hori_line}></View>
                    </View>
                    <View style={{ height: 30 }}></View>
                    <LinearGradient colors={['#3145C2', '#3145C2']} style={styles.linearGradient1}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login')}} style={styles.buttonStyle}>
                            <ActivityIndicator style={[styles.buttonText, { display: this.state.showing_activity !== 'flex' ? 'none' : 'flex' }]} size="small" color="#ffffff">
                            </ActivityIndicator>
                            <Text style={[styles.buttonText, { display: this.state.showing_activity == 'flex' ? 'none' : 'flex' }]}>
                                {stringsoflanguages.Signout}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{ height: 15 }}></View>
                </Content>
                <Header navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imagebutton: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagepart: {
        width: 98,
        height: 98,
        borderRadius: 98 / 2,
        resizeMode: 'cover'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
    },
    buttonStyle: {
        width: '100%',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
    },
    linearGradient1: {
        width: '50%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        marginHorizontal: 3,
        marginTop: 20,
        alignSelf: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
    },
    addbtn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addtext: {
        fontSize: 15,
        paddingTop: 6,
        color: 'black'
    },
    titletext: {
        fontSize: 20,
        padding: 10,
        color: 'black',
        textAlign: 'center',
    },
    addicon: {
        fontSize: 25,
        color: 'rgba(0,0,0,1)',
        paddingTop: 5,
    },
    hori_line: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 10
    },
    hori_line1: {
        width: '60%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 10,
        alignSelf: 'center',
    },
    itembuttoncontainer: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        padding: 0,
        borderRadius: 5,
        justifyContent: 'space-between'
    },
    container: {
        width: LW,
        height: LH,
        paddingTop: MH,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
