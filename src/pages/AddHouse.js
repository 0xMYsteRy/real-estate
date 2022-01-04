import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import AdminSidebarNav from '../components/AdminSidebarNav'

import { Navigate } from 'react-router-dom';  
import { useEnv } from '../context/env.context'
import { useAuth0,withAuthenticationRequired } from "@auth0/auth0-react"

const AddHouse = () =>{
    const [name, setName] = useState("")
    const [image, setImage] = useState([])

    const nameOnChange = (e) => {
        setName(e.target.value)
    }

    const handleChange = (e) => {
        const files = Array.from(e.target.files)
        setImage(files)
    }

    const { user} = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`

    // const handleUploadUsingS3 = async () =>{
    //     const formData = new FormData()
    //     formData.append("houseId",id)
    //     newImages.forEach(file =>{
    //         formData.append('files',file)
    //     })

    //     await axios.put('http://localhost:8080/api/v1/houses/addHouseImage',formData)
    //     .then((res)=>{
    //       console.log(res.data)
    //       window.location.reload()
    //     })
    //     .catch(error =>console.log(error)) 
    //   }

    const handleUploadUsingS3 = async () => {
        const formData = new FormData()
        image.forEach(file => {
            formData.append('files', file)
        })
        formData.append('name', name)

        await axios.post('http://localhost:8080/api/v1/houses', formData)
            .then((res) => {
                console.log(res.data)
            })
            .catch(error => console.log(error))
    }

    if(user[role].length === 0){
        return (
            <>
                <Navigate replace to="/" />
            </>
        )
    }

    return (
        <>
            <AdminSidebarNav />
            <br />
            <br />
            <input type="file" multiple onChange={handleChange} />
            <br />
            <input type="text" placeholder="house name" value={name} onChange={nameOnChange} required />
            <button onClick={handleUploadUsingS3}>Upload using s3</button>
        </>
    )
}

export default withAuthenticationRequired(AddHouse, {
    onRedirecting: () => <Loader />,
})
