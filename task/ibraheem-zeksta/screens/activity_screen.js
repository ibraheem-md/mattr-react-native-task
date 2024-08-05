import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import containerStyle from '../style/container_style';
import textStyle from '../style/text_style';

const ActivityScreen = () => {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [remainingUsers, setRemainingUsers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const genderFilter = route.params?.gender || null;
  const ageRangeFilter = route.params?.ageRange || null;
  const sortBy = route.params?.sortBy || null;
  const allUsersRef = useRef([]);

  useEffect(() => {
    fetch('https://ad5fd43ff3494e53ae90dfd8c03a23f9.api.mockbin.io')
      .then(response => response.json())
      .then(data => {
        let filteredUsers = data;

        // Apply gender filter
        if (genderFilter) {
          filteredUsers = filteredUsers.filter(user => user.gender === genderFilter);
        }

        // Apply age range filter
        if (ageRangeFilter) {
          const [minAge, maxAge] = ageRangeFilter.replace(/[^0-9-]/g, '').split('-').map(Number);
          filteredUsers = filteredUsers.filter(user => {
            const dob = new Date(user.dob.split('/').reverse().join('-'));
            const currentYear = new Date().getFullYear();
            const age = currentYear - dob.getFullYear() - (new Date().getMonth() < dob.getMonth() || (new Date().getMonth() === dob.getMonth() && new Date().getDate() < dob.getDate()) ? 1 : 0);
            return (minAge ? age >= minAge : true) && (maxAge ? age <= maxAge : true);
          });
        }

        // Apply sorting
        if (sortBy) {
          filteredUsers.sort((a, b) => {
            if (sortBy === 'score') {
              return b.score - a.score;
            } else if (sortBy === 'date_joined') {
              return new Date(b.created_at) - new Date(a.created_at);
            }
            return 0;
          });
        }

        allUsersRef.current = filteredUsers;
        refreshUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [genderFilter, ageRangeFilter, sortBy]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to refresh users, excluding user ID 10 assuming user id 10 is the user
  const refreshUsers = (usersToShuffle) => {
    let filteredUsers = usersToShuffle.filter(user => user.id !== 10);
    let shuffledUsers = shuffleArray(filteredUsers);
    let newDisplayedUsers = shuffledUsers.slice(0, 5);
    setDisplayedUsers(newDisplayedUsers);
    setRemainingUsers(shuffledUsers.slice(5));
  };

  const handleRefresh = () => {
    if (remainingUsers.length < 5) {
      refreshUsers(allUsersRef.current);
    } else {
      refreshUsers(remainingUsers);
    }
  };

  const calculateAge = (dob) => {
    const [day, month, year] = dob.split('/').map(Number);
    const dobDate = new Date(year, month - 1, day);
    const now = new Date();
    let age = now.getFullYear() - dobDate.getFullYear();
    const monthDiff = now.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dobDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleViewPress = (userId, dob) => {
    const age = calculateAge(dob);
    navigation.navigate('OtherProfileScreen', { userId, age });
  };

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Image source={{ uri: item.photos[0].path }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={[textStyle.textBoldMedium, styles.userName]}>
          {item.first_name} {item.last_name}, {calculateAge(item.dob)}
        </Text>
        <Text style={textStyle.textStyleForFilter}>{item.gender}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={textStyle.textBoldMedium}>{item.location.city}, {item.location.country}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleViewPress(item.id, item.dob)}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={containerStyle.centerContainer}>
      <View style={containerStyle.moveToRightContainer}>
        <TouchableOpacity style={[styles.moveToRightContainer, styles.noBorder]} onPress={() => navigation.navigate('FilterScreen')}>
          <Text style={styles.textStyleForFilter}>Filter</Text>
        </TouchableOpacity>
      </View>
      <Text style={textStyle.textBoldMedium}>Daily Connections</Text>
      <TouchableOpacity style={containerStyle.centerButtonContainer} onPress={handleRefresh}>
        <Text style={styles.textStyle}>Refresh</Text>
      </TouchableOpacity>
      <FlatList
        data={displayedUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 360,
    height: 350,
  },
  avatar: {
    width: 360,
    height: 210,
    borderRadius: 10,
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  userName: {
    textAlign: 'left',
    fontSize: 22,
    color: 'black',
    margin: 5,
    fontWeight: '400',
  },
  button: {
    marginTop: 10,
    paddingVertical: 3,
    paddingHorizontal: 40,
    backgroundColor: 'tomato',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'tomato',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  noBorder: {
    borderColor: 'transparent',
  },
  textStyle: {
    fontSize: 16,
    color: 'tomato',
  },
  textStyleForFilter: {
    fontSize: 18,
    color: '#007BFF',
  },
});

export default ActivityScreen;
