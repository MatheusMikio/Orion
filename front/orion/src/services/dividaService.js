const urlApi = "https://localhost:7214";

export async function getDividas(pagina = 1, tamanho = 10){
    try{
        const response = await fetch(`${urlApi}/api/Divida?pagina=${pagina}&tamanho=${tamanho}`,{
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

export async function getDividaId(dividaId){
    try{
        const response = await fetch(`${urlApi}/api/Divida/${dividaId}`, {
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

export async function salvarDivida(divida){
    try{
        const response = await fetch(`${urlApi}/api/Divida`, {
            method: divida.id ? "PUT" : "POST",
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

export async function apagarDivida(dividaId){
    try{
        const response = await fetch(`${urlApi}/api/Divida/${dividaId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

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