import { FC } from 'react'





const Header: FC = () => {
  return (
    <div className='bg-sky-900 shadow-lg sticky top-0 left-0 z-50'>
      <div className='container m-auto px-4 flex items-center justify-between h-20'>
        <h2 className='text-white text-xl font-semibold'>Logoo</h2>
        <ul className='flex gap-4 items-center'>
          <li className='py-2 px-16 rounded-2xl bg-slate-300'>
            <a href="#">Home</a>
          </li>
          <li className='py-2 px-16 rounded-2xl bg-slate-300'> 
            <a href="#">About us</a>
          </li>
          <li className='py-2 px-16 rounded-2xl bg-slate-300'>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header