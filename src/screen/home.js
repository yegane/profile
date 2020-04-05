import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {loadData, refreshData} from '../action/home';
import {resultPayment} from '../action/payment';
import NetworkState from 'react-native-network-state';

class Home extends React.Component {
  componentDidMount = () => {
    this.props.loadData();
    Linking.getInitialURL().then(url => this.navigate(url));
  };

  navigate = url => {
    console.log(url);
    if (url !== null) {
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.split('/')[1];
      const routeName = route.split('/')[0];
      const {navigation} = this.props;
      this.props.resultPayment(id, routeName);
    }
  };

  renderData = ({item}) => {
    const text = item.title;
    return (
      <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity}>
        <View style={styles.post}>
          <Image
            source={{uri: item.url}}
            style={styles.imageOfPost}
            resizeMode="cover"
          />
          <Text numberOfLines={1} style={styles.titleOfPost}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {main, loadingPage, NetworkStatus} = styles;
    const {loading, data, refresh} = this.props;
    if (loading) {
      return (
        <View style={loadingPage}>
          <NetworkState
            txtConnected="ارتباط برقرار است"
            txtDisconnected="ارتباط اینترنت را بررسی نمایید"
            style={NetworkStatus}
            onConnected={() => this.props.loadData()}
            onDisconnected={() => console.log('disconnected')}
          />
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={main}>
        <FlatList
          data={data}
          extraData={data}
          renderItem={({item}) => this.renderData({item})}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => this.props.loadData()}
          // ListHeaderComponent={() => <Text>Hello</Text>}
          ListFooterComponent={() => <ActivityIndicator />}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => this.props.refreshData()}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.homeReducer.loading,
    data: state.homeReducer.data,
    refresh: state.homeReducer.refreshData,
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  loadingPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    padding: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  post: {
    flexDirection: 'row-reverse',
    width: '100%',
  },
  imageOfPost: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  titleOfPost: {
    padding: 10,
    width: '85%',
    alignSelf: 'center',
  },
  NetworkStatus: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});

export default connect(
  mapStateToProps,
  {loadData, refreshData, resultPayment},
)(Home);
