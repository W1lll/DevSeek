import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import FadeIn from 'react-fade-in'
import {ChevronRightIcon} from '@heroicons/react/outline'
import Typed from "typed.js";
import { useEffect, useRef } from "react";

export default function Index(props) {

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Developer?", "Business?", "Entrepreneur?"],
      startDelay: 1000,
      typeSpeed: 120,
      backSpeed: 170,
      backDelay: 1500
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
      <div className="max-w-5xl mx-auto select-none">
        <main className="mt-16 mx-auto max-w-md sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 sm:mt-16 md:mt-16 lg:mt-40 xl:mt-40">
            <div className="text-left">
              <FadeIn>
              <h1 className="text-3xl flex justify-start tracking-tight font-bold text-gray-900 dark:text-gray-100 sm:text-3xl md:text-6xl">
                <span className="inline-flex">Sneaker&nbsp;</span>
                <span className="block font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-600 to-green-300 animate-gradient-x">
                    {/* Element to display typing strings */}
                    <span ref={el}></span>
                </span>
              </h1>
              <p className="max-w-2xl mt-3 text-base text-gray-500 dark:text-gray-100 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              We have developers and we have project listings, we filter them for you.<br/>
              Find what's right for you without having to sift through the bullsh*t.<br/>
              Oh, and we won't take a single penny from you.
              <br/>
              </p>
              <div className="mt-5 sm:mt-8 sm:flex lg:justify-start">
                <div className="rounded-md shadow">
                  <button onClick={() => (
                    window.location.replace(`https://discord.com/api/oauth2/authorize?client_id=884506815843409960&redirect_uri=https%3A%2F%2Fdevseek.co.uk%2Fapi%2Fcallback&response_type=code&scope=identify%20email%20guilds%20connections`)
                  )}
                    className="transition duration-200 ease-in-out w-full flex items-center justify-center
                              px-8 py-3 border border-transparent text-base font-medium rounded-md text-white 
                              bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                  >
                    Join Now.
                    <ChevronRightIcon className="ml-2 h-4 w-4 text-gray-500"/>
                  </button>
                </div>
              </div>
              </FadeIn>
            </div>
        </main>
      </div>
  )
}