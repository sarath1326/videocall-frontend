

import React from 'react'
import "./Home.css"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import {socketContext} from "./context/Socket"

function Home() {

    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [room, setroom] = useState('')

    const {Socket} = useContext(socketContext)

    const enterroom = () => {

        Socket.emit("join_room",{room,email})
    
     }

     const handilroomjoin=({room})=>{

        console.log("enetr room",room)

        navigate("/room")


     }




    useEffect(()=>{

        Socket.on("room_joined",handilroomjoin)


    },[Socket])







    return (
        <div>

            <div className='home-main'>

                <div>

                    <input
                        type='email'
                        placeholder='enter email id'
                        onChange={(e) => { setemail(e.target.value) }}



                    /> <br />

                    <input

                        type='text'
                        placeholder='enter room id'
                        onChange={(e) => { setroom(e.target.value) }}



                    /> <br />

                    <button onClick={enterroom} > enter room   </button>








                </div>





            </div>








        </div>
    )
}

export default Home
