import { BrowserRouter, Switch, Route } from 'react-router-dom'

import SignIn from './pages/SingIn'
import SignUp from './pages/SignUp'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />

        <Route path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
