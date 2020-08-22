import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {CustomCardView} from './components/CustomCardView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from './actions';
import Header from './components/Header';
const axios = require('axios');

var keyUser = "ee1ba067de2362c1e91793e9c820f37f"
class Home extends Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();
    this.state = {
      lodading: false,
      loadMore: false,
      width: Dimensions.get('window').width,
      dataToDisplay: [],
    };
    this.index = 1;
  }

  componentDidMount = () => {
    this.props.clearRedux();
    setTimeout(() => {
    this.setState({dataToDisplay: this.props.testApiResponse});
      this.setState({lodading: true});
    }, 1000);
    setTimeout(() => {
      this.featching(this.index);
    }, 4000);
  };

  featching = (key) => {
    if (key == 1) {
      this.apiCall(key);
    //  this.success(data)
    } else if (key <= this.props.totalInd) {
      this.index = key;
      this.apiCall(key);
    //  this.success(data)
    } else {
      this.setState({lodading: false});
    }
  };

  success = (data) => {
    if (data?.results?.length > 0) {
      var temp = data;
      temp.results.map((v, i) => {
        v.like = false;
      });

      setTimeout(() => {
        // console.log('hi', temp);

        this.setState(
          {
            dataToDisplay: this.props.testApiResponse.concat(temp.results),
            lodading: false,
          },
          () => {
            this.props.testApiCall(this.state.dataToDisplay);
            if (this.props.totalInd === 0) {
              this.props.getTatalIndex(temp.total_pages);
            }
          },
        );
      }, 3000);
    } else {
      this.setState({lodading: false});

      setTimeout(() => {
        alert('someting went wrong');
      }, 3000);
    }
  }
 

  apiCall = async (key) => {
    var baseUrl = 'https://api.themoviedb.org/3/movie/popular?api_key='

    try {
      const response = await axios.get(`${baseUrl}` + keyUser + `&language=en-US&page=${key}`);
      console.log("hi",response);
      this.success(response.data)
    } catch (error) {
      console.error(error);
      this.success(error)
    }
    
  };

  likeButtonClick = (item, index) => {
    var temp = item
    temp.like = !temp.like

    var arr = this.state.dataToDisplay
    arr[index] = temp
    this.setState({dataToDisplay : arr })
  }

  renderFlatList = (item, index) => {
    // console.log(index, item);

    return (
      <View style={{paddingTop: moderateScale(5)}}>
        <CustomCardView
          view={
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                padding: moderateScale(0),
              }}>
              <View
                style={{
                  width: this.state.width * 0.1,
                  paddingTop: moderateScale(10),
                }}>
                <Image
                  style={{height: moderateScale(90), width: moderateScale(70)}}
                  source={{
                    uri:
                      `https://image.tmdb.org/t/p/original` + item.poster_path,
                  }}
                />
              </View>
              <View
                style={{
                  width: this.state.width * 0.88,
                  paddingHorizontal: moderateScale(40),
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flex: 1,
                    flexDirection: 'row',
                    paddingVertical: moderateScale(10),
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: moderateScale(14, 0.2),
                        color: '#000000',
                        textAlign: 'left',
                        fontWeight: 'bold',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flex: 1,
                    flexDirection: 'row',
                    paddingVertical: moderateScale(10),
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: moderateScale(12, 0.2),
                        color: '#767676',
                        textAlign: 'left',
                      }}>
                      {item.overview}
                    </Text>
                  </View>
                </View>

                  <View style={{flex: 1}}>
                    {item.like ? (
                      <View style = {{flexDirection : 'row'}}>
                        <TouchableOpacity onPress = {() => {this.likeButtonClick(item, index)}}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),
                        }}
                        source={require('./Images/checkboxPartial.png')}
                      />
                      </TouchableOpacity>
                      <Text
                      style={{
                        fontSize: moderateScale(16, 0.2),
                        color: '#767676',
                        paddingLeft : moderateScale(5),
                        paddingTop : moderateScale(5)
                        // textAlign: 'right',
                      }}>
                      {"Dislike"}
                    </Text>
                    </View>
                    ) : (
                      <View style = {{flexDirection : 'row'}}>
                        <TouchableOpacity onPress = {() => {this.likeButtonClick(item, index)}}>
                      <Image
                        style={{
                          height: moderateScale(25),
                          width: moderateScale(25),

                        }}
                        source={require('./Images/checkbox1.png')}
                      />
                      </TouchableOpacity>
                       <Text
                      style={{
                        fontSize: moderateScale(16, 0.2),
                        color: '#767676',
                        paddingLeft : moderateScale(5),
                        paddingTop : moderateScale(5)
                        // textAlign: 'right',
                      }}>
                      {"Like"}
                    </Text>
                    </View>
                    )}
                   
                  </View>


              </View>
            </View>
          }
        />
      </View>
    );
  };

  leftIconFunction = () => {
    alert('Nothing to Display');
  };

  rightIconFunction = (text) => {
    if (text.length > 0) {
      var temp = [];
      this.props.testApiResponse.map((val, ind) => {
        if (val.title.search(text) != -1) {
          temp.push(val);
        }
      });

      this.setState({dataToDisplay: temp});
    } else {
      this.setState({dataToDisplay: this.props.testApiResponse});
    }
  };

  endReached = () => {
    if (!this.state.loadMore) {
      this.setState({loadMore: true});
      setTimeout(() => {
        this.featching(this.index + 1);
      }, 1000);
    }
  };

  renderFooter = () => {
    if (!this.state.loadMore) return null;

    return (
      <ActivityIndicator
        color="#000000"
        style={{marginLeft: 8, marginVertical: moderateScale(50)}}
      />
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#E5F1FB',
          flex: 1,
        }}>
        <StatusBar backgroundColor="#4077EB" barStyle="light-content" />
        <Header
          title="Gaming Monk"
          leftIconFunction={this.leftIconFunction}
          rightIconFunction={(text) => this.rightIconFunction(text)}
        />
        <View style={{flex: 1}}>
          {this.state.lodading ? (
            <ActivityIndicator
              color="#000000"
              style={{marginLeft: 8, marginVertical: moderateScale(300)}}
            />
          ) : (
            <FlatList
              data={this.state.dataToDisplay}
              extraData={this.state}
              contentContainerStyle={{
                marginHorizontal: moderateScale(5),
              }}
              onEndReached={this.endReached}
              keyExtractor={(Item, i) => i.toString()}
              onMomentumScrollBegin={() => {
                this.setState({loadMore: false});
              }}
              ListFooterComponent={this.renderFooter}
              renderItem={({item, index}) => this.renderFlatList(item, index)}
            />
          )}
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  const {totalInd, testApiResponse, testApiFailure} = state.Home;

  return {
    totalInd,
    testApiResponse,
    testApiFailure,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
