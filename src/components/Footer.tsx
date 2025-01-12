import  { FC } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer:FC = () => {
    return (
        <div className='bg-sky-900'>
            <div className='container m-auto px-4 flex items-center justify-between h-20'>
                <h2 className='text-white text-xl font-semibold'>Footer</h2>
                <div className='flex items-center gap-7 text-lg text-white'>
                    <FaFacebook/>
                    <FaTwitter/>
                    <FaInstagram/>
                    <FaLinkedin/>
                </div>
            </div>
        </div>
    )
}

export default Footer