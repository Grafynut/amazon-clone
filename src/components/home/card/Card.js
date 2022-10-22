import { React, useState, useRef, useEffect } from 'react';
import CardImage from './Card_Image';
import AllDetailsLink from './AllDetailsLink';
import { Link } from 'react-router-dom';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';

function Card({ heading, cardDeatils, linkdetails, Linkpage, control, cardLenth, cetagory }) {
    const controleElm = useRef(null);
    const [controle1, setControle1] = useState(true);
    const [controle2, setControle2] = useState(false);
    const [scrollValue, setScrollValue] = useState(0);
    const [cardTrnasform, setCardTrnasform] = useState(0);

    // control button bg color ------
    function cardScroll(e) {
        let elementWidth = e.target.offsetWidth
        let scrollX = e.target.scrollLeft;
        let scrollWidth = e.target.scrollWidth;
        let value = scrollX + elementWidth;
        setScrollValue(scrollX);

        if (scrollX < 20) {
            setControle1(true);
        } else if (value > scrollWidth - 20) {
            setControle2(true)
        } else {
            setControle1(false)
            setControle2(false)
        }

    }

    // left --- right ---- button click ---
    function scrollpos(val) {
        const Element = controleElm.current; // card div
        Element.scrollTo(val, 0);
    }
    // right
    function rightscroll() {
        const width = controleElm.current.offsetWidth;
        setCardTrnasform((prev) => {
            return prev = scrollValue + width;
        })
    }

    // left
    function leftscroll() {
        const width = controleElm.current.offsetWidth;
        setCardTrnasform((prev) => {
            return prev = scrollValue - width;
        })
    }

    useEffect(() => {
        const width = controleElm.current.offsetWidth;
        const TotalScrollWidth = scrollValue + width;

        if (cardTrnasform > TotalScrollWidth) {
            setCardTrnasform(TotalScrollWidth);
        }

        if (cardTrnasform < 0) {
            setCardTrnasform(0);
        }
        scrollpos(cardTrnasform)
    }, [cardTrnasform])

    return (
        <>
            <div className='card' ref={controleElm} onScroll={cardScroll} style={cardLenth ? { width: `${100 / cardLenth}%` } : { width: `100%` }}>
                <div className='card_top'>
                    <h2 className='heading'>{heading}</h2>
                    {cetagory ? <AllDetailsLink linkdetails={linkdetails} cetagory={cetagory} /> : null}
                </div>
                <div className='multi_card' style={cardDeatils.length > 1 ? { gap: "1.5rem" } : { gap: 'unset' }}>
                    {cardDeatils?.map((item, index) => {
                        if (!Linkpage) {
                            return (<CardImage image={item.image} details={item.details} key={index} offers={item.offer} />)
                        } else {
                            return (<Link to={`/${cetagory}/productdetails?cet=${cetagory}&id=${item.id}`} key={index}>
                                <CardImage image={item.image[0].url} details={"Great Indian Festivel"} offers={item.offer} price={item.price} />
                            </Link>)
                        }
                    })}
                </div>
                {/*check cetagory is define*/}
            </div>
            {control && cardDeatils.length > 5 ? <>
                <div className='left' onClick={leftscroll} style={{ display: controle1 ? "none" : "unset" }} >
                    <ArrowBackIosNewOutlined className='control' />
                </div>
                <div className='right' onClick={rightscroll} style={{ display: controle2 ? "none" : "unset" }} >
                    <ArrowForwardIosOutlined className='control' />
                </div>
            </> : null
            }
        </>
    )
}

export default Card