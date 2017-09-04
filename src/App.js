import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';

StatusBar.setHidden(true);

export default class App extends Component {

    state = {
        xRoot: 0,
        yRoot: 0,
        top: 0,
        left: 0
    }

    onTouchHandler = (event) => {
        const { pageX, pageY } = event.nativeEvent;

        this.setState(prevState => {
            return {
                // Trừ đi prevState.left và prevState.top để mỗi khi click bắt đầu drag sẽ set xRoot, yRoot bằng vị trí ban đầu
                // Và sau đó trong onMoveHandler sẽ tính ra left và top để duy trì vị trí của lần drag & drop trước
                // Cũng có thể check nếu xRoot và yRoot khác 0 thì mới cập nhật state mỗi khi click nhưng nếu làm như vậy
                // sẽ bị lệch 1 chút khi click bắt đầu drag vì điểm click ban đầu k được set lại, các lần click sau sẽ
                // đc tính dựa vào điểm click đầu tiên
                xRoot: pageX - prevState.left,
                yRoot: pageY - prevState.top
            }
        })
    }

    onMoveHandler = (event) => {
        const { pageX, pageY } = event.nativeEvent;

        this.setState(prevState => ({
            left: pageX - prevState.xRoot,
            top: pageY - prevState.yRoot,
        }));
    }

    render() {

        const {
            container,
            textWrapper,
            text
        } = styles;

        const { top, left } = this.state;

        return (
            <View style={container}>
                <View
                    onStartShouldSetResponder={() => true}
                    onMoveShouldSetResponder={() => true}
                    onResponderGrant={this.onTouchHandler}
                    onResponderMove={this.onMoveHandler}
                    style={[
                        textWrapper,
                        {
                            top,
                            left
                        }
                    ]}
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