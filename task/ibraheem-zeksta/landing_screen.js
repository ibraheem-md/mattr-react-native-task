import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// screens
import ActivityScreen from './screens/activity_screen';
import UserProfileScreen from './screens/user_profile_screen';
import FilterScreen from './screens/filter_screen';
import OtherProfileScreen from './screens/other_profile';


// screen names
const activity = 'Activity';
const userProfile = 'User Profile';
const other_profile = 'OtherProfileScreen';
const filter_screen = 'FilterScreen';


// Create stack navigators
const ActivityStack = createStackNavigator();
const UserProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function ActivityStackNavigator() {
  return (
    <ActivityStack.Navigator screenOptions={{ headerShown: false }}>
      <ActivityStack.Screen name={activity} component={ActivityScreen} />
      <ActivityStack.Screen name={other_profile} component={OtherProfileScreen} />
      <ActivityStack.Screen name={filter_screen} component={FilterScreen} />
    </ActivityStack.Navigator>
  );
}

function UserProfileStackNavigator() {
  return (
    <UserProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <UserProfileStack.Screen name={userProfile} component={UserProfileScreen} />
    </UserProfileStack.Navigator>
  );
}

export default function LandingScreen({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={activity}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === activity) {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (rn === userProfile) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: '#F76558', // Change this to the desired color for active icon
        inactiveTintColor: 'black', // Change this to the desired color for inactive icon
      }}
    >
      <Tab.Screen name={activity} component={ActivityStackNavigator} />
      <Tab.Screen name={userProfile} component={UserProfileStackNavigator} />
    </Tab.Navigator>
  );
}
