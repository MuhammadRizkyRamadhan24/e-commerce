import { Dimensions, StyleSheet } from 'react-native';
import { color } from '../../Assets/Styles';

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 30,
        backgroundColor: color.light,
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 15
    },
    dataContainer: {
        width: '80%',
    },
    mediumText: {
        marginBottom: 10,
        fontSize: 16,
        lineHeight: 26,
        color: color.dark
    },
    paymentContainer: {
        width: Dimensions.get('window').width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    paymentBrand: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 55,
        backgroundColor: color.light,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color.fade
    },
    brandImage: {
        width: 50,
        height: 50
    },
    brandText: {
        marginLeft: 20,
        fontSize: 16,
        color: color.dark
    },
    brandIndicator: {
        position: 'absolute',
        right: 0,
        width: 25,
        height: 25,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: color.fade
    }
});

export default style;