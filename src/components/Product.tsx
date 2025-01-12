import  {useState, useEffect} from 'react'
import axios from 'axios'
import type { Product } from '../types'


const Product = () => {
    const [data, setData] = useState<null | Product[]>(null)
    useEffect(()=>{
        axios
            .get("https://dummyjson.com/recipes?limit=50")
            .then(res => {
                setData(res.data.recipes
                )
            })
    },[])
    console.log(data);
    
    const productItem: undefined | JSX.Element[] = data?.map((product: Product):JSX.Element=>(
        <div key={product.id} className='shadow-inner bg-gray-100 hover:shadow-md hover:scale-105 duration-300  flex flex-col justify-between gap-6 py-5 px-5 rounded-2xl'>
            <img className='rounded-xl' src={product.image} alt={product.name} />
            <h3 className='text-xl font-serif font-semibold'>{product.name}</h3>
            <div className='flex gap-1 items-end'>
                <p className='text-lg'>20 $</p>
                <p className='line-through text-sm'>27$</p>
            </div>
        </div>
    ))
  return (
    <div className='my-8'>
        <div className='container m-auto gap-5 grid grid-cols-4'>{productItem}</div>
    </div>
  )
}

export default Product