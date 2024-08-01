// landing screen
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import ActivityScreen from './screens/activity_screen';
import UserProfileScreen from './screens/user_profile_screen';

//screen names
const activity ='Activity';
const userProfile ='User Profile';

const Tab= createBottomTabNavigator();

export default function LandingScreen({navigation}){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={activity}
            screenOptions={({route})=>({
                tabBarIcon:({focused,color,size}) => {
                    let iconName;
                    let rn=route.name;

                    if(rn ===activity){
                        iconName = focused ? 'compass':'compass-outline'
                    }else if(rn ===userProfile){
                        iconName =focused ? 'person':'person-outline'
                    }

                    return <Ionicons name = {iconName} size={size} color={color}/>
                },
                headerShown: false,
            })}
            tabBarOptions={{
                activeTintColor: 'tomato', // Change this to the desired color for active icon
                inactiveTintColor: 'gray', // Change this to the desired color for inactive icon
              }}>

               <Tab.Screen name = {activity} component ={ActivityScreen}/>
               <Tab.Screen name = {userProfile} component ={UserProfileScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}
