import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom'

import { useAuth } from './hooks/useAuth'

// Pages
import { Authenticate } from './pages/Authenticate'
import { Browser } from './pages/Browser'

function PrivateRoute({ children, ...rest }: RouteProps) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/signIn', state: { from: location } }} />
        )
      }
    />
  )
}

function RoutePrivateForAuthenticated({ children, ...rest }: RouteProps) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <Redirect to={{ pathname: '/browser', state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  )
}

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <RoutePrivateForAuthenticated exact path="/">
          <Authenticate />
        </RoutePrivateForAuthenticated>

        <RoutePrivateForAuthenticated path="/signIn">
          <Authenticate />
        </RoutePrivateForAuthenticated>

        <RoutePrivateForAuthenticated path="/signUp">
          <Authenticate />
        </RoutePrivateForAuthenticated>

        <PrivateRoute path="/">
          <Browser />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
