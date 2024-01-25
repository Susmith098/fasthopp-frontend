import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white border-y">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                    <a href="https://google.com/" className="hover:underline">
                            fasthopp 
                        </a>
                        © 2023. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        
                        <a href='https://github.com/Susmith098' target='_blank' className="">
                        <FaGithub />
                        </a>

                        <a href='https://www.linkedin.com/in/susmith-a-j/' target='_blank' className="">
                        <FaLinkedin />
                        </a>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}