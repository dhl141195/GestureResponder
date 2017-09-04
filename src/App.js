import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    PanResponder
} from 'react-native';

StatusBar.setHidden(true);

export default class App extends Component {

    state = {
        rootX: 0,
        rootY: 0,
        left: 0,
        top: 0
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: this.onMoveHandler,
            onPanResponderRelease: this.onReleaseHandler
        })
    }

    onMoveHandler = (event, gestureState) => {
        const { dx, dy } = gestureState;

        // Set left, top bằng vị trí lúc bắt đầu drag + với distance X, Y đã kéo
        this.setState(prevState => ({
            left: prevState.rootX + dx,
            top: prevState.rootY + dy,
        }));
    }

    onReleaseHandler = (event, gestureState) => {
        const { dx, dy } = gestureState;

        // Sau khi release thì cập nhật vị trí hiện tại
        this.setState(prevState => ({
            rootX: prevState.rootX + dx,
            rootY: prevState.rootY + dy
        }));
    }

    render() {
        const {
            container,
            textWrapper,
            text
        } = styles;

        const { left, top } = this.state;

        return (
            <View style={container}>
                <View
                    style={[
                        textWrapper,
                        {
                            top,
                            left
                        }
                    ]}
                    {...this.panResponder.panHandlers}
                >
                    <Text style={text}>
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