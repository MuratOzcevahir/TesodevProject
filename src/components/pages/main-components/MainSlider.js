import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
function MainSlider() {

    let sliderData = [
        {
            img: 'https://picsum.photos/300/200?random=1',
            title: 'Nam luctus tincidunt elit non luctus. Nam in leo mi. Maecenas eget.',
            desc: 'Interdum et malesuada fames.'
        },
        {
            img: 'https://picsum.photos/300/150?random=2',
            title: 'Aliquam ut ultricies orci, faucibus ultrices ligula. Ut dapibus eleifend orci. Morbi.',
            desc: 'Nam nec enim id.'
        },
        {
            img: 'https://picsum.photos/300/150?random=3',
            title: 'Donec rutrum neque sed suscipit auctor. Morbi erat arcu, gravida fermentum libero',
            desc: 'Etiam a venenatis orci.'
        },
        {
            img: 'https://picsum.photos/300/150?random=4',
            title: 'Curabitur semper ante vel elit viverra, vitae placerat diam elementum. Aenean egestas magna non mollis.',
            desc: 'Sed sodales elit vel.'
        }
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
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


    return (
        <div className='slider-holder'>
            <h2>Top News</h2>
            <Slider {...settings}>

                {
                    sliderData.map((item, i) => {
                        return (
                            <div className='slide-item'>
                                <img src={item.img} alt="" />
                                <h3> {item.title.length > 50 ? item.title.substring(0, 50) + '..' : item.title}</h3>
                                <small> {item.desc}</small>
                            </div>
                        )
                    })

                }


            </Slider>
        </div>
    );
}



export default MainSlider