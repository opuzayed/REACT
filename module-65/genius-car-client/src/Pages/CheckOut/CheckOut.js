import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CheckOut = () => {
    const {title} = useLoaderData();
    return (
        <div>
            <form>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </form>
        </div>
    );
};

export default CheckOut;