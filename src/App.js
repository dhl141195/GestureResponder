import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';

StatusBar.setHidden(true);

export default class App extends Component {
    state = {
        text: `Hello, I'm DHL`
    }

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
                    onResponderGrant={() => this.setState({ text: 'Touched' })}
                    onResponderRelease={() => Alert.alert('release')}
                    style={textWrapper}
                >
                    <Text style={text}>
                        {this.state.text}
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