import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Alert, Button, TextInputs, Topbar } from '../../Components';
import style from './style';

import { updateUser } from '../../Utils/Api';
import { setUpdateUser } from '../../Redux/Actions/users/users';

const Address = props => {
    const data = props.route.params ? props.route.params.data : '';
    const [labelOld, fullnameOld, addressOld, cityOld, stateOld, countryOld, zipOld, indexAddress] = data || [];
    const [label, setLabel] = useState(labelOld || '');
    const [fullname, setFullname] = useState(fullnameOld || '');
    const [address, setAddress] = useState(addressOld || '');
    const [city, setCity] = useState(cityOld || '');
    const [state, setState] = useState(stateOld || '');
    const [country, setCountry] = useState(countryOld || '');
    const [zip, setZip] = useState(zipOld || '');
    const [isSuccess, setSuccess] = useState('');
    const [isError, setError] = useState('');
    const user = props.user;

    const handleSubmit = () => {
        if (!fullname || !address || !city || !state || !country || !zip) {
            setError('Data cant be empty')
            return;
        }

        const dataAddress = `${label}-${fullname}-${address}-${city}-${state}-${country}-${zip}`;
        data ? handleUpdateAddress(dataAddress) : handleAddAddress(dataAddress);
    }

    const handleUpdateAddress = data => {
        const userAddress = user.address.split('|');
        let newAddress = '';
        userAddress[indexAddress] = data;

        userAddress.map(item => {
            newAddress = newAddress ? `${newAddress}|${item}` : item;
        })

        const result = { address: newAddress };
        updateUser(result, user.id).then(res => {
            if (res) {
                setSuccess('Successfully updated address')
                props.setUpdateUser(result);
            } else setError('Something wrong, please check later')
        })
    }

    const handleAddAddress = data => {
        const userAddress = user.address.split('|');
        let newAddress = '';
        userAddress.push(data);
        userAddress.map(item => {
            newAddress = newAddress ? `${newAddress}|${item}` : item;
        })
        const result = { address: newAddress };
        updateUser(result, user.id).then(res => {
            if (res) {
                setSuccess('Successfully added address')
                props.setUpdateUser(result);
            } else setError('Something wrong, please check later')
        })
    }

    return (
        <View>
            <Topbar backNav={true} title={data ? 'Change Address' : 'Adding Shiping Address'} />
            <ScrollView style={{ ...style.fullContainer, flex: 1, padding: 10 }}>
                <View>
                    <TextInputs
                        title="Label"
                        placeholder="Insert Your Label"
                        value={label}
                        onChangeText={(text) => setLabel(text)}
                    />
                    <TextInputs
                        title="Fullname"
                        placeholder="Insert Your Fullname"
                        value={fullname}
                        onChangeText={(text) => setFullname(text)}
                    />
                    <TextInputs
                        title="Address"
                        placeholder="Insert Your Address"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    <TextInputs
                        title="City"
                        placeholder="Insert Your City"
                        value={city}
                        onChangeText={(text) => setCity(text)}
                    />
                    <TextInputs
                        title="State/Province/Region"
                        placeholder="Insert Your State/Province/Region"
                        value={state}
                        onChangeText={(text) => setState(text)}
                    />
                    <TextInputs
                        title="Country"
                        placeholder="Insert Your Country"
                        value={country}
                        onChangeText={(text) => setCountry(text)}
                    />
                    <TextInputs
                        title="Zip Code (Postal Code)"
                        placeholder="Insert Your Zip Code"
                        value={zip}
                        onChangeText={(text) => setZip(text)}
                    />
                    <Button title='Save Address' style='primary' type='fullwidth' onPress={() => handleSubmit()} />
                </View>
            </ScrollView>
            {isSuccess ?
                <Alert title={isSuccess} type='success' onPress={() => setSuccess()} /> : <></>
            }
            {isError ?
                <Alert title={isError} type='failed' onPress={() => setError()} /> : <></>
            }
        </View>
    )
}

const mapStateToProps = state => ({
    user: state.auth.auth
});

const mapDispathToProps = { setUpdateUser };

export default connect(mapStateToProps, mapDispathToProps)(Address);