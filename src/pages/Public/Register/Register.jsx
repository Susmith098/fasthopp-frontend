import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/Public/Header/Header'
import Footer from '../../../components/Public/Footer/Footer'
import { userSchema } from '../../../Validations/RegisterValidation';
import { Success } from '../../../store/User/authSlice';
import { newUserRegister } from '../../../server/User/newUserRegister';
import { useDispatch } from 'react-redux';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // user registration function
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password,
      companyName: companyName,
    }

    if (
      name, email, companyName, password
    ) {
      try {
        await userSchema.validate(formData)
        const registrationResponse = await newUserRegister(
          name, email, companyName, password
        )
        if (registrationResponse.access_token) {
          dispatch(Success('registered'))
          navigate('/login')
        } 
        else {
          setError('Registration Failed, please check all details and try again')
        }
      } catch (error) {
        setError(error.message)
      }
    } else {
      setError("Please fill all details")
    }
  }





  return (
    <section>
    <Header />
  <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <div className="mb-2 flex justify-center">
      <p className='text-xl font-sans font-semibold border-2 border-black shadow-xl p-1 rounded-lg'>Fasthopp</p>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight text-black">
        Sign up to create account
      </h2>
      <p className="mt-2 text-center text-base text-gray-600">
        Already have an account?{" "}
     

        <Link to='/login'>Sign In</Link>
      </p>
      <form action="#" method="POST" className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="text-base font-medium text-gray-900">
              {" "}
              Full Name{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Full Name"
                id="name" value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-base font-medium text-gray-900">
              {" "}
              Email address{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
                id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-base font-medium text-gray-900">
                {" "}
                Password{" "}
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                placeholder="Password"
                id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="companyName" className="text-base font-medium text-gray-900">
              {" "}
              Workspace Name{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Worksoace Name"
                id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>
          <div classame="mb-2">
                        <p className='text-[#952e2e]'>{error}</p>
                    </div>
          <div>
            <button
              type="button" onClick={handleRegistrationSubmit}
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Create Account{" "}
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
            <p className='text-red-800'>{error}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</section>

  )
}

export default Register
