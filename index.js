const argumentos = process.argv.slice(2);
console.log(argumentos);

const [comando1, ...comandos] = argumentos;

async function gestionProductos() {
    try {
        switch (comando1) {
            case "GET":
                if (comandos[0] === "products" && !comandos[1]) {
                    const response = await fetch("https://fakestoreapi.com/products");
                    const data = await response.json();
                    console.log("Aquí tienes todos los productos:");
                    console.log(data);
                } else if (comandos[0] === "products" && comandos[1]) {
                    const response = await fetch(`https://fakestoreapi.com/products/${comandos[1]}`);
                    const data = await response.json();
                    console.log(`Aquí tienes el producto con el id ${comandos[1]}:`);
                    console.log(data);
                } else {
                    throw new Error("El comando GET debe ser 'GET products' o 'GET products id'.");
                }
                break;

            case "POST":
                if (comandos[0] === "products" && comandos.length === 4) {
                    const [title, price, category] = comandos.slice(1);
                    const config = {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json" 
                        },
                        body: JSON.stringify({ 
                            title, 
                            price, 
                            category 
                        })
                    };
                    const response = await fetch("https://fakestoreapi.com/products", config);
                    const data = await response.json();
                    console.log("Nuevo producto agregado con éxito:");
                    console.log(data);
                } else {
                    throw new Error("Formato incorrecto. Debes proporcionar title, price y category.");
                }
                break;

            case "DELETE":
                if (comandos[0] === "products" && comandos[1]) {
                    await fetch(`https://fakestoreapi.com/products/${comandos[1]}`, { method: "DELETE" });
                    console.log(`Producto con id ${comandos[1]} eliminado exitosamente.`);
                } else {
                    throw new Error("El comando DELETE debe ser 'DELETE products id'.");
                }
                break;

            default:
                console.log("Comando no reconocido.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

gestionProductos();
