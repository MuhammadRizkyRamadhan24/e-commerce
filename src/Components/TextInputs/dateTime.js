import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { color } from '../../Assets/Styles';

const DateTime = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.input}>
                    <Text>{`${12} / `}</Text>
                    <Text>{`${12} / `}</Text>
                    <Text>{`${12}`}</Text>
                </View>
            </TouchableOpacity>
            <Modal animationType='slide'
                transparent={true}
                visible={modalVisible}>
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.fadeView} />
                    <View style={styles.date}>
                        <DatePicker
                            date={props.date}
                            mode="date"
                            onDateChange={props.onDateChange}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DateTime;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color.fade
    },
    text: {
        color: color.default,
        fontSize: 12,
    },
    input: {
        flexDirection: 'row',
        color: color.dark,
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    },
    dateContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: color.light,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color.fade
    },
    fadeView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        backgroundColor: color.dark,
        opacity: 0.3
    }
});
