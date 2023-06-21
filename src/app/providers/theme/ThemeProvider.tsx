import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props
  console.log('ThemeProvider')

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: '__colorScheme',
    defaultValue: 'light',
    getInitialValueInEffect: false
  })

  const toggleColorScheme = (value?: ColorScheme) => {
    const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(newValue)
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withGlobalStyles>
      { children }
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
