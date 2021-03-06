import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Dimensions } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import Welcome from "../screens/Welcome"
import Login from "../screens/Login"
import SignUp from "../screens/SignUp.js"
import Forgot from "../screens/Forgot"
import Explore from "../screens/Explore"
import Home from "../screens/Home"
import FullPost from "../screens/FullPost"
import Setting from "../screens/Setting"
import Profile from "../screens/Profile"
import Notification from "../screens/Notification"
import Chat from "../screens/Chat"
import HomeIcon from "../icons/HomeIcon"
import NotificationIcon from "../icons/NotificationIcon"
import SearchIcon from "../icons/SearchIcon"
import UserIcon from "../icons/UserIcon"
import ChatIcon from "../icons/ChatIcon"
import { theme } from "../constants";
import Upload from "../screens/Upload"
import Comment from "../screens/Comment"
import ReplyComment from "../screens/ReplyComment"
import OtherPeopleProfile from "../screens/OtherPeopleProfile"
import Message from "../screens/Message"
import Followers from "../screens/Followers"
import { loginAction } from "../actions/autthenAction"


const Drawer = createDrawerNavigator();

const AppStack = createStackNavigator();

const TabNav = createBottomTabNavigator();

const { width, height } = Dimensions.get("window");

const tabBarOptions = {
    showLabel: false,
    style: {
        backgroundColor: theme.colors.white,
        borderTopColor: "#343434",
        paddingBottom: 12,
        height: 50,
    },
}

const TabBarIconContainer = (props) => {
    switch (props.name) {
        case "home":
            return (
                <View style={{
                    padding: 1,
                    borderRadius: 23,
                }}>
                    <HomeIcon active={props.focused} />
                    {props.focused}
                </View >
            )

        case "notification":
            return (
                <View style={{
                    padding: 1,
                    borderRadius: 23,
                }}>
                    <NotificationIcon active={props.focused} />
                    {props.focused}
                </View >
            )

        case "search":
            return (
                <View style={{
                    padding: 1,
                    borderRadius: 23,
                }}>
                    <SearchIcon active={props.focused} />
                    {props.focused}
                </View >
            )

        case "user":
            return (
                <View style={{
                    padding: 1,
                    borderRadius: 23,
                }}>
                    <UserIcon active={props.focused} />
                    {props.focused}
                </View >
            )

        case "chat":
            return (
                <View style={{
                    padding: 1,
                    borderRadius: 23,
                }}>
                    <ChatIcon active={props.focused} />
                    {props.focused}
                </View >
            )

        default: return (
            <View style={{
                padding: 1,
                borderRadius: 23,
            }}>
                <HomeIcon active={props.focused} />
                {props.focused}
            </View >
        )
    }

}

const TabNavScreen = () => {
    return (
        <TabNav.Navigator
            tabBarOptions={tabBarOptions}
            screenOptions={({ route }) => (
                {
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        switch (route.name) {

                            case "Home":
                                iconName = "home"
                                break;

                            case "Explore":
                                iconName = "search"
                                break;

                            case "Chat":
                                iconName = "chat"
                                break;

                            case "Notification":
                                iconName = "notification"
                                break;

                            case "Profile":
                                iconName = "user"
                                break;

                            default:
                                break;
                        }

                        return (
                            <TabBarIconContainer focused={focused} name={iconName} />
                        )
                    }


                }
            )
            }>

            <TabNav.Screen name="Home" component={Home} />
            <TabNav.Screen name="Explore" component={Explore} />
            <TabNav.Screen name="Chat" component={Chat} />
            <TabNav.Screen name="Notification" component={Notification} />
            <TabNav.Screen name="Profile" component={ProfileSetting} />
        </TabNav.Navigator >
    )
}

const ProfileSetting = () => {
    return (
        <Drawer.Navigator 
        drawerStyle={{
            width: width * 2/3,
          }}
        drawerContent={props => <Setting {...props}/>} initialRouteName="Home">
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Setting" component={Setting} />
        </Drawer.Navigator>
    )
}

export default Navigation = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const getToken = async () => {
        token = await AsyncStorage.getItem("token");
        if (token != null) {
            dispatch(loginAction());
        }
        setLoading(false)
    }

    useEffect(() => {
        getToken();
    },[isLoggedIn]);

    const isLoggedIn = useSelector(state => state.currentUser.loggedIn)

    return (
        <NavigationContainer>
            { loading == false ? (
                <AppStack.Navigator mode="modal" headerMode="none">
                    {
                        isLoggedIn ? (
                            <>
                                <AppStack.Screen name="App" component={TabNavScreen} />
                                <AppStack.Screen name="Post" component={FullPost} />
                                <AppStack.Screen name="Upload" component={Upload} />
                                <AppStack.Screen name="Comment" component={Comment} />
                                <AppStack.Screen name="ReplyComment" component={ReplyComment} />
                                <AppStack.Screen name="OtherPeopleProfile" component={OtherPeopleProfile} />
                                <AppStack.Screen name="Message" component={Message} />
                                <AppStack.Screen name="Followers" component={Followers} />
                            </>
                        ) : (
                                <>
                                    <AppStack.Screen name="Login" component={Login} />
                                    <AppStack.Screen name="SignUp" component={SignUp} />
                                    <AppStack.Screen name="Forgot" component={Forgot} />
                                </>
                            )
                    }
                </AppStack.Navigator>
            ) : (
                    <AppStack.Navigator mode="modal" headerMode="none">
                        <AppStack.Screen name="Welcome" component={Welcome} />
                    </AppStack.Navigator>
                )
            }
        </NavigationContainer>
    )
}


