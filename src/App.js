import { Route, Routes } from 'react-router-dom';
import { Fragment, useEffect } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';

import { getAllGames } from '@/api/game_api';
import { useDispatch } from 'react-redux';
import { setGames } from '@/_redux/features/games/gamesSlice';
// Store

const config = {
    apiKey: 'AIzaSyDnjD8rqgAJHlrwPC-WB4hLygjnOFa4DOA',
    authDomain: 'soa-auth-be6e5.firebaseapp.com',
};
firebase.initializeApp(config);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getStore = async () => {
            const gameRes = await getAllGames();
            dispatch(setGames(gameRes.data));
        };

        getStore();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                if (!user) {
                    console.log('User is not logged in');
                    return;
                }
            });
        return () => unregisterAuthObserver();
    }, []);

    return (
        <div className='App'>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
