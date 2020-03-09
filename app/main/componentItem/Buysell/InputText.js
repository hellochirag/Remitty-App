import React from 'react'
import { 
    Text, 
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    TextInput
} from 'react-native'

const InputText = ({ txtplaceholder }) => {

    return (
        <TextInput style={styles.textcontainer}
                underlineColorAndroid="transparent"
               // onChangeText={(price) => this.setState({ price })}
              //  value={this.state.price}
                placeholder={txtplaceholder}
               // keyboardType='number-pad'
         />
    )

}

const styles = StyleSheet.create({
    textcontainer: {
        flexDirection: 'column',
        marginTop: 10,
        width:'100%',
        height: 45,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        //marginHorizontal:15,
        elevation: 3,
        paddingLeft:15,
        borderWidth:1,
        borderColor:'rgba(240,240,240,0.8)',
        marginBottom:30,
      },
      txtcontent: {
        marginTop: 5,
        fontSize: 14,
        color: '#1A1F84',
        fontWeight:'bold'      },
    
})

export default InputText