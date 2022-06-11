import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const Preview = ({ previewItem, setPreviewItem }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => setPreviewItem(null)} style={styles.roundBox}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.previewContent}>
                <Text style={styles.previewText}>{previewItem?.text}</Text>
                <Text style={styles.previewText}>{previewItem?.startDate} {" "}{previewItem?.endDate}</Text>
            </View>
        </View>
    )
}

export default Preview;
const styles = StyleSheet.create({
    roundBox: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },
    previewContent: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})