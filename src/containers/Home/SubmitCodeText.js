import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import Text from '@components/Text';


const SubmitCodeText = ( width, setlayout ) => {
    return <View
        onLayout={(event) => {
            setlayout(event.nativeEvent.layout)
        }}>
        <Input
            placeholder={"Nhập mã bằng tay"}
            containerStyle={{
                padding: 0,
                width: width,
                paddingHorizontal: 0,
                margin: 0,
            }}
            inputContainerStyle={{
                borderBottomWidth: 0,
                backgroundColor: "white",
                height: 40,
                borderRadius: 20,
                paddingLeft: 10,
            }}
            inputStyle={{
                fontSize: 15
            }}
            rightIconContainerStyle={{
                marginVertical: 0,
                paddingRight: 0,
            }}
            rightIcon={<View style={{
                backgroundColor: "#095CCA",
                borderRadius: 20,
                paddingHorizontal: 20,
                justifyContent: "center", alignItems: "center", alignContent: "center",
                height: 40,
            }}>
                <Text style={{color:'#ff',fontSize: 17,fontWeight: "500"}}>Xác nhận</Text>
            </View>}
        />
    </View>
}
export default SubmitCodeText