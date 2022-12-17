import fetch from "node-fetch";
import json  from '../config.json' assert { type: "json" };

const options = {
    method: 'GET',
    headers: {
        'Client-Id': json.CLIENT_KEY,
        Authorization: json.AUTH_KEY
    }
};

export function TTV_STREAM (ID){
    const url = `https://api.twitch.tv/helix/streams?user_id=${ID}`;
    return fetch(url,options).then(res => res.json())
}
export function TTV_FOLLOW(ID){
    const url = `https://api.twitch.tv/helix/users/follows?to_id=${ID}`;
   
    return fetch(url,options).then(res => res.json())
}
export function TTV_BIO(ID){
    const url = `https://api.twitch.tv/helix/users?id=${ID}`;
    
    return fetch(url,options).then(res => res.json())
}

