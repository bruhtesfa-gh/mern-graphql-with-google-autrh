import './App.css';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
// import { GoogleLogin } from 'react-google-login';
import { useGoogleLogin } from '@react-oauth/google';
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

import jwt_decode from "jwt-decode";
import GoogleOAuth from './components/login';

function App() {

  // const login = useGoogleLogin({
  //   onSuccess: CodeResponse => {
  //     const hasAccess = hasGrantedAllScopesGoogle(
  //       CodeResponse,
  //       'https://www.googleapis.com/auth/userinfo.email',
  //       'https://www.googleapis.com/auth/userinfo.profile',
  //     );
  //     let decoded = jwt_decode(CodeResponse.access_token);
  //     console.log(decoded);
  //   },
  // });
  const responseGoogle = (response) => {
    console.log(response)
    const userObject = jwt_decode(response.credential)
    console.log(userObject)
    //  localStorage.setItem('user', JSON.stringify(userObject));
    //  const { name, sub, picture } = userObject;
    //  const doc = {
    //    _id: sub,
    //    _type: 'user',
    //    userName: name,
    //    image: picture,
    //  };
    //  client.createIfNotExists(doc).then(() => {
    //    navigate('/', { replace: true });
    //  });

  }
  //105551671185600549157
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="124937104161-ep6gdt00m2gd7rkshdk9u7bf86js5aaq.apps.googleusercontent.com">
        {/* <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log('Login Failed')
          }}
          cookiePolicy="single_host_origin"
        /> */}
        <GoogleOAuth />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
