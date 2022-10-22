import { React, useState, useEffect } from 'react';
import Content from '../Content';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';

function Slide() {
    const bannerImage = Content.banner;
    const slidePercent = 100 / bannerImage.length;
    let width = window.innerWidth;

    const [slideValue, setSlideValue] = useState(0);

    let i = 0;
    useEffect(() => {
        let interval = setInterval(() => {
            if (i > 200) { clearInterval(interval); return }
            setSlideValue((prev) => {
                if (slideValue <= (-100 + slidePercent)) {
                    setSlideValue(0);
                }
                return prev - slidePercent;
            });
            i++;
        }, 2000);
        return () => clearInterval(interval);
    }, [slideValue])

    // left ----
    function SlidefuncLeft() {
        setSlideValue((prev) => {
            if (slideValue >= 0) {
                setSlideValue(-100 + slidePercent);
            };
            return prev + slidePercent;
        });
    };

    // right ----
    function SlidefuncRight() {
        setSlideValue((prev) => {
            if (slideValue <= (-100 + slidePercent)) {
                setSlideValue(0);
            };
            return prev - slidePercent;
        });
    };

    useEffect(() => {
        window.onresize = () => {
            width = window.innerWidth;
        }
    }, [width])

    return (
        <div className='slide'>
            <div className='slide_area' style={{ transform: `translateX(${slideValue}%)` }} >
                {bannerImage.map((item, index) => {
                    return <div style={{ maxWidth: width, overflow: 'hidden' }} key={index} >
                        <img src={item} alt='banner1' className='banner' />
                    </div>

                })}
            </div>
            <div className='left' onClick={SlidefuncLeft}>
                <ArrowBackIosNewOutlined className='Control_icon' />
            </div>
            <div className='right' onClick={SlidefuncRight} >
                <ArrowForwardIosOutlined className='Control_icon' />
            </div>
        </div>
    )
}

export default Slide;