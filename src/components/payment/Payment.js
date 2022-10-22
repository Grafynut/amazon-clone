import React, { useEffect, useState } from 'react';
import './payment.css';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';


function Payment() {
    const [{ basket, user, addressData }, dispatch] = useStateValue();
    const { localArea, homeTown, district, state, pin } = addressData; // get addressdata from reduse
    const [editOrDisableAddressForm, setEditOrDisableAddressForm] = useState(false); //edit button true of false
    const { meta, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
    const [cardNumber, setCardNumber] = useState();
    const [expiryDate, setExpiryDate] = useState();
    const [cvc, setCvc] = useState();
    const history = useNavigate();

    // total price maker
    let price = [];
    let TotalValue = 0;
    const TotalPrice = (num, quen) => {
        price.push(Number(num * quen));
        TotalValue = price.reduce((elem1, elem2) => {
            return elem1 + elem2;
        }, 0)
    }
    basket?.forEach((item) => {
        TotalPrice(item.offer, item.numOfitem)
    })

    //address value -----
    const [address, setAddress] = useState({
        localArea: "Uluberia",
        homeTown: "Uluberia",
        district: 'Howrah',
        state: 'West Bengal',
        pin: '000000'
    })

    // edit button --
    const addressFormEdit = () => {
        setEditOrDisableAddressForm(!editOrDisableAddressForm);
    }
    // input value set
    const handelInputValue = e => {
        const name = e.target.name;
        const value = e.target.value;

        setAddress((prev) => {
            if (name === "pin" && value.length > e.target.maxLength) {
                let Pinvalue = value.slice(0, e.target.maxLength);
                return { ...prev, [name]: Pinvalue };
            } else {
                return { ...prev, [name]: value };
            }
        })
    }

    // address details
    const handleAddress = e => {
        e.preventDefault();
        setEditOrDisableAddressForm(!editOrDisableAddressForm);
        // form data push
        dispatch({
            type: "address_data",
            item: address
        })
    }
    //---
    useEffect(() => {
        if (Object.keys(addressData).length > 0) {
            setAddress(addressData);
        }

    }, [addressData, basket])

    // on Submit button click
    function handleSubmit(e) {
        // do all the fancy stripe stuff
        e.preventDefault();
        let curTime = new Date().getTime();
        let time = curTime;
        // payment intent
        const orderRef = doc(db, 'users', user?.uid, 'orders', `${time}`);
        setDoc(orderRef, {
            basket: basket,
            amount: TotalValue,
            created: time,
            address: Object.keys(addressData).length > 0 ? addressData : address,
        });

        dispatch({
            type: 'proceed_to_buy'
        })

        history('/order');
    }

    const handleChangeCardNumber = (e) => {
        setCardNumber(e.target.value)
    }
    const handleChangeExpiryDate = (e) => {
        setExpiryDate(e.target.value)
    }
    const handleChangeCVC = (e) => {
        setCvc(e.target.value)
    }

    return (
        <div className='payment'>
            <h1 className='main_heading'>Address and Payment Details</h1>
            <div className='add_address'>
                <h2 className='heading'>Address Details</h2>
                <p className='address_info'>{editOrDisableAddressForm ?
                    null : Object.keys(addressData).length > 0 ? `${localArea}, ${homeTown}, ${district}, ${state}, ${pin}`
                        : `${address.localArea}, ${address.homeTown}, ${address.district}, ${address.state}, ${address.pin}`}</p>
                {editOrDisableAddressForm ?
                    <form onSubmit={handleAddress} className="address_form">
                        <div className='input_Div'>
                            <label htmlFor="localArea">Local area</label>
                            <input type={'text'} placeholder={'Local area'} name="localArea" value={address.localArea} id="localArea" className="inputBox" onChange={handelInputValue} />
                        </div>
                        <div className='input_Div'>
                            <label htmlFor="town">Home town name</label>
                            <input type={'text'} placeholder={'Home town name'} name="homeTown" value={address.homeTown} id="town" className="inputBox" onChange={handelInputValue} />
                        </div>
                        <div className='input_Div'>
                            <label htmlFor="District">District name</label>
                            <input type={'text'} placeholder={'District name'} name="district" value={address.district} id="District" className="inputBox" onChange={handelInputValue} />
                        </div>
                        <div className='input_Div'>
                            <label htmlFor="state">State name</label>
                            <input type={'text'} placeholder={'State name'} name="state" value={address.state} id="state" className="inputBox" onChange={handelInputValue} />
                        </div>
                        <div className='input_Div'>
                            <label htmlFor="zip_code">ZIP/PIN code</label>
                            <input type={'number'} placeholder={'ZIP/PIN code'} name="pin" maxLength={'6'} value={address.pin} id="zip_code" className="inputBox" onChange={handelInputValue} />
                        </div>
                        <input type="submit" value={'save'} className="address_save_btn" />
                    </form>
                    : null}
                <div className='edit_button' onClick={addressFormEdit}>
                    <EditIcon />
                </div>
            </div>
            <div className='payment_details'>
                <h2 className='heading'>Payment Details</h2>
                <form className='deatils'>
                    <div className='card_details'>
                        <div style={{ display: 'inline-flex', gap: '1rem' }}>
                            <svg {...getCardImageProps({ images })} style={{ width: '4rem', height: '4rem' }} />
                            <input {...getCardNumberProps({ onChange: handleChangeCardNumber })} value={cardNumber} className="payment_input" required />
                        </div>
                        <div style={{ display: 'inline-flex', gap: '1rem' }}>
                            <input {...getExpiryDateProps({ onChange: handleChangeExpiryDate })} value={expiryDate} className="payment_input_expiry" required />
                            <input {...getCVCProps({ onChange: handleChangeCVC })} value={cvc} className="payment_input_cvc" required />
                        </div>
                        {meta.isTouched && meta.error && <span className="error_card">Error: {meta.error}</span>}
                    </div>
                    <div className='buttons'>
                        <button className='payment_btn' onClick={handleSubmit} >Buy Now</button>
                        <Link to={'/cart'}><button className='cancel_btn'>Cancel</button></Link>
                    </div>
                </form>
            </div>
            <h3 className='total_price'>Total : <span>₹</span>{TotalValue}.00</h3>
        </div>
    )
}
export default Payment;