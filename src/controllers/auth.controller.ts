import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  
  signInWithCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import serviceAccount from "../../fir-authentication-137f9-firebase-adminsdk-rxl8m-a541e58d67.json";
import admin from "firebase-admin";
import { google } from "googleapis";
import dotenv from "dotenv";
import addNewToken from "../utils/token";
import jwt from "jsonwebtoken"
dotenv.config();
import { initializeApp } from "firebase/app";
import { ServiceAccount } from "@google-cloud/storage";
import axios from "axios";
type Request = {
  body: any;
  user: any;
  headers:any;
};

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URL;

const oauth2Client = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  redirectUri
);
const firebaseAdminConfig = {
  type: "service_account",
  project_id: "fir-authentication-137f9",
  private_key_id: "a541e58d6790456ee865601e2996d697dc142300",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9CeguuU2iKP4x\nc62upgfNWsy7eDHFA4WKEpLlASevwqU0hnkybUhAJirocDYrBbuGUbuo7tHiTodv\n/TKjnlb6rWBA1VQpW+ukcUKH8gMBwOGo4MtL+OrDqXIO9Z2AKMItxV5Fkp4VEjN7\nwutv4TpbyJPHe5jGhBRQ1vuGrs0HBe1BO4aO54vLrO20T42yVZ9iYPAALa211HBw\n9covPfg22Rki1GvyTQikhe1rjv+js4VWYRAHFYgSuS9g9uIviMNaw0FYGSW2sVmw\nt7z+m/Vsz8nQ4B56nA5nKoerVKtRsMRKvPPKmECzjbXlvQdhITdfK1d5OOPRwLwz\nPWGO519dAgMBAAECggEAB4CiJ2CRVTM9S2ck6H6MZrkI0RPnHcOTBDTSgaY3FgGq\nntgLbVXq/SjGoSz66WAz3hPWV9EKoWmudGJfJSE+oHpLDKeqzG1qf79C/bQ8LFCk\nZBhv2RcK8jMCZNeYpaJ4emqP4ED+ZyWux2WoBGuy7juaqdsc6BwL1l2B5AmB95pS\nARwycJNfAqm6KTma0yjI8aeOOhuOZGUTG9WTkAq8NOTXHcUZbMibAfjmV3kXpaRP\nFP68AlfqJpAucaxp0bmfY2UQAlItWEqYP4PjT2/DTWHVr8XYWFmNY6FaoDfSctbK\nMGy823Uqh8JW/Cggo943yb5o48BuCTrfSzguAPZ7QQKBgQD6kfraegL6UfzonEQq\nXwkASS1SxBZQ5OEb3lLzvKhS0w1gfjfkathY78ZfRjb9vf/wmLr2KyT37I3pXFX+\nPO6aSCq2G1mh1dF7vJrwdQ5cmfN2HAGPt5fK9L8gs9mBy1R8Y6oj1mswC4iu3lx3\nYTuFn61603rcT1hZADl3cu4BLQKBgQDBIpXaXPUk6SEHES2JPeGf8OWsnzmpydFs\nTUdDvEZKxzL3ecaitKEYkZ6/0CohUhH/G13CWlK9xUmWWJkRAxgIfiDrXAdMhKhN\njiHV9Dy36UmrPmnQyO6izTEDAqhF53su4cQLrYFqU+FTKO242Iqvr1SokL8iBNQC\n7pBxCLvU8QKBgBjouCpN5MvjqKOrHS+lIOzxWVsX+SvzhNlTYaWvRIBvUK4d/gps\nALPeqjbAcSkKYU4WsMdWBKfM0VK4hifvAL0/nVdbIq7u5ZNKbZCn4lScTVKZeCJE\nWwenCvUCTAYWI4D2G2zSnPc6vky7+C858EPZWtKSAW2zSZIXbp8MQtLFAoGAa/6Q\n2Kd+FIOfijoawlEt5qdnZh0quzw0tGCJ5uBSVeIJJ8SaQ8TJB9n1cMBPro4brhB5\nXwHunlrBCSbFgHPAbo9IjRLKqgjLq4I8fUyy3wu9u9mMhci1V6dxLoO/4EbN5Kst\nWnJMmU4KAtwyAVhkRFS/+/nkRnt4qaMIdYwyq6ECgYEAiTVL9EY4UvfgnRlTW3cT\na5EfuaCs8QxFa2AwwSTzghtmLGZF6k+PVMVQS8KovkVIW8u1O3d5u5GasvmSWpqp\n1gYVgu+9kpgoXnOI7unszUce7aqCeUfgw1Nnufs4Ac0imcRQpIpSajzz/E6qefQW\nk3PsLhxn9kkWl0DKUcjGxek=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-rxl8m@fir-authentication-137f9.iam.gserviceaccount.com",
  client_id: "116950190022286600027",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rxl8m%40fir-authentication-137f9.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const firebaseConfig = {
  apiKey: "AIzaSyAUnTmv5xA-lIUw3Tn1SEMTiu9wq98FEOI",
  authDomain: "fir-authentication-137f9.firebaseapp.com",
  projectId: "fir-authentication-137f9",
  storageBucket: "fir-authentication-137f9.appspot.com",
  messagingSenderId: "1096148953479",
  appId: "1:1096148953479:web:1f5ea33217cd82939b4b22",
  measurementId: "G-X64TMX924G",
};

const app = initializeApp(firebaseConfig);
 admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(firebaseAdminConfig))),
}) ;
export const register = async (req: Request, res: any) => {
  try {
    const { email = "", password = "" } = req.body;
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("user details", user);
    return res.status(200).json({ data: user });
  } catch (error: any) {
    console.error("error occoured during registration", error);

    switch (error.code) {
      case "auth/email-already-in-use":
        console.log(`Email address already in use.`);
        return res.status(409).json({ error: "email already in use" });
      case "auth/invalid-email":
        return res.status(403).json({ error: "invalid email" });
      case "auth/operation-not-allowed":
        return res.status(500).json({ error: "Error during sign up" });
      case "auth/weak-password":
        return res.status(401).json({
          error:
            "Password is not strong enough. Add additional characters including special characters and numbers.",
        });

      default:
        return res.status(500).json({ error: error.message });
    }
  }
};

