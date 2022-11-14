import React, { memo } from 'react'
import "@walletconnect/react-native-compat"
import { Provider } from 'react-redux'
import Navigator from './src/routes/Navigator'
import store from './src/state/configureStore'
import { theme } from './src/theme'
import styled, { ThemeProvider } from 'styled-components/native'
import { useFonts } from 'expo-font'
import { LogBox } from 'react-native'

const App = memo(() => {
  const [fontsLoaded] = useFonts({
    MontserratBold: require('./src/assets/fonts/Montserrat-Bold.ttf'),
    MontserratMedium: require('./src/assets/fonts/Montserrat-Medium.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }

  LogBox.ignoreAllLogs()

  return (
    <NavWrapper>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </ThemeProvider>
    </NavWrapper>
  )
})

const NavWrapper = styled.View`
  background-color: white;
  flex: 1;
`

export default App
