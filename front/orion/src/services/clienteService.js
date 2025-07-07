const urlApi = "https://localhost:7214";

export async function cadastrarCliente(cliente) {
  try {
    const response = await fetch(`${urlApi}/api/Cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    const contentType = response.headers.get("content-type");

    let dados;
    if (contentType && contentType.includes("application/json")) {
      dados = await response.json();
    } else {
      dados = await response.text(); 
    }

    return {
      status: response.status,
      data: dados
    };
  } catch (err) {
    console.error("Erro de rede ou servidor:", err);
    return {
      status: 0,
      data: err.message
    };
  }
}
