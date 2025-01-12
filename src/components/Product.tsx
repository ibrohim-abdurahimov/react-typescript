import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchItems, createItem, updateItem, deleteItem } from '../services/api';
import type { LightItem, Product } from '../types'


const Product = () => {
    const [items, setItems] = useState<LightItem[]>([]);
    const [newItem, setNewItem] = useState('');
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const [editItemName, setEditItemName] = useState('');

    useEffect(() => {
        fetchItems().then(setItems);
    }, []);

    const handleCreate = async () => {
        const createdItem = await createItem({ name: newItem });
        setItems([...items, createdItem]);
        setNewItem('');
    };

    const handleUpdate = async (id: string) => {
        const updatedItem = await updateItem(id, { name: editItemName });
        setItems(items.map((item) => (item.id === id ? updatedItem : item)));
        setEditItemId(null);
        setEditItemName('');
    };

    const handleDelete = async (id: string) => {
        await deleteItem(id);
        setItems(items.filter((item) => item.id !== id));
    };
    const [data, setData] = useState<null | Product[]>(null)
    useEffect(() => {
        axios
            .get("https://6781424785151f714b0a074d.mockapi.io/light")
            .then(res => {
                setData(res.data
                )
            })
    }, [])
    console.log(data);

    // const productItem: undefined | JSX.Element[] = data?.map((product: Product): JSX.Element => (
    //     <div key={product.id} className='shadow-inner bg-gray-100 hover:shadow-md hover:scale-105 duration-300  flex flex-col justify-between gap-6 py-5 px-5 rounded-2xl'>
    //         <img className='rounded-xl' src={product.img} alt={product.title} />
    //         <h3 className='text-xl font-serif font-semibold'>{product.title}</h3>
    //         <div className='flex gap-1 items-end'>
    //             <p className='text-lg'>{product.price} $</p>
    //             <p className='line-through text-sm'>{product.lastprice}</p>
    //         </div>
    //     </div>
    // ))
    return (
        <div className='my-8'>
            {/* <div className='container m-auto gap-5 grid grid-cols-4'>{productItem}</div> */}
            <div>
                <h1>Light Items</h1>
                <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="New item"
                />
                <button onClick={handleCreate}>Add</button>

                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {editItemId === item.id ? (
                                <>
                                    <input
                                        value={editItemName}
                                        onChange={(e) => setEditItemName(e.target.value)}
                                    />
                                    <button onClick={() => handleUpdate(item.id)}>Save</button>
                                    <button onClick={() => setEditItemId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {item.name}
                                    <button onClick={() => {
                                        setEditItemId(item.id);
                                        setEditItemName(item.name);
                                    }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Product