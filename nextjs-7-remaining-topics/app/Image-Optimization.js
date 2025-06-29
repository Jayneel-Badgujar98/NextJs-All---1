import React from 'react'
import Image from 'next/image'

const ImageOptimization = () => {
    return (
        <div className='px-8'>
            
            <div className='h-[800px] w-96 relative flex flex-col space-y-12   '>
                <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" priority fill className="object-contain object-center" alt="Unsplashimage" />
                <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" priority className="object-contain object-center" width={200} height={200} alt="Unsplashimage" />
            </div>
            <Image alt="awsImage" src="https://s3.amazonaws.com/aws-website-assets-prod/blog/2023/aws-logo-dark.svg" width={200} height={200} />
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="unsplashImage" className='w-96' />
        </div>
    )
}

export default ImageOptimization