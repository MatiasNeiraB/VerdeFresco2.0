window.onload = function getProduct() {
    const getProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.get("http://localhost:3000/admin/products", { headers });
            const products = response.data;
            const productsDinamicos = document.getElementById('productsAdmin');
            products.forEach((product) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <tr>
                        <th scope="row">#${product.id}</th>
                        <td><img class="img" src="${product.img}" alt="Imagen del producto: ${product.name}"></td>
                        <td>${product.name}</td>
                        <td>${product.descriptions}</td>
                        <td>$${product.price}</td>
                        <td><button class="btn btn-danger" id="${product.id}" onclick="deleteProduct(event)">ELIMINAR</button></td>
                        <td><button type="button" class="btn btn-success" data-bs-toggle="modal" onclick="seeProductAdmin(event)" data-bs-target="#modal-product" id="${product.id}" data-bs-whatever="@mdo">EDITAR</button></td>

                    </tr>
                `;
                productsDinamicos.appendChild(tr);
            });
        } catch (error) {
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al obtener los productos:", error);
            }
        }
    }
    getProducts();

}
var axios = require('axios');

function seeProductAdmin(event) {
    event.preventDefault();
    const product_id = event.target.id;
    const seeProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                id: product_id,
            };
            const url = `http://localhost:3000/admin/products/${product_id}`;
            const sendData = await axios.post(url, data, { headers });
            const product = sendData.data[0];
            const id_productTitle = document.getElementById('id_Product');
            id_productTitle.innerText = product_id;
            document.getElementById('nameProduct').value = product.name;
            document.getElementById('img').value = product.img;
            document.getElementById('descriptionProduct').value = product.descriptions;
            document.getElementById('imgProduct').src = product.img;
            document.getElementById('priceProduct').value = product.price;
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al obtener el producto:", error);
            }
        }
    }
    seeProduct();
}

function putProduct(event) {
    const putProductAdmin = async () => {
        try {
            const putIdProduct = document.getElementById('id_Product').innerText;
            const putNameProduct = document.getElementById('nameProduct').value;
            const putDescriptionProduct = document.getElementById('descriptionProduct').value;
            const putImgProduct = document.getElementById('img').value;
            const putPriceProduct = document.getElementById('priceProduct').value;
            const product_id = putIdProduct;
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                id: product_id,
                name: putNameProduct,
                descriptions: putDescriptionProduct,
                price: putPriceProduct,
                img: putImgProduct,
            };
            const url = `http://localhost:3000/admin/products/${product_id}`;
            const sendData = await axios.put(url, data, { headers });
            console.log(sendData);
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al editar el producto:", error);
            }
        }
    }
    putProductAdmin();
    mostrarCarga()
    setTimeout(ocultarCarga, 1000);
}

function deleteProduct(event) {
    event.preventDefault();
    const product_id = event.target.id;
    const userConfirmed = window.confirm("¿Estás seguro de que deseas eliminar el producto #" + product_id + "?");
    if (!userConfirmed) {
        return;
    };

    const deleteProductAdmin = async () => {
        try {

            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const url = `http://localhost:3000/admin/products/${product_id}`;
            const sendData = await axios.delete(url, {
                headers: headers, data: { id: product_id }
            });
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al eliminar el producto:", error);
            }
        }
    }
    deleteProductAdmin();
    mostrarCarga()
    setTimeout(ocultarCarga, 1000);
}

function addProduct(event) {
    event.preventDefault();
    const addProductAdmin = async () => {
        try {
            const addNameProduct = document.getElementById('nameAddProduct').value;
            const addDescriptionProduct = document.getElementById('descriptionAddProduct').value;
            const addImgProduct = document.getElementById('imgAddProduct').src;
            const addPriceProduct = document.getElementById('priceAddProduct').value;
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                name: addNameProduct,
                descriptions: addDescriptionProduct,
                price: addPriceProduct,
                img: addImgProduct,
            };
            const url = `http://localhost:3000/admin/products`;
            const sendData = await axios.post(url, data, { headers });
            console.log(sendData);
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al agregar el producto:", error);
            }
        }
    }
    addProductAdmin();
    mostrarCarga()
    setTimeout(ocultarCarga, 1000);

}

//MUESTRA EL LOGO DE CARGA UNA VEZ REALIZADO EL SUBMIT
function mostrarCarga() {
    document.getElementById("loading").style.display = "block";
}

//OCULTA EL LOGO DE CARGA
function ocultarCarga(rol_user) {
    document.getElementById("loading").style.display = "none"
    location.reload();
}
