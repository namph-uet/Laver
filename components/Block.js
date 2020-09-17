import React from "react";
import { StyleSheet, View, Animated } from "react-native";

import { theme } from "../constants";

export default function Block(props) {

    const {
        flex,
        row,
        column,
        center,
        middle,
        left,
        right,
        top,
        bottom,
        card,
        shadow,
        color,
        space,
        animated,
        wrap,
        style,
        children
      } = props;
  
      const blockStyles = [
        styles.block,
        flex && { flex },
        flex === false && { flex: 0 }, // reset / disable flex
        row && styles.row,
        column && styles.column,
        center && styles.center,
        middle && styles.middle,
        left && styles.left,
        right && styles.right,
        top && styles.top,
        bottom && styles.bottom,
        card && styles.card,
        shadow && styles.shadow,
        space && { justifyContent: `space-${space}` },
        wrap && { flexWrap: "wrap" },
        color && styles[color], 
        color && !styles[color] && { backgroundColor: color }, 
        style 
      ];
  

    if (animated) {
        return (
            <Animated.View style={blockStyles} {...props} >
                {children}
            </Animated.View>
        )
    }

    return (
        <View style={blockStyles}>
            {children}
        </View>
    );
}

export const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    row: {
        flexDirection: "row"
    },
    column: {
        flexDirection: "column"
    },
    card: {
        borderRadius: theme.sizes.radius
    },
    center: {
        alignItems: "center"
    },
    middle: {
        justifyContent: "center"
    },
    left: {
        justifyContent: "flex-start"
    },
    right: {
        justifyContent: "flex-end"
    },
    top: {
        justifyContent: "flex-start"
    },
    bottom: {
        justifyContent: "flex-end"
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 2
    },
    accent: { backgroundColor: theme.colors.accent },
    primary: { backgroundColor: theme.colors.primary },
    secondary: { backgroundColor: theme.colors.secondary },
    tertiary: { backgroundColor: theme.colors.tertiary },
    black: { backgroundColor: theme.colors.black },
    white: { backgroundColor: theme.colors.white },
    gray: { backgroundColor: theme.colors.gray },
    gray2: { backgroundColor: theme.colors.gray2 }
});

