import React, { useState } from 'react'
// import { validateEmail } from '../../../utils/validateEmail'
// import { isPasswordValid } from '../../../utils/validatePassword'
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
      {/* <div className="mt-3 space-y-3">
        <button
          type="button"
          className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          <span className="mr-2 inline-block">
            <svg
              className="h-6 w-6 text-rose-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
          </span>
          Sign up with Google
        </button>
        <button
          type="button"
          className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          <span className="mr-2 inline-block">
            <svg
              className="h-6 w-6 text-[#2563EB]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
            </svg>
          </span>
          Sign up with Facebook
        </button>
      </div> */}
    </div>
  </div>
  <Footer />
</section>

  )
}

export default Register
