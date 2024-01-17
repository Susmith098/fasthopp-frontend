import React from 'react'
import Header from '../../../components/Public/Header/Header';
import Footer from '../../../components/Public/Footer/Footer';
import { Link } from 'react-router-dom';
import team from '../../../assets/images/team.svg';

export default function About() {
  return (
    <div>
        <Header/>
      <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src={team}
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                      We build developer and project manager-friendly applications.
                      </h2>
                      <p className="mt-6 text-gray-600">
                      Fasthopp is made for easy task management. We built a user-friendly kanban board and video conference application.
You don't have to be concerned about task management because we take care of it.
                      </p>
                      <p className="mt-4 text-gray-600">
                      Always feel free to give us your valuable feedback.
                      </p>
                      <br/>
                      <Link
                                className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                                to="/contact"
                            >
                                &nbsp; Feedback
                            </Link>
                  </div>
              </div>
          </div>
      </div>
      <Footer/>
      </div>
  );
}