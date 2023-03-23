import './App.css';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';
function App() {

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      const hasAccess = hasGrantedAllScopesGoogle(
        tokenResponse,
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      );
      console.log(hasAccess)
    },
  });
  return (
    <div className="App">

      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
