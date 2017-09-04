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
        rootY: 0
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
        const { rootX, rootY } = this.state;

        // Set left, top bằng vị trí lúc bắt đầu drag + với distance X, Y đã kéo
        // Thay vì dùng state và update state thì dùng setNativeProps
        // tránh việc re-render liên tục
        this.panView.setNativeProps({
            style: {
                left: rootX + dx,
                top: rootY + dy,
            }
        });
    }

    onReleaseHandler = (event, gestureState) => {
        const { dx, dy } = gestureState;

        // Sau khi release thì cập nhật vị trí hiện tại
        // Nếu thích thì chỗ này có thể khai báo rootX và rootY thành instance var của class
        // và this.rootX += dx; this.rootY += dy
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

        return (
            <View style={container}>
                <View
                    ref={view => this.panView = view}
                    style={textWrapper}
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