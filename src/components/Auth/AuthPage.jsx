import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../../services/firebase';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../store/profileReducer';

export function AuthPage () {
  const dispatch = useDispatch();
  const [signUpInputs, setSignUpInputs] = useState({email: '', password: ''})
  const [signInInputs, setSignInInputs] = useState({email: '', password: ''})
  const [isRegForm, setIsRegForm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isReg, setIsReg] = useState(false)
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault(),
    setLoading(true);
    setError(null);
    try {
      await signUp(signUpInputs.email, signUpInputs.password);
      setIsRegForm(false)
      setIsReg(true)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
      setSignUpInputs({email: '', password: ''})
    }
  }

  const handleSignIn = async(e) => {
    e.preventDefault(),
    setLoading(true);
    setError(null);
    try {
      await signIn(signInInputs.email, signInInputs.password);
      dispatch(setAuth(true))
      // navigate('/')
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
      setSignInInputs({email: '', password: ''})
    }
  }

  return (
    <div id='enter-p'>
      <form action="" id='auth-form'>
        <p className='auth-text'>{isReg ? 'You registered succesfully, please enter' : 'To enter please input email & password or register' }</p>
        <input 
          type="email"
          name="email" 
          className='b-transp' 
          placeholder='Email'
          value={signInInputs.email}
          onChange={(e) => setSignInInputs((prev) => ({...prev, [e.target.name]: e.target.value}))} />
        <input 
          type="password" 
          maxLength="25" 
          name="password" 
          className='b-transp' 
          placeholder='Password'
          value={signInInputs.password}
          onChange={(e) => setSignInInputs((prev) => ({...prev, [e.target.name]: e.target.value}))} />
        <input type="submit" value="Enter" className="b-transp enter-btn" onClick={handleSignIn}/>
        {error && <h4 style={{color: 'red'}}>Sorry, error occured: {error}</h4>}
      </form>
      {!isRegForm && <input type="submit" value="Register" className="b-transp enter-btn" onClick={() => setIsRegForm(true)}/>}
      {isRegForm && <form action="" id='reg-form'>
        <p className='auth-text'>To register please input email & password</p>
        <input 
          type="email"
          name="email" 
          className='b-transp' 
          placeholder='Email'
          value={signUpInputs.email}
          onChange={(e) => setSignUpInputs((prev) => ({...prev, [e.target.name]: e.target.value}))} />
        <input 
          type="password" 
          maxLength="25" 
          name="password" 
          className='b-transp' 
          placeholder='Password'
          value={signUpInputs.password}
          onChange={(e) => setSignUpInputs((prev) => ({...prev, [e.target.name]: e.target.value}))}/>
        <input type="submit" value="Register" className="b-transp enter-btn" onClick={handleRegister}/>
        {error && <h4 style={{color: 'red'}}>Sorry, error occured: {error}</h4>}
      </form>}
    </div>
  )
}
