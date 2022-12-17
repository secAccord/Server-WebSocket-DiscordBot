import fetch from "node-fetch";


const options = {
    method: 'GET',
    headers: {
        'Client-Id': process.env.CLIENT_KEY,
        Authorization: process.env.AUTH_KEY
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


