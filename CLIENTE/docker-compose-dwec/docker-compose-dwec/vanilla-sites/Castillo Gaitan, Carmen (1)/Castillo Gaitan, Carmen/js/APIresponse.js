"use strict"

async function APIresponse(url) {
    
    try{
        const response = await fetch(url);
        const resultado = await response.json();
        return  resultado;
    }catch(error){
        return error;
    }
}