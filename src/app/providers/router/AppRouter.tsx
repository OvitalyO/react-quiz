import { CheckRoute } from '@/app/providers/router/CheckRoute'
import { AboutPage } from '@/pages/AboutPage'
import { CatalogPage } from '@/pages/CatalogPage'
import { ErrorPage } from '@/pages/ErrorPage'
import { LoginPage } from '@/pages/LoginPage'
import { QuizPage } from '@/pages/QuizPage'
import { IconLoader } from '@tabler/icons-react'
import { memo, Suspense } from 'react'
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { routePaths } from '@/shared/routePaths/routePaths'

const router = createBrowserRouter([
  {
    path: routePaths.login(),
    element: <CheckRoute type='onlyAnonymous' children={<LoginPage/>} />,
    errorElement: <ErrorPage />
  },
  {
    path: routePaths.catalog(),
    element: <CheckRoute type='onlyAuth' children={<CatalogPage/>} />,
    errorElement: <ErrorPage />
  },
  {
    path: routePaths.quiz(':id'),
    element: <CheckRoute type='onlyAuth' children={<QuizPage/>} />,
    errorElement: <ErrorPage />
  },
  {
    // Добавил для примера как тип 'public'
    path: routePaths.about(),
    element: <CheckRoute type='public' children={<AboutPage/>} />,
    errorElement: <ErrorPage />
  }
] as RouteObject[])

export const AppRouter = memo(() => {
  // Настройка роутера — https://reactrouter.com/en/main/start/overview
  return (
    // Suspense нужен, потому что страницы lazy
    <Suspense fallback={<IconLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
})
