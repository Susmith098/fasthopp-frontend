import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../components/Public/Header/Header'
import Footer from '../../../components/Public/Footer/Footer'
import { loginSchema } from '../../../Validations/LoginValidation'
import { loginUser } from '../../../store/User/authSlice'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.usertoken)
  

  // user login function
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
        email: email,
        password: password
    };
    if (email && password) {
        try {
            await loginSchema.validate(formData);
            const response = await dispatch(loginUser({ email, password }));
            if (response.payload.error === 'Authentication Failed') {
                setError('Unauthorized Access');
            } else {
                setError('');
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.message)
        }
    } else {
        setError("Please enter all details")
    }
};


  return (
    <section>
      <Header />

      
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <p className="rounded-lg text-[#5bba39] text-2xl font-bold py-2 px-4 ">
                    {userData.registerSuccess ? "User registered successfully" : ''}
                </p>
          <div className="mb-2 flex justify-center">
            
          <p className='text-xl font-sans font-semibold border-2 border-black shadow-xl p-1 rounded-lg'>Fasthopp</p>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&#x27;t have an account?{" "}


            <Link to='/register'>  Create a free account </Link>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="button" onClick={handleLogin}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >

                  Get started{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <p className='text-red-600'>{error}</p>
                <p>{userData.authFailed ? userData.authFailed : ''}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>

  )
}
