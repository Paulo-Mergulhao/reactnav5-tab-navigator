import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Home from '../telas/Home'
import Detalhe from '../telas/Detalhe'
import Configuracoes from '../telas/Configuracoes'
import Perfil from '../telas/Perfil'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home'

  switch (routeName) {
    case 'Home':
      return 'Home'
    case 'Perfil':
      return 'Perfil'
  }
}

function MainTabNavigator() {
  return (
    
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#101010',
          style: {
            backgroundColor: '#ffd700'
          }
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName
            if (route.name == 'Home') {
              iconName = 'ios-home'
            } else if (route.name == 'Perfil') {
              iconName = 'ios-person'
            }
            return <Ionicons name={iconName} color={color} size={size} />
          }
        })}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Perfil' component={Perfil} />
      </Tab.Navigator>
    
  )
}

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#101010'
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#ffd700',
          headerBackTitleVisible: false
        }}
        headerMode='float'>
        <Stack.Screen
          name='Home'
          component={MainTabNavigator}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route)
          })}
        />
        <Stack.Screen
          name='Detalhe'
          component={Detalhe}
          options={({ route }) => ({
            title: route.params.item.Nome
          })}
        />
        <Stack.Screen
          name='Configuracoes'
          component={Configuracoes}
          options={{ title: 'Configurações' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

