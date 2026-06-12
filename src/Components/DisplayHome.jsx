import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbunItem from './AlbunItem'
import { songsData } from '../assets/assets'
import Songitem from './Songitem'
const DisplayHome = () => {
  return (
    <>
      <Navbar/> 
      <div className = 'mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='hide-scrollbar flex overflow-auto '>
          {albumsData.map((item,index)=>(<AlbunItem key = {index} name = {item.name} desc = {item.desc} id = {item.id} image = {item.image}/>))}
        </div>
      </div>
      <div className = 'mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hit</h1>
        <div className='hide-scrollbar flex overflow-auto '>
          {songsData.map((item,index)=>(<Songitem key = {index} name = {item.name} desc = {item.desc} image = {item.image}/>))}
        </div>
      </div>
    </>
  )
  
}

export default DisplayHome
