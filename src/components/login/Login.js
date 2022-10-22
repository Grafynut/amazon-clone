import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Content from '../Content';
import './login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();


    // authentication
    // signIn
    const signIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((authValue) => {
                history('/')
            })
            .catch(error => alert(error.message));
    };

    // register
    const register = e => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((authValue) => {
                // it successfully created user----
                if (authValue) {
                    history('/');
                }
            })
            .catch(error => alert(error.message))
    }

    // email Check
    let emailValed = false;
    if (email.length > 1) {
        if (email.includes(" ") || !email.includes('@') || !email.includes('.') || email.indexOf('.') === email.length - 1
            || email.indexOf('@') + 4 > email.indexOf('.') || email.indexOf('@') < 2
        ) {
            emailValed = true;
        } else {
            emailValed = false;
        }
    }

    return (
        <div className='login_container'>
            <Link to={'/'} >
                <div className='logo'>
                    <img src={Content.logo.logo_black} alt='amazon' />
                    <span>.in</span>
                </div>
            </Link>
            <div className='login_form_container'>
                <h1 className='heading'>Sign In</h1>
                <form action='/' method='get' className='login_form'>
                    <label htmlFor="email">Email or mobile phone number</label>
                    <input type='email' id='email' className="inputBox" autoFocus required name='email' value={email} onChange={e => setEmail(e.target.value)} style={emailValed ? { outlineColor: 'red', borderColor: 'red' } : { outlineColor: '#000', borderColor: 'initial' }} />
                    {emailValed ? null : <>
                        <label htmlFor="password">Password</label>
                        <input type='password' id='password' className="inputBox" required value={password} onChange={e => setPassword(e.target.value)} />
                        <input type='submit' value='Login' className="loginBtn" onClick={signIn} />
                    </>}

                </form>
            </div>
            {emailValed ? null : <>
                <div className='singUp_btn_section'>
                    <div className='question'><div className='p'>New to Amazon?</div></div>
                    <button className='account_create_btn' onClick={register}>Create your Amazon account</button>
                </div>
            </>
            }
        </div>
    )
}

export default Login