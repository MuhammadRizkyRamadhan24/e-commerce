import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Topbar } from '../../Components';
import styles from './style';
import { color } from '../../Assets/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import { get_all_order } from '../../Redux/Action/order';
import { apiUri } from '../../Utils/config';
import Axios from 'axios';
import { API_URL } from '@env';

const Profile = (props) => {
  const navigation = useNavigation();
  const [totalOrders, setTotalOrders] = useState(0)
  const {
    tokenLogin,
    image,
    full_name,
    username,
    email,
    id
  } = props.auth.auth;
  // const [profiles, setProfiles] = useState({});
  useEffect(() => {
    checkAuth()
    getUserOrders()
  }, [])

  const checkAuth = () => {
    !tokenLogin && navigation.navigate('Auth')
  }
  const getUserOrders = () => {
    Axios({
      method: 'GET',
      url: `${API_URL}/users/${id}/orders`,
      headers: {
        Authorization: tokenLogin,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      setTotalOrders(res.data.data.length)
    }).catch((error) => {
      console.log(error.response);
    });
  }
  return (
    <View
      style={{
        backgroundColor: color.light,
      }}>
      <Topbar search={true} />
      <View style={styles.headline}>
        <Text style={styles.headText}>My Profile</Text>
      </View>

      <View style={styles.container}>
        <View style={[styles.list, styles.cardImage]}>
          <Image
            source={{ uri: `${apiUri.newImagePath}/${image}` }}
            style={styles.image}
          />
          <View style={[styles.list, styles.cardText]}>
            <Text style={styles.darkText}>{full_name}</Text>
            <Text style={styles.fadeText}>{email}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.list} onPress={() => navigation.navigate('MyOrder')}>
          <View>
            <View style={styles.cardIcon}>
              <Text style={styles.darkText}>My Orders</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={color.dark}
              />
            </View>
          </View>
          <View style={styles.cardIcon}>
            <Text style={styles.fadeText}>Already have {totalOrders} orders</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.list} onPress={() => navigation.navigate('ShipAddress')}>
          <View>
            <View style={styles.cardIcon}>
              <Text style={styles.darkText}>Shipping Address</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={color.dark}
              />
            </View>
          </View>
          <View style={styles.cardIcon}>
            <Text style={styles.fadeText}>3 Address</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.list} onPress={() => navigation.navigate('SettingProfile')}>
          <View>
            <View style={styles.cardIcon}>
              <Text style={styles.darkText}>Settings</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={color.dark}
              />
            </View>
          </View>
          <View style={styles.cardIcon}>
            <Text style={styles.fadeText}>Notifications, password</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchProps = {
  get_all_order
};

export default connect(mapStateToProps, mapDispatchProps)(Profile);