import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { DotLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
export default function MainSlider() {
    const [sliderCate, setSliderCate] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(({ data }) => {
                setSliderCate(data.data);
            })
            .catch((errors) => {
                return errors;
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);



    return (
        <React.Fragment>
            {loading ? (
                <div className='flex justify-center items-center h-[50vh]'>
                    <DotLoader size={80} color={"gray"} />
                </div>
            ) : (<div className='flex flex-wrap container mx-auto pb-6'>
                <div className="flex lg:w-[20%] w-full lg:border-e-2 border-slate-200 me-auto pt-7 items-center lg:flex-wrap">
                    <ul className='px-3 flex lg:block flex-wrap lg:m-auto  w-full h-full'>
                        <li className=' m-auto font-bold my-2 text-[17px] me-auto text-end'>
                            <Link className='text-black' to="/productWoman">
                            
                            Woman’s Fashion
                            <i className="mx-1 fa-solid fa-angle-right"></i>
                            </Link>
                            
                        </li>
                        <li className=' m-auto font-bold my-2 text-[17px] me-auto text-end'>
                            <Link className='text-black' to='/productMan'>
                            
                            Men’s Fashion
                            <i className="mx-1 fa-solid fa-angle-right"></i>
                            </Link>
                        </li>
                        <li className=' m-auto font-bold my-2 text-[17px] me-auto text-end'>
                            <Link className='text-black' to='/productElectronics'>
                            Electronics
                            <i className="mx-1 fa-solid fa-angle-right"></i>
                            </Link>
                        </li> 
                    </ul>
                </div>
                <div className='w-[80%] p-1 lg:ms-auto mx-auto'>
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        // pagination={{ clickable: true }}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        loop={true}
                        className='p-5'
                    >
                        {sliderCate.map((src) => (
                            <SwiperSlide key={src._id} className="relative">
                                <img
                                    className='object-cover w-[892px] h-[344px] m-auto opacity-90 hover:opacity-100 transition-opacity duration-300'
                                    src={src?.image}
                                    alt={src?.name}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ">
                                    <p className='text-white text-xl font-semibold'>{src?.name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
            )}
        </React.Fragment>
    );
}
