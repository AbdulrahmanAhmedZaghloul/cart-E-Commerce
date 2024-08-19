import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { DotLoader } from 'react-spinners'; // استيراد مكتبة react-spinners

export default function CategorieSilder() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        initialSlide: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [silderCate, setSilderCate] = useState([]);
    const [loading, setLoading] = useState(true); // حالة التحميل

    useEffect(() => {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then(({ data }) => {
                setSilderCate(data.data);
            })
            .catch((errors) => {
                return errors 
            })
            .finally(() => {
                setLoading(false); // إيقاف حالة التحميل بعد الانتهاء من جلب الفئات
            });
    }, []);

    return (
        <React.Fragment>
            {loading ? ( // عرض مؤشر التحميل إذا كانت حالة التحميل صحيحة
                <div className='flex justify-center items-center'>
                    <DotLoader size={80} color={"gray"} />
                </div>
            ) : (
                <div className='p-4'>
                    <h2 className='text-start font-bold my-4 text-2xl text-zinc-600'>Shop Popular Categories</h2>
                    <Slider className=' p-5' {...settings}>
                        {silderCate.map((src) => (<div key={src._id}>
                            <img className='w-full mx-auto h-[10rem]' src={src?.image} alt={src?.name} />
                            <p className='text-start font-semibold my-3'>{src?.name}</p>
                        </div>

                        ))}
                    </Slider>
                </div>
            )}
        </React.Fragment>
    )
}

