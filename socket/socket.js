import express from "express"
const app=express()

import {createServer}from "http"
const myServer=createServer(app)

import {Server} from "socket.io"

const io=new Server(myServer,{
    cors:{
        origin:["https://mern-chat-frontend-sepia.vercel.app/","*","http://localhost:5173"],
        methods:["GET","POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
})

const activeUsers={}
 
//===needed while sending mesasge in controller=====
export const getRecieverId=(userId)=>{
    return activeUsers[userId]
 }


io.on("connection",(socket)=>{
    //new client connected=======
    console.log(" user:- "+socket.id)
    const {userId}=socket.handshake.query

    if(userId!==undefined){
        activeUsers[userId]=socket.id
    }



    //====events==================
    io.emit("getOnlineUsers",Object.keys(activeUsers))
    


    socket.on("disconnect",()=>{
        console.log("socket dissconnected")
        delete activeUsers[userId];
        io.emit("getOnlineUsers",Object.keys(activeUsers))
    })
    
})

export {app,io,myServer}