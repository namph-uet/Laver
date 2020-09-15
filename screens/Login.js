import React, { useEffect } from "react"
import {
    Image,
    Dimensions,
    StyleSheet
} from "react-native"
import {
    Block,
    Button,
    Text,
    Input
} from "../components"
import { theme } from "../constants"
import Animated, { Easing } from "react-native-reanimated"
import { TapGestureHandler, State } from "react-native-gesture-handler"

const { width, height } = Dimensions.get("window");

const { Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

export default function Login() {

    const buttonOpacity = new Value(1);

    const onStateChange = event([
        {
            nativeEvent: ({ state }) =>
                block([
                    cond(
                        eq(state, State.END),
                        set(buttonOpacity, runTiming(new Clock(), 0, 1))
                    )
                ])
        }
    ]);

    const onCloseState = event([
        {
            nativeEvent: ({ state }) =>
                block([
                    cond(
                        eq(state, State.END),
                        set(buttonOpacity, runTiming(new Clock(), 1, 0))
                    )
                ])
        }
    ]);

    const buttonY = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [100, 0],
        extrapolate: Extrapolate.CLAMP
    });

    const bgY = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [-height / 3, 0],
        extrapolate: Extrapolate.CLAMP
    });

    const textInputZindex = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, -1],
        extrapolate: Extrapolate.CLAMP
    });

    const textInputY = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [0, 100],
        extrapolate: Extrapolate.CLAMP
    });

    const textInpuOpacity = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    });

    const rotateCross = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [180, 360],
        extrapolate: Extrapolate.CLAMP
    });


    return (
        <Block flex={1} color="white" bottom>
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFill,
                    transform: [{ translateY: bgY }]
                }}
            >
                <Block style={{ ...StyleSheet.absoluteFill }}>
                    <Image style={styles.background} source={require("../assets/images/login_background.jpg")} />
                </Block>
            </Animated.View>
            <Block flex={false} style={styles.buttonContainer} >
                <TapGestureHandler onHandlerStateChange={onStateChange}>
                    <Animated.View style={{
                        ...styles.button,
                        opacity: buttonOpacity,
                        transform: [{ translateY: buttonY }]
                    }}>
                        <Text style={styles.text}>SIGN IN</Text>
                    </Animated.View>
                </TapGestureHandler>
                <Animated.View style={{
                    ...styles.button,
                    opacity: buttonOpacity,
                    backgroundColor: theme.colors.green,
                    transform: [{ translateY: buttonY }]
                }}>
                    <Text style={{ ...styles.text, color: "white" }}>SIGN UP</Text>
                </Animated.View>
                <Animated.View
                    style={{
                        opacity: textInpuOpacity,
                        zIndex: textInputZindex,
                        height: height / 3,
                        transform: [{ translateY: textInputY }],
                        ...StyleSheet.absoluteFill,
                        top: null,
                        justifyContent: "center"
                    }}>
                    <TapGestureHandler onHandlerStateChange={onCloseState}>
                        <Animated.View style={styles.closeButton}>
                            <Animated.Text style={{
                                fontSize: 20, transform: [{
                                    rotate: concat(rotateCross,
                                        "deg")
                                }]
                            }}>
                                X
                                </Animated.Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <Input
                        placeholder="Email"
                        placeholderTextColor={theme.colors.gray2}
                        style={styles.textInput}
                    />
                    <Input
                        placeholder="Password"
                        placeholderTextColor={theme.colors.gray2}
                        style={styles.textInput}
                    />
                    <Animated.View style={{ ...styles.button }}>
                        <Text style={{ ...styles.text, fontWeight: "bold" }}>SIGN IN</Text>
                    </Animated.View>
                </Animated.View>
            </Block>
        </Block>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    background: {
        height: height,
        width: width,
        flex: 1
    },
    buttonContainer: {
        height: height / 3,
    },
    button: {
        backgroundColor: "white",
        height: 70,
        borderRadius: 30,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        marginBottom: 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "black",
        shadowOpacity: 0.2,
        elevation: 5
    },
    text: {
        fontSize: 18
    },
    textInput: {
        fontSize: theme.sizes.caption,
        borderWidth: 0.5,
        borderColor: "black",
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5,
        borderRadius: 25,
        marginHorizontal: 20,
        marginVertical: 5,
        height: 50
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -20,
        left: width / 2 - 20
    }
})

