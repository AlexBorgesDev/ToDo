import { BrowserRouter, Switch, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Browser from './pages/Browser'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />

        <Route path="/signup" component={SignUp} />

        <Route path="/browser" component={Browser} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
