import { createServer } from "http";
import { Server } from "socket.io";
import app from "./routing.js";
import clc from 'cli-color'
import {TTV_STREAM, TTV_FOLLOW, TTV_BIO} from "./twitch.js";
import { interval } from "rxjs";

const color = clc;

const server = createServer(app);
const io = new Server(server);



const msCalc = s => s*1000;

const socketInterval = interval(msCalc(10));
//Socket
io.on("connection", (socket) =>{


    socket.on("login", e => console.log(color.blueBright(`[Discord] ${e}`)))

    socket.on("send", async (id) =>{

        await TTV_FOLLOW(id).then(adw =>{
             const {data, total} = adw;
             const name = data[0]["from_name"];

        socket.emit("follow",{
            total: total,
            last: name,
        })
        
        
         })
         TTV_STREAM(id).then(adw => {

             const { data } = adw

             if(!data.length){
                socket.emit("stream",false)
                return;
             }
             const rawData = data[0]

        socket.emit("stream",{
            name:rawData["user_name"],
            category:rawData["game_name"],
            title:rawData["title"],
            viewer:rawData["viewer_count"]


        })


        })
        await TTV_BIO(id).then(adw =>{

            const {data} = adw
            const rawData = data[0]
            socket.emit("bio",{
            
                display_name: rawData['display_name'],
                description: rawData['description'],
                img: rawData["profile_image_url"]
            }
)

        })



    })

})
//Status Change
async function BotsLoop(){
    io.sockets.emit("loop");
}

//Loop Start
socketInterval.subscribe(()=>BotsLoop())


export default server