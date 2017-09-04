import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';

StatusBar.setHidden(true);

export default class App extends Component {
    render() {

        const {
            container,
            textWrapper,
            text
        } = styles;

        return (
            <View style={container}>
                <View
                    onStartShouldSetResponder={() => true}
                    onMoveShouldSetResponder={() => true}
                    onResponderGrant={() => console.log('Parent')}
                    style={textWrapper}

                    // Trong trường hợp nesting component, thêm cái này nếu muốn thằng cha được set responder
                    // Còn không thì deepest responder component sẽ được chọn, trong trường hợp này là Text
                    onStartShouldSetResponderCapture={() => true}
                >
                    <Text
                        onStartShouldSetResponder={() => true}
                        onMoveShouldSetResponder={() => true}
                        onResponderGrant={() => console.log('Child')}
                        style={text}
                    >
                        Hello, I'm DHL
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textWrapper: {
        height: 100,
        width: 200,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800'
    }
});