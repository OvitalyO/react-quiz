import { StoreProvider } from '@/app/providers/store/StoreProvider.tsx'
import { AppRouter } from './providers/router/AppRouter'
import { ThemeProvider } from './providers/theme/ThemeProvider'
import { Header } from '@/widgets/Header'

export const App = () => {
  console.log('App')

  return (
    <StoreProvider>
      <ThemeProvider>
        <Header />
        <AppRouter />
      </ThemeProvider>
    </StoreProvider>
  )
}
