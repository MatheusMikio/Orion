import { data } from "react-router-dom";

const urlApi = "https://localhost:7214";

export async function getDividas(pesquisa){
    try{
        const response = await fetch(`${urlApi}/api/Divida?pesquisa=${pesquisa || ""}`,{
            method: "GET"
        });

        let dados;
        if (response.status === 200) dados = await response.json();

        return{
            status: response.status,
            data: dados
        }
    }
    catch{
        return{
            status: 500,
            data: null
        }
    }
}

export async function criarDivida(divida){
    try{
        const response = await fetch(`${urlApi}/api/Divida`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(divida)
        });

        let dados = await response.json();
        return{
            status: response.status,
            data: dados
        }
    } catch (err){
        return{
            status: 500,
            data: err.message
        };
    }
}