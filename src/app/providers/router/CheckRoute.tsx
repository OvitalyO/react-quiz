import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { routePaths } from '@/shared/routePaths/routePaths'
import { RouteType } from './types.ts'

interface CheckRouteProps {
  type: RouteType
  children: ReactNode
}

export const CheckRoute = (props: CheckRouteProps) => {
  const { type, children } = props

  const isAuth = true

  if (type === 'onlyAuth' && !isAuth) {
    return <Navigate to={routePaths.login()} replace />
  }

  if (type === 'onlyAnonymous' && isAuth) {
    return <Navigate to={routePaths.catalog()} replace />
  }

  // Оставшийся тип 'public' доступен всем, проверять ничего не нужно
  return children
}

/*
* Самостоятельно указываю куда произойдет редирект взависимости от типа роута
* routePaths.login() и routePaths.catalog()
* */
