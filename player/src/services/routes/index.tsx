import {Route, Routes} from 'react-router-dom'
import { SignIn } from '../../pages/signIn'
import { Main } from '../../pages/main'
import PrivateRoute from './privateRoute'
export default function RouteContext() {


  return (
    <Routes>
      <Route Component={SignIn} path='/'/>
      <Route element={<PrivateRoute isPrivate/>}>
        <Route Component={Main} path='/main'/>
      </Route>

    </Routes>
  )
}