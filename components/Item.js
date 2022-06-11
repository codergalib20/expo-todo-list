import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Item = ({ item,setPreviewItem }) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.round}>
                    <Text style={styles.roundText}>{item?.text?.charAt(1).toUpperCase()}</Text>
                </View>
                <Text style={styles.leftText}>{item?.text?.slice(0, 25)}</Text>
            </View>
            <TouchableOpacity onPress={() => setPreviewItem(item)} style={styles.roundBox}>
                <AntDesign name="eye" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: "wrap",
    },
    round: {
        width: 20,
        height: 20,
        borderRadius: 2,
        backgroundColor: '#ECB390',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    roundText: {
        color: '#fff',
    },
    leftText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        width: '75%',
    },
})
export default Item;