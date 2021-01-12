import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import './index.css';

import BottomPanel from './components/BottomPanel/BottomPanel';
import Alert from './components/common/Alert/Alert';
import AuthProvider from './components/ModuleAccount/AuthProvider';
import Preloader from './components/common/preloader/Preloader';
//import './components/JinnBot/Chat/Chat';

const Home = React.lazy(() => import('./components/Landings/Home/Home'));
const CreateBot = React.lazy(() => import('./components/ModuleJinnBot/CreateBot/CreateBot'));
// const ChatPage = React.lazy(() => import('./components/JinnBot/ChatPage/ChatPage'));
const RegisterContainer = React.lazy(() => import('./components/ModuleAccount/auth/register/Register'));
const LoginContainer = React.lazy(() => import('./components/ModuleAccount/auth/login/Login'));
const JPods = React.lazy(() => import('./components/Landings/JPods/JPods'));
const ProfileContainer = React.lazy(() => import('./components/ModuleAccount/profile/ProfileSettings/Profile'));
const ChatsDashboard = React.lazy(() => import('./components/ModuleJinnBot/ChatsDashboard/ChatsDashboard'));
const Page = React.lazy(() => import('./components/Landings/Price/Price'));
//const Portfolio = React.lazy(() => import('./components/Portfolio/test/Portfolio'));
const ResumeDesign = React.lazy(() => import('./components/Landings/Resume/Design/index/i'));
const PortfolioDesign = React.lazy(() => import('./components/Landings/Portfolio/Design/index/i'));

function Main() {
    return <BrowserRouter>
        <Provider store={store}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </Provider>
    </BrowserRouter>
}

function App() {
    useEffect(() => {
        const adaptiveHeight = () =>
            document.documentElement.style.setProperty('--adaptiveHeight', `${window.innerHeight}px`);
        adaptiveHeight()
        window.addEventListener('resize', adaptiveHeight);
        return () => window.removeEventListener('resize', adaptiveHeight);
    })
    return <div className="App">
        <Switch>
            <Route exact path="/" render={() => <React.Suspense fallback={<Preloader/>}><Home/></React.Suspense>}/>

            {/*<Route exact path="/auth" render={() => <Auth/>}/>*/}
            <Route exact path="/register" render={() => <React.Suspense fallback={<Preloader/>}><RegisterContainer /></React.Suspense>}/>
            <Route exact path="/login" render={() => <React.Suspense fallback={<Preloader/>}><LoginContainer /></React.Suspense>}/>
            <Route exact path="/profile" render={() => <React.Suspense fallback={<Preloader/>}><ProfileContainer /></React.Suspense>}/>

            <Route exact path="/create" render={() => <React.Suspense fallback={<Preloader/>}><CreateBot/></React.Suspense>}/>
            <Route exact path="/chats/dashboard" render={() => <React.Suspense fallback={<Preloader/>}><ChatsDashboard/></React.Suspense>}/>
            {/*<Route exact path="/j:id" render={() => <React.Suspense fallback={<Preloader/>}><ChatPage/></React.Suspense>}/>*/}
            <Route exact path="/airpods" render={() => <React.Suspense fallback={<Preloader/>}><JPods/></React.Suspense>}/>
            <Route exact path="/price" render={() => <React.Suspense fallback={<Preloader/>}><Page/></React.Suspense>}/>

            {/*<Route exact path="/andriy" render={() => <React.Suspense fallback={<Preloader/>}><Portfolio/></React.Suspense>}/>*/}
            <Route exact path="/nness" render={() => <React.Suspense fallback={<Preloader/>}><ResumeDesign/></React.Suspense>}/>
            <Route exact path="/andriy" render={() => <React.Suspense fallback={<Preloader/>}><PortfolioDesign/></React.Suspense>}/>
        </Switch>

        <BottomPanel/>

        <Alert/>
    </div>
}


export default Main;