"use client"
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
// import "../app/globals.css"

const HeroSection = () => {
    const bannerRef = useRef(null);

    useEffect(() => {
        const imageElement = bannerRef.current;
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // console.log(scrollPosition) ;
            const scrollStart = 100;
            if (scrollPosition > scrollStart) {
                imageElement.classList.add("scrolled");
            }
            else{
                imageElement.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);

        }
    }, [])
    return (
        <div className='flex flex-col justify-center items-center w-full min-h-screen pt-12 '>
            <div className='heading bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 font-bold tracking-tighter text-transparent bg-clip-text pb-2 pr-2 text-8xl  '>
                <h1 className='text-center'>Your AI Career Coach</h1>
                <h1>For Professional Success</h1>
            </div>
            <div className='my-10 mx-auto text-center heading-inner-info text-2xl font-semibold max-w-4xl text-muted-foreground'>Advance Your Career with Our Expert Guidance, Tailored to Your Needs,Interview prep and AI Job Recommendations and more with AI Career Coach</div>
            <div className='get-started-button space-x-8'>
                <Button size="lg" variant="outline" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    <Link href="/dashboard">Get Started</Link>
                </Button>
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">Learn More
                    </Button>
                </Link>
            </div>
            <div className='career-coach-banner my-5 md:my-10'>
                <div ref={bannerRef} className='hero-image'>
                    <Image src={"/ai-coach-image.png"} className='object-cover object-center' priority width={1300} height={700} alt="AI Career Coach" />
                </div>
                {/* <Image src = {"https://tse3.mm.bing.net/th/id/OIP.7pitLapzERBh_n1umL2vxwHaEK?pid=Api&P=0&h=180"}className='object-cover object-center' priority width={1000} height={500} alt="AI Career Coach" /> */}
                {/* <Image src = {"https://zef.plus/content/images/size/w1200/2024/06/b43427314cc74e7c499819d92e8c92e5.webp.jpeg"}className='object-cover object-center' priority width={1300} height={500} alt="AI Career Coach" /> */}

            </div>
        </div>
    )
}

export default HeroSection