export const login = async (req: Request, res: any) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    addNewToken(req, res, userCredential);
    const { access = "", refresh = "" } = res.locals;
    return res.status(200).json({ data: userCredential, access, refresh });
  } catch (error) {
    console.error("error occoured to login user", error);
    return res.status(500).json({ error: "error occoured to login user" });
  }
};

export const googlelogin = async (req: Request, res: any) => {
  try {
    const scopes = ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"];
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });
    return res.status(200).json({ data: authUrl });
  } catch (error) {
    console.error("error occoured to login user", error);
    return res.status(500).json({ error: "error occoured to login user" });
  }
};

export const googleUser = async (req: Request, res: any) => {
  try {
    const authorizationCode = req.body.code;
    const { tokens }:any = await oauth2Client.getToken(authorizationCode);
    const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then((res: any) => res.data)
    .catch((error: any) => {
      console.error(`Failed to fetch user`, error);
      throw new Error(error);
    });
    const firebaseCreate = await admin.auth().createUser({email:googleUser.email})
    return res.status(200).json({ data: firebaseCreate });
  } catch (error) {
    console.error("error occoured to login user", error);
    return res.status(500).json({ error: "error occoured to login user" });
  }
};

export const validateToken = async (req: Request, res: any) => {
  try {
    const authorizationCode = req.body.code;
    const { tokens } = await oauth2Client.getToken(authorizationCode);
    oauth2Client.setCredentials(tokens);

    const payload = {
      type: "authorized_user",
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      expiry_date: tokens.expiry_date,
    };
    return res.status(200).json({ data: googleUser });
  } catch (error) {
    console.error("error occoured to login user", error);
    return res.status(500).json({ error: "error occoured to login user" });
  }
};
export const logout = (req: object, res: any) => {};
