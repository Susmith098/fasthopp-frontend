import React from 'react'

export default function Footer() {
  return (
    <footer className=" bg-white border-y">
      <div className="mx-auto max-w-6xl items-center justify-between px-4 md:flex lg:px-0">
        <div className="inline-flex items-center">
          <span className="ml-4 text-lg font-bold border-2 border-black shadow-xl p-1 rounded-lg">Fasthopp</span>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-gray-500">
            © 2023 Fasthopp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}