import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native"
import Block from "./Block"
import Text from "./Text"
import { theme, mocks } from "../constants"
import LikeIcon from "../icons/LikeIcon"
import CommentIcon from "../icons/CommentIcon"
import ShareIcon from "../icons/ShareIcon"

const { width, height } = Dimensions.get("window");

// name={item.name}
// status={item.status}
// image={item.image}
// likeCount={item.likeCount}
// comment={item.comment}
// liked={item.liked}
// navigation={navigation}

export default function Post(props) {
    const {
        avatar,
        liked,
        likeCount,
        commentCount,
        share
    } = props

    const [active, setActive] = useState(liked)
    const [likeCountState, setLikeCountState] = useState(likeCount)
    const [commentCountState, setCommentCountState] = useState(commentCount)
    const [shareCountState, setShareCountState] = useState(share) 

    const { navigation } = props;

    useEffect(()=> {
        console.log(likeCountState)
    }, [likeCountState])

    const onChangeLike = () => {
        if(active) {
            setLikeCountState(likeCountState-1)
        } else {
            setLikeCountState(likeCountState+1)
        }
        setActive(!active);
    }

    const navigateToCommentScreen = () => {
        navigation.navigate("Comment", {
            likeCount: likeCountState,
            liked: active,
            commentCount: commentCountState,
            share: shareCountState,
            image: props.image
        })
    }

    return (
        <Block flex={false} color="white" style={styles.container} >
            <Block>
                <TouchableOpacity style={styles.postHeader}>
                    <Image source={props.avatar} style={styles.avatar} />
                    <Text style={styles.name}>{props.name}</Text>
                </TouchableOpacity>
            </Block>
            <Block style={styles.status}>
                <Text>{props.status}</Text>
            </Block>
            <Block flex={false} style={styles.imageContainer} >
                <Image resizeMode="stretch" source={props.image} style={styles.image}/>
            </Block>
            <TouchableOpacity style={styles.postReactCount}>
                <Text>
                    <Text>{likeCountState} </Text>
                    <Text>Likes</Text>
                </Text>
                <Text>
                    <Text>10 </Text>
                    <Text>Comment</Text>
                    <Text>. 10 </Text>
                    <Text>Share</Text>
                </Text>
            </TouchableOpacity>
            <Block flex={false} style={styles.reactContainer}>
                <TouchableOpacity style={styles.button} onPress={onChangeLike}>
                    <LikeIcon active={active} />
                    <Text style={{ paddingLeft: 5 }}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={navigateToCommentScreen}>
                    <CommentIcon />
                    <Text style={{ paddingLeft: 5 }}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <ShareIcon />
                    <Text style={{ paddingLeft: 5 }}>Share</Text>
                </TouchableOpacity>
            </Block>
        </Block>
    )
}


const styles = StyleSheet.create({
    container: {

        marginBottom: 10
    },
    avatar: {
        height: width / 10,
        width: width / 10
    },
    postHeader: {
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 10
    },
    name: {
        fontWeight: "bold",
        paddingLeft: 10,
        alignContent: "center"
    },
    imageContainer: {
        width: width,
        alignItems: "center"
    },
    image: {
       width: width,
       resizeMode: "stretch"
    },
    status: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },
    reactContainer: {
        paddingLeft: 10,
        paddingTop: 6,
        borderTopColor: "gray",
        borderTopWidth: 0.5,
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 30,
        paddingRight: 30
    },
    button: {
        flexDirection: "row"
    },
    postReactCount: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})





