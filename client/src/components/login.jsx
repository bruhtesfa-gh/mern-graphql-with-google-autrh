import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

const GoogleOAuth = () => {
    const login = useGoogleLogin({
        onSuccess: async respose => {
            console.log(respose)
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })

                console.log(res.data)
            } catch (err) {
                console.log(err)

            }

        }
    });
    return (
        <React.Fragment>
            <button onClick={login}>
                <i className="fa-brands fa-google"></i>
                Continue with google
            </button>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse.credential);
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log(decoded)
                }}
                onError={() => {
                    console.log('Login Failed');
                }} />
        </React.Fragment>
    );
};

export default GoogleOAuth;