"use client"
import React from 'react'
import { useState } from 'react'
import { toast } from "sonner"


const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        rating: '',
        feedback: '',
    })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/feedbackForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        const data = await res.json();
        if (res.ok) {
            setFormData({
                name: '',
                rating: '',
                feedback: '',
            })
            setError('')
            toast.success("Feedback submitted successfully.")
            setTimeout(() => {
                setMessage("")
            }, 6000)
            setMessage(data.message)
            console.log(data.data)
        }
        else {
            setError("ERROR : " + data.error)
        }
    }
    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    return (
        <div className='form-container h-screen w-screen flex flex-col items-center justify-start p-12'>
            <h1 className='text-4xl text-blue-700'>Feedback Form</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 h-screen w-1/2 my-6 text-white'>
                <label htmlFor="name" className='text-2xl'>Your Name</label>
                <input type="text" id="name" name="name" className='p-4 bg-gray-800 text-black' value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} />
                <label htmlFor="rating" className="text-2xl">Rating</label>
                <select name="rating" id="rating" className='p-4 bg-gray-800 text-black' value={formData.rating} onChange={(e) => { setFormData({ ...formData, rating: e.target.value }) }}>
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="feedback" className="text-2xl">Feedback</label>
                <textarea name="feedback" id="feedback" cols="30" rows="4" className='p-6  bg-gray-800 text-black' value={formData.feedback} onChange={(e) => { setFormData({ ...formData, feedback: e.target.value }) }}></textarea>
                <button type="submit" className='p-4 bg-green-600 text-black'>Submit</button>
                {error ? <p className='text-red-600 text-2xl my-4'>{error}</p> : <p className='text-green-600 text-2xl my-4'>{message}</p>}


                {/* {error && <p className='text-red-600 text-2xl my-4'>{error}</p>}
                {message && <p className='text-green-600 text-2xl my-4'>{message}</p>} */}

                {/* <input
                    type="text"
                    id="name"
                    name="name"
                    className="p-4 bg-gray-800 text-black"
                    value={formData.name}
                    onChange={handleOnChange}
                />

                <select
                    name="rating"
                    id="rating"
                    className="p-4 bg-gray-800 text-black"
                    value={formData.rating}
                    onChange={handleOnChange}
                >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <textarea
                    name="feedback"
                    id="feedback"
                    cols="30"
                    rows="4"
                    className="p-6 bg-gray-800 text-black"
                    value={formData.feedback}
                    onChange={handleOnChange}
                /> */}

            </form>

        </div>
    )
}

export default FeedbackForm