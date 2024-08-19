import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Loadimg from '../Loading/Loadimg';

export default function RecentCategorie() {
    const [cate, setCate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});

    const handleImageLoad = (categoryId) => {
        setImageLoading(prevState => ({ ...prevState, [categoryId]: false }));
    };

    const handleImageError = (categoryId) => {
        setImageLoading(prevState => ({ ...prevState, [categoryId]: false }));
    };
    
    async function getApi() {
        setLoading(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCate(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getApi();
    }, []);

    return (
        <React.Fragment>
            <div className='flex flex-wrap mx-auto container py-8'>
                {loading ? (
                    <div className="w-full h-[50vh] flex justify-center py-9 items-center">
                        <Loadimg />
                    </div>
                ) : (
                    cate?.data?.map((category) => (
                        <div key={category._id} className='lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
                            <div className='product overflow-hidden'>
                                <Link to={`/CategorieDetails/${category._id}/${category?.name}`}>
                                    <div className='relative'>
                                        {imageLoading[category._id] && (
                                            <div className='absolute inset-0 flex h-[6vh] justify-center items-center'>
                                                <ClipLoader size={30} color={"#123abc"} />
                                            </div>
                                        )}
                                        <img
                                            className={`object-cover md:h-[50vh] h-[50vh] md-w-full w-11/12 mx-auto ${imageLoading[category._id] ? 'hidden' : 'block'}`}
                                            src={category?.image}
                                            alt={category?.name}
                                            onLoad={() => handleImageLoad(category._id)}
                                            onError={() => handleImageError(category._id)}
                                        />
                                    </div>
                                    <span className='flex md:justify-start my-4 justify-center text-green-600'>{category?.name}</span>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </React.Fragment>
    );
}
