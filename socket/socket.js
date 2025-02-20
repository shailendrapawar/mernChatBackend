import express from "express"
const app=express()

import {createServer}from "http"
const myServer=createServer(app)

import {Server} from "socket.io"

const io=new Server(myServer,{
    cors:{
        origin:["http://locahost:3000"],
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(socket.id)

    socket.on("disconnect",()=>{
        console.log("socket dissconnected")
    })
})

export {app,io,myServer}