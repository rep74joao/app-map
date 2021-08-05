import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home'

const Drawer = createDrawerNavigator();

import DrawerCustom from '../components/DrawerCustom';

export default () => {
    return (
        <Drawer.Navigator
            //drawerContent={(props) => <DrawerCustom {...props}/>}
            screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#F5F6FA',
                    shadowOpacity: 0,
                    elevation: 0
                }
            }}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
            />
        </Drawer.Navigator>
    )
}