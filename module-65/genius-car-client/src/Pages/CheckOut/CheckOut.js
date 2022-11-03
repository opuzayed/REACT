import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from './../../Contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
    const {_id ,title, price} = useLoaderData();
    const {user} = useContext(AuthContext);

        const handlePlaceOrder = event => {
            event.preventDefault();
            const form = event.target;
            const name = `${form.firstName.value} ${form.lastName.value}`;
            const email = user?.email || 'unregistered';
            const message = form.message.value;
            const phone = form.phone.value;

            const order = {
                service : _id,
                serviceName : title,
                price,
                customer : name,
                email,
                phone,
                message      
            }

            fetch('http://localhost:5000/orders', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(order)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.acknowledged)
                {
                    alert('order placed successfully');
                    form.reset();
                }
            })
            .then(error => console.error(error));
        }

        

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                    <h2 className="text-4xl">You are about to order : {title} </h2>
                    <h4 className="text-3xl">Price : {price}</h4>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <input type="text" placeholder="First Name" name='firstName' className="input input-bordered w-full" />
                        <input type="text" placeholder="Last Name"  name='lastName' className="input input-bordered w-full" />
                        <input type="text" placeholder="Your Phone" name='phone' className="input input-bordered w-full" required/>
                        <input type="text" placeholder="Your Email" name='email' defaultValue = {user?.email} className="input input-bordered w-full" readOnly/>
                    </div>
                    <textarea className="textarea textarea-bordered h-24 w-full"  name='message' placeholder="Your Message"></textarea>
                    <input className='btn' type="submit" value="Place your Order" />
            </form>
        </div>
    );
};

export default CheckOut;