import { createReduxStore } from './config/store'
import { Provider } from 'react-redux'
import { ReactNode } from 'react'

interface StoreProviderProps {
  children?: ReactNode
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props

  const store = createReduxStore()

  console.log('StoreProvider')

  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
}
