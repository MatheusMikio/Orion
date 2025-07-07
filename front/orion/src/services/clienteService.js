const urlApi = "https://localhost:7214";


export async function getClients(pesquisa){
  try{
    const response = await fetch(`${urlApi}/api/Cliente?pesquisa=${pesquisa || ""}`, {
      method: "GET"
    });

    let dados;
    if (response.status === 200) dados = await response.json()
    
    return {
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

// export async function cadastrarCliente(cliente) {
//   try {
//     const response = await fetch(`${urlApi}/api/Cliente`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(cliente)
//     });

//     const contentType = response.headers.get("content-type");

//     let dados;
//     if (contentType && contentType.includes("application/json")) {
//       dados = await response.json();
//     } else {
//       dados = await response.text(); 
//     }

//     return {
//       status: response.status,
//       data: dados
//     };
//   } catch (err) {
//     return {
//       status: 500,
//       data: err.message
//     };
//   }
// }

export async function cadastrarCliente(cliente) {
  try {
    const response = await fetch(`${urlApi}/api/Cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    let dados = await response.json();
    return{
      status: response.status,
      data: dados
    }
  } catch (err) {
    return {
      status: 500,
      data: err.message
    };
  }
}