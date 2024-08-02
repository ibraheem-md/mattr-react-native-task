import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import containerStyle from '../style/container_style';
import textStyle from '../style/text_style';

const UserDetailScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetch('https://ad5fd43ff3494e53ae90dfd8c03a23f9.api.mockbin.io')
      .then(response => response.json())
      .then(data => {
        const filteredUser = data.find(user => user.id === 10); // assuming user ID 10 is user
        setUser(filteredUser);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(contentOffsetX / viewSize);
    setCurrentIndex(index);
  };

  const renderPageIndicators = () => (
    <View style={styles.indicatorContainer}>
      {user.photos.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            { backgroundColor: currentIndex === index ? '#FF0000' : '#CCCCCC' }
          ]}
        />
      ))}
    </View>
  );

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const renderPhoto = ({ item }) => (
    <Image source={{ uri: item.path }} style={styles.avatar} />
  );

  return (
    <View style={styles.container}>
    
      <ScrollView>
        <FlatList
          ref={flatListRef}
          data={user.photos}
          renderItem={renderPhoto}
          keyExtractor={photo => photo.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          style={styles.avatar}
        />
        {renderPageIndicators()}
        <View style={styles.headerContainer}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
            <Text style={textStyle.textNormal}>{user.location.city}, {user.location.country}</Text>
            <Text style={textStyle.textsmall}>{user.bio}</Text>
          </View>
        </View>
        <View style={containerStyle.moveToLeftContainer}>
          <Text style={textStyle.textBoldMedium}>Interests</Text>
          <View style={styles.interestsContainer}>
            {user.interests.map(interest => (
              <View key={interest.id} style={styles.interestBox}>
                <Text style={styles.interestText}>{interest.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE4E2',
  },
  avatar: {
    width: 430,
    height: 590,
    borderRadius: 15,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  interestBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  interestText: {
    fontSize: 16,
    color: '#000000',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});

export default UserDetailScreen;
