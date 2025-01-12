import { FC, useEffect, useState } from "react";
import axios from "axios";
interface Light {
    id: string;
    title: string;
    img: string;
    price: number;
    lastprice: number;
}

const API_URL = 'https://6781424785151f714b0a074d.mockapi.io/light';
const Pro: FC = () => {
    const [lights, setLights] = useState<Light[]>([]);
    const [newLight, setNewLight] = useState<Omit<Light, 'id'>>({ title: '', img: '', price: 0, lastprice: 0 });

    useEffect(() => {
        fetchLights();
    }, []);

    const fetchLights = async () => {
        try {
            const response = await axios.get<Light[]>(API_URL);
            setLights(response.data);
        } catch (error) {
            console.error('Error fetching lights:', error);
        }
    };

    const addLight = async () => {
        try {
            const response = await axios.post<Light>(API_URL, newLight);
            setLights([...lights, response.data]);
            setNewLight({ title: '', img: '', price: 0, lastprice: 0 });
        } catch (error) {
            console.error('Error adding light:', error);
        }
    };

    const updateLight = async (id: string, updatedLight: Partial<Omit<Light, 'id'>>) => {
        try {
            const response = await axios.put<Light>(`${API_URL}/${id}`, updatedLight);
            setLights(lights.map(light => (light.id === id ? response.data : light)));
        } catch (error) {
            console.error('Error updating light:', error);
        }
    };

    const deleteLight = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setLights(lights.filter(light => light.id !== id));
        } catch (error) {
            console.error('Error deleting light:', error);
        }
    };
    return (
        <div className="mb-7">
            <h1 className="text-center mt-4 text-xl font-bold">Light Management</h1>
            <div className="container m-auto grid grid-cols-5 gap-5 mt-4">
                <input
                    className="border rounded-md px-1 py-1 pl-2"
                    required
                    type="text"
                    placeholder="Title"
                    value={newLight.title}
                    onChange={e => setNewLight({ ...newLight, title: e.target.value })}
                />
                <input
                    className="border rounded-md px-1 py-1 pl-2"
                    required
                    type="text"
                    placeholder="Image URL"
                    value={newLight.img}
                    onChange={e => setNewLight({ ...newLight, img: e.target.value })}
                />
                <input
                    required
                    className="border rounded-md px-1 py-1 pl-2"
                    type="number"
                    placeholder="Price"
                    value={newLight.price}
                    onChange={e => setNewLight({ ...newLight, price: parseFloat(e.target.value) })}
                />
                <input
                    required
                    className="border rounded-md px-1 py-1 pl-2"
                    type="number"
                    placeholder="Last Price"
                    value={newLight.lastprice}
                    onChange={e => setNewLight({ ...newLight, lastprice: parseFloat(e.target.value) })}
                />
                <button className="bg-green-700 text-white rounded-xl py-1" onClick={addLight}>Add Light</button>
            </div>
            <div className="container m-auto grid grid-cols-4 gap-4 mt-5">
                {lights.map(light => (
                    <div key={light.id} className='shadow-inner bg-gray-100 hover:shadow-md hover:scale-105 duration-300  flex flex-col justify-between gap-6 py-5 px-5 rounded-2xl'>
                        <img src={light.img} alt={light.title} className="w-full"/>
                        <h3 className='text-xl font-serif font-semibold'>{light.title}</h3>
                        <p>Price: ${light.price}</p>
                        <p>Last Price: ${light.lastprice}</p>
                        <div className="flex justify-between">
                            <button className="bg-sky-700 text-white px-4 py-2 rounded-lg" onClick={() => updateLight(light.id, { price: light.price + 10 })}>Increase Price by $10</button>
                            <button className="bg-red-700 text-white py-2 px-8 rounded-lg" onClick={() => deleteLight(light.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pro