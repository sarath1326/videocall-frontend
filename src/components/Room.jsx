

import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { socketContext } from "./context/Socket"
import Reactplayer from "react-player"
import Peer from "simple-peer"
import "./Room.css"


function Room() {

    const { Socket } = useContext(socketContext)
    const [incomingemail, setincomingemail] = useState('')
    const [strem, setstrem] = useState(null)
    const [userstream, setuserstream] = useState(null)
    const [caller, setcaller] = useState('')
    const [callersignal, setcallersignal] = useState('')
    const [resevingcall, setresevingcall] = useState(false)
    const [callaccepting, setcallaccepting] = useState(false)
    const [callacepted, setcallaccepted] = useState(false)

    const [flag, setflag] = useState(false)


    const handil_new_join = ({ email }) => {

        console.log("new user joined", email)
        setincomingemail(email)


    }

    const user_calling = () => {

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: strem
        })
        peer.on("signal", (data) => {
            Socket.emit("call_user", {
                email: incomingemail,
                signalData: data,

            })
        })

        peer.on("stream", (stream) => {

            setuserstream(stream)

        })

        Socket.on("call_accepted", ({ signal }) => {

            console.log("user call acceepted")

            setcallaccepted(true)
            setcallaccepting(true)

            peer.signal(signal)


        })




    }

    const handil_incoming_call = ({ from, signal }) => {

        console.log(from, "calling to you")

        setresevingcall(true)
        setcaller(from)
        setcallersignal(signal)


    }


    // const handil_call_accepting=({signal})=>{

    //     console.log("user call acceepted")

    //     callacepted(true)
    //     callaccepting(true)

    //   Peer.signal(signal)

    // }



    useEffect(() => {


        Socket.on("user_joined", handil_new_join)
        Socket.on("incoming_call", handil_incoming_call)




    }, [Socket])


    const handilmystream = async () => {

        const streamdata = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setstrem(streamdata)


    }


    useEffect(() => {

        handilmystream()


    }, [])


    const callanswer = () => {

        setcallaccepting(true)
        setresevingcall(false)

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: strem
        })

        peer.on("signal", (data) => {

            Socket.emit("answerCall", { signal: data, email: caller })

        })

        peer.on("stream", (stream) => {

            setuserstream(stream)

            console.log("doctor stream", stream)
        })

        peer.signal(callersignal)




    }






    return (

        <div className='main-box' >

            <h1> Room   </h1>

            <button onClick={user_calling} > calling  </button>

            {
                resevingcall ?
                    <><h1> {caller} calling to you  </h1>
                        <button onClick={callanswer} > Answer </button> </>

                    :

                    callaccepting ?

                        <div className='video-box'>

                            <Reactplayer  url={userstream} playing  />


                        </div>


                        : null







            }


            <Reactplayer width={200} height={200} url={strem} playing muted  />









        </div>
    )
}

export default Room
