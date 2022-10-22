import React, { useEffect, useState } from 'react'
import ContentFullDetails from '../ContentFullDetails';
import './fulldetails.css';
import { StarBorderSharp, Star } from '@mui/icons-material';
import { useStateValue } from '../StateProvider';
import { CloseSharp } from '@mui/icons-material';
import offerPrice from '../offerpriceCalculator';

function FullDetails() {

    window.scrollTo(0, 0)

    // notification 
    const [notification, setNotification] = useState(false);
    // image url change
    const [imageUrl, setImageUrl] = useState(null);
    const [border, setBorder] = useState(false);
    const getImage = (url) => {
        setImageUrl(url);
        setBorder(true);
    }
    // border color
    const mouseleave = () => {
        setBorder(false);
    }

    //get id -------
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let cetValue = params.cet; // "some_value
    let idValue = Number(params.id); // "some_value

    let itemDetails = [];

    ContentFullDetails[cetValue]?.forEach((elem) => {
        if (elem.id === idValue) {
            itemDetails.push(elem);
        }
    })

    // rating
    const rating = [];
    for (let i = 1; i <= 5; i++) {
        rating.push(i);
    }


    // how many item save to cart
    const [itemAdd, setItemAdd] = useState(1)
    const subItem = () => {
        setItemAdd((prev) => {
            if (prev === 1) {
                return 1;
            } else {
                return prev - 1;
            }
        })
    }

    const addItem = () => {
        setItemAdd((prev) => {
            if (itemAdd === 5) {
                return 5;
            } else {
                return prev + 1;
            }
        })
    }

    // add to basket

    const [{ basket }, dispatch] = useStateValue();
    const addToBasket = (Item) => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: Item.id,
                title: Item.title,
                price: Item.price,
                rating: Item.review,
                ratingStar: rating,
                image: Item.image[0].url,
                offer: offerPrice(Item.price, Item.offer),
                numOfitem: itemAdd,
            }
        })

        setNotification(true);

        setTimeout(() => {
            setNotification(false);
        }, 5000)
    }

    const removeNotify = () => {
        setNotification(false);
    }


    return (
        <>
            {itemDetails?.map((item, i) => {
                return (<div className='container' key={i}>
                    <div className='fullContainer'>
                        <div className='image_viewer'>
                            <div className='image_list'>
                                <ul>
                                    {item.image?.map((elem, i) => {
                                        return (<li key={i} className="image_list_item" onMouseEnter={() => { getImage(elem.url) }} onMouseLeave={mouseleave} style={border ? { borderColor: '#f3a847' } : { borderColor: '#ccc' }}>
                                            <img src={elem.url} alt="images" />
                                        </li>)
                                    })}
                                </ul>
                            </div>
                            <div className='image_card'>
                                {imageUrl ? <img src={imageUrl} alt='images' /> : <img src={item.image[0].url} alt='images' />}
                            </div>
                        </div>
                        <div className='details_info'>
                            <div className='top_section'>
                                <h1 className='title'>{item.title}</h1>
                                <div className='rating'>
                                    {rating?.map((_, i) => {
                                        return item.review[0].rating - 1 >= i ? <Star style={{ color: "#ffa41c" }} key={i} /> : <StarBorderSharp style={{ color: "#ffa41c" }} key={i} />
                                    })}
                                    {item.review.length}
                                </div>
                            </div>
                            <div className='info'>
                                <div className='price'>
                                    <h2 className='discount_price'><span>₹</span>{item.price && item.offer ? offerPrice(item.price, item.offer) : null}.00 <span className="offer">{item.offer} Off</span></h2>
                                    <h2 className='actual_price_and_offer'>M.R.P.: ₹<span>{item.price}.00</span></h2>
                                </div>
                                <div className='add_to_card'>
                                    <button className='add_to_card_btn' onClick={() => { addToBasket(item) }}>ADD TO CART</button>
                                    <div className='quantity'>
                                        <div className='sub quItem' onClick={subItem}>-</div>
                                        <div className='selected_number'>{itemAdd}</div>
                                        <div className='add quItem' onClick={addItem}>+</div>
                                    </div>
                                </div>
                                <div className='product_details'>
                                    {item.table1 ? <>
                                        <h1 className='heading'>Product Details</h1>
                                        <table className='table' border={0}>
                                            {item.table1?.map((element, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{Object.keys(element)}</td>
                                                        <td>{element[Object.keys(element)]}</td>
                                                    </tr>
                                                )

                                            })}
                                        </table>
                                    </> : null}

                                    {item.description ? <>
                                        <h1 className='heading'>Description</h1>
                                        <p className='description_details'>{item.description}</p>
                                    </>
                                        : null}

                                    {item.table2 ? <>
                                        <h1 className='heading'>Additional Information</h1>
                                        <table className='table' border={0}>
                                            {item.table2?.map((element, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{Object.keys(element)}</td>
                                                        <td>{element[Object.keys(element)]}</td>
                                                    </tr>
                                                )

                                            })}
                                        </table>
                                    </> : null}

                                    {item.list ? <ul>
                                        {item.list?.map((elem, i) => {
                                            return <li key={i}>{elem}</li>
                                        })}
                                    </ul> : null}

                                </div>
                            </div>
                        </div>
                    </div>
                    {item.table3 ?
                        <div className="product_full_info" >
                            <table border={0} cellSpacing="1px" >
                                {item.table3?.map((element, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{Object.keys(element)}</td>
                                            <td>{element[Object.keys(element)]}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                        : null}

                    <div className="review_section">
                        <div className="review_section_inner">
                            <h2 className='heading'>Customer Review</h2>
                            {item.review?.map((elem, i) => {
                                return (
                                    <div className="review_details" key={i}>
                                        <div className='reting_s'>
                                            {rating?.map((_, i) => {
                                                return elem.rating - 1 >= i ? <Star style={{ color: "#ffa41c" }} key={i} /> : <StarBorderSharp style={{ color: "#ffa41c" }} key={i} />
                                            })}
                                        </div>
                                        <p>{elem.write}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {notification ? <div className='notify'>
                        <h3>Product added in cart</h3>
                        <p>{item.title}</p>
                        <div onClick={removeNotify}>
                            <CloseSharp className='close' />
                        </div>
                    </div>
                        : null}

                </div>
                )
            })}
        </>
    )
}

export default FullDetails