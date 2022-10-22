import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import OrderItem from './OrderItem';
import './order.css';
import { orderBy, query, onSnapshot, collection, doc, updateDoc, deleteField, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';


function OrderProducts() {
    const [orders, setOrders] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (user) {
            const dataRef = collection(db, 'users', user?.uid, 'orders');
            const q = query(dataRef, orderBy('created', 'desc'));
            const unsub = onSnapshot(q, (snapshot) => {
                setOrders(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
            return unsub;
        } else {
            setOrders([]);
        }
    }, []);



    // Remove the 'capital' field from the document
    const handleCancelOrder = (id) => {
        const fieldRef = doc(db, 'users', user?.uid, 'orders', `${id}`);

        updateDoc(fieldRef, {
            capital: deleteField()
        });
        deleteDoc(fieldRef);
    }

    return (
        <div className='order_section'>
            {orders.length < 1 ? <h1 className='order_noitem_noty'><Link to="/">No Order Found</Link></h1> : <h1 className='heaing'>Your Orders {orders.length}</h1>}
            <div className='order_items'>
                {orders?.map((item, i) => {
                    return <div className='order_items_card'>
                        <div className='order_details'>
                            <p>{moment.unix(item.data.created).format("MMMM Do YYYY, h:mma")}</p>
                            <p>Order NO: {item.id}</p>
                        </div>
                        {item.data.basket.map((order) => {
                            return <OrderItem item={order} key={i} />
                        })}

                        {item.data.address &&
                            <p className='order_address'>
                                <span>Address:</span> {item.data.address.localArea}, {item.data.address.homeTown}, {item.data.address.district}, {item.data.address.state}, {item.data.address.pin}
                            </p>
                        }
                        <button onClick={() => handleCancelOrder(item.id)} className="order_cencel_button">Cencel Order</button>

                    </div>
                })}
            </div>
        </div>
    )
}

export default OrderProducts