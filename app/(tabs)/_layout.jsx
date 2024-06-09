import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import { icons } from '../../constants'


const TabIcon = ({ icon, color, focused, name }) => {
    return (
        <View className='flex justify-center items-center gap-1'>
            <Image source={icon} resizeMode='contain' className='w-6 h-6' tintColor={color} />
            <Text className={`${focused ? 'font-verdanaBold' : 'font-verdana'} text-xs`} style={{color:color}} >{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor:'#ffffff',
                tabBarInactiveTintColor:'#34d399',
                tabBarStyle:{
                    backgroundColor:'#064e3b',
                    height:55,
                    borderTopWidth:1,
                    borderTopColor:'#10b981'
                }
            }}>
                <Tabs.Screen name='home'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                focused={focused}
                                name={"Home"}
                            />
                        )
                    }}
                />
                <Tabs.Screen name='profile'
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                focused={focused}
                                name={"Profile"}
                            />
                        )
                    }}
                />
                <Tabs.Screen name='create'
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                focused={focused}
                                name={"Create"}
                            />
                        )
                    }}
                />
                <Tabs.Screen name='bookmarks'
                    options={{
                        title: 'Bookmarks',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                focused={focused}
                                name={"Bookmarks"}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout