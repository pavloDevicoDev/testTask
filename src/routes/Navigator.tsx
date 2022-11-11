import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import ROUTES from './RouteNames'
import LoadingPage from '../screens/Initialization/LoadingPage'
import AddWalletPage from '../screens/AddWalletFlow/AddWalletPage'
import ImportWalletPage from '../screens/AddWalletFlow/ImportWalletPage'
import ImportSeedPhrase from '../screens/AddWalletFlow/ImportSeedPhrase'
import ImportQRCode from '../screens/AddWalletFlow/ImportQRCode'
import MainWalletPage from '../screens/UseWalletFlow/MainWalletPage'
import CreateTransactionPage from '../screens/UseWalletFlow/CreateTransactionPage'

const Stack = createStackNavigator()

const Navigator = () => {
  const options: StackNavigationOptions = {
    headerShown: false,
    presentation: 'modal',
    animationTypeForReplace: 'push',
  }
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator key={1} initialRouteName={ROUTES.Initialization}>
          <Stack.Screen
            component={LoadingPage}
            name={ROUTES.Initialization}
            options={options}
          />
          <Stack.Screen
            component={AddWalletPage}
            name={ROUTES.AddNewWallet}
            options={options}
          />

          <Stack.Screen
            component={ImportWalletPage}
            name={ROUTES.ImportWallet}
            options={options}
          />
          <Stack.Screen
            component={ImportSeedPhrase}
            name={ROUTES.ImportSeedPhrase}
            options={options}
          />
          <Stack.Screen
            component={ImportQRCode}
            name={ROUTES.ImportQRWallet}
            options={options}
          />
          <Stack.Screen
            component={MainWalletPage}
            name={ROUTES.MainPage}
            options={options}
          />
          <Stack.Screen
            component={CreateTransactionPage}
            name={ROUTES.CreateTransactionPage}
            options={options}
          />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  )
}

export default Navigator
