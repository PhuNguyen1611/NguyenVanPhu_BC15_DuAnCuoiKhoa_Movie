import { Suspense, lazy } from 'react';
import './index.css';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import { Route, Router, Switch } from 'react-router-dom';
import News from './pages/News/News';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { createBrowserHistory } from 'history';
import Detail from './pages/Detail/Detail';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import Showtime from './pages/Admin/Showtime.js/Showtime';
import Users from './pages/Admin/Users/Users';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import AddUser from './pages/Admin/Users/AddUser';
import EditUser from './pages/Admin/Users/EditUser';

// const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'))

export const history = createBrowserHistory();


function App() {
  return (

    <Router history={history}>
      <Loading />
      <Switch>
        <ScrollToTop>
          <HomeTemplate exact path='/home' Component={Home} />
          <HomeTemplate exact path='/news' Component={News} />
          <HomeTemplate exact path='/contact' Component={Contact} />
          <HomeTemplate exact path='/detail/:id' Component={Detail} />
          <HomeTemplate exact path='/profile' Component={Profile} />

          {/* <Suspense fallback={<h1>LOADING...</h1>}>
          <CheckoutTemplateLazy exact path='/checkout/:id' Component={Checkout} />
        </Suspense> */}

          <CheckoutTemplate exact path='/checkout/:id' Component={Checkout} />
          <UserTemplate exact path='/login' Component={Login} />
          <UserTemplate exact path='/register' Component={Register} />

          <AdminTemplate exact path='/admin' Component={Dashboard} />
          <AdminTemplate exact path='/admin/users' Component={Users} />
          <AdminTemplate exact path='/admin/users/adduser' Component={AddUser} />
          <AdminTemplate exact path='/admin/users/edituser/:taiKhoan' Component={EditUser} />
          <AdminTemplate exact path='/admin/films' Component={Films} />
          <AdminTemplate exact path='/admin/films/addnew' Component={AddNew} />
          <AdminTemplate exact path='/admin/films/edit/:id' Component={Edit} />
          <AdminTemplate exact path='/admin/films/showtime/:id/:tenphim' Component={Showtime} />

          <HomeTemplate exact path='/' Component={Home} />
        </ScrollToTop>
      </Switch>
    </Router>

  );
}

export default App;
