import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Loadimg from "../Loading/Loadimg";
import { Helmet } from "react-helmet-async";
import iconimage from "../../image/avataaars.svg";
import Nofound from "../../image/9264885.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function SilderBrands() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingImages, setLoadingImages] = useState({});

    async function getData() {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
            setBrands(response.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleImageLoad = (brandId) => {
        setLoadingImages((prev) => ({ ...prev, [brandId]: false }));
    };

    const handleImageLoading = (brandId) => {
        setLoadingImages((prev) => ({ ...prev, [brandId]: true }));
    };

    if (isLoading) {
        return (
            <div className="w-full flex py-36 justify-center items-center">
                <Loadimg />
            </div>
        );
    }

    if (brands.length === 0) {
        return (
            <div className="flex justify-center py-36 items-center h-screen">
                <img className="w-1/2" src={Nofound} alt="No brands found" />
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024, // شاشات الكمبيوتر
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // التابلت
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // الجوال
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Brands</title>
            </Helmet>
            <div className="container mx-auto py-6 px-4">
                <Slider {...settings}>
                    {brands.map((brand) => (
                        <div key={brand._id} className="p-4">
                            <Link
                                to={`/spbrand/${brand._id}`}
                                onClick={() => {
                                    localStorage.setItem("categoryImage", brand.image);
                                    localStorage.setItem("categoryName", brand.name);
                                }}
                                className="block text-center border border-slate-200 blur-none hover:blur-[4px] transition-all"
                            >
                                {loadingImages[brand._id] ? (
                                    <div className="flex justify-center items-center h-40">
                                        <ClipLoader size={30} color="black" />
                                    </div>
                                ) : (
                                    <img
                                        src={brand?.image}
                                        alt={brand?.name}
                                        className="w-full h-40 object-contain mx-auto"
                                        onLoad={() => handleImageLoad(brand._id)}
                                        onLoadStart={() => handleImageLoading(brand._id)}
                                    />
                                )}
                  
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </React.Fragment>
    );
}

export default SilderBrands;
