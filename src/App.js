// import React, { useState, useEffect } from 'react';
import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

// import AuthContext, { AuthContextProvider } from './context/auth-context';
import AuthContext from './context/auth-context';

function App() {
  //Move all of this to custom AuthContextProvider
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  //   if (storedUserLoggedInInformation === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn', '1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  // };


  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <Login onLogin={authCtx.onLogin} />}
        {authCtx.isLoggedIn && <Home onLogout={authCtx.onLogout} />}
      </main>
    </React.Fragment>
  );
  //provider takea a prop value<- name is fixed
  //the object inside the value prop has attribute as defined in the AuthCOntext
  // the isLoggedIn value for the prop comes from the state above
  //by wrapping at the level with the provider, all the components here and 
  // their children inherit the provider
  //move all of the authentication to index.js and remove from here.
  // return (
  //   <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>
  //     <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
  //     <main>
  //       {!isLoggedIn && <Login onLogin={loginHandler} />}
  //       {isLoggedIn && <Home onLogout={logoutHandler} />}
  //     </main>
  //   </AuthContext.Provider>
  // );
}

export default App;
