import React from 'react'
import { useNavigate } from 'react-router-dom'


const Songitem = ({name,image,desc,id})=>{
   
  return (
    <div className='min-w-[180px] py-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img src = {image} className = 'rounded' alt = 'image'/>
      <p className='font-bold mt-2 mb-1'>{name}</p>
    </div>
  )
}

export default Songitem
