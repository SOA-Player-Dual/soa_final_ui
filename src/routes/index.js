import Home from '@/pages/Home/Home';
// import SignIn from '@/pages/Auth/SignIn';
// import SignUp from '@/pages/Auth/SignUp';
// import ForgotPassword from '@/pages/Auth/SignIn/ForgotPassword';
import Profile from '@/pages/Profile';
import UserProfile from '@/pages/UserProfile';
import Messenger from '@/pages/Messenger';
import ErrorPage from '@/layouts/ErrorPage/ErrorPage';

const publicRoutes = [
    { path: '/*', component: ErrorPage },
    { path: '/', component: Home },
    // { path: '/login', component: SignIn, layout: null },
    // { path: '/register', component: SignUp, layout: null },
    // { path: '/forgot-password', component: ForgotPassword, layout: null },
    { path: '/user/profile/:nickname', component: UserProfile },
    { path: '/profile/:urlCode', component: Profile },
    { path: '/messenger', component: Messenger },
];

export { publicRoutes };
