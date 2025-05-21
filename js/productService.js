function products() {
    document.getElementById('cardHeader').innerHTML = '<h5>Productos</h5>';
    const FAKESTORE_ENDPOINT = 'https://api.escuelajs.co/api/v1/products';

    fetch(FAKESTORE_ENDPOINT, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Productos: ', data);

        let listProduct = `
        <table class="table ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">precio</th>
                    <th scope="col">Descripcion</th>
                </tr>
            </thead>
            <tbody>`;

        data.forEach(element => {
            listProduct += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td> 
                    <td>${element.price}</td>
                    <td>${element.description}</td>
                     <td><img src="${element.images}" class="img-thumbnail" alt="avatar del usuario">
                        </td>
                    <td><button type="button" class="btn btn-outline-success" onclick="getProduct(${element.id})">Ver</button></td>
                </tr>`;
        });

        listProduct += `
            </tbody>
        </table>
       `;

        console.log('HTML generado:', listProduct);
        document.getElementById('info').innerHTML = listProduct;
    })
    .catch(error => {
        console.error('Error al obtener los productos:', error);
        document.getElementById('info').innerHTML = '<p>Error al cargar productos</p>';
    });
}

function getProduct(idProduct) {
    const FAKESTORE_ENDPOINT = 'https://api.escuelajs.co/api/v1/products/'+ idProduct;

    fetch(FAKESTORE_ENDPOINT, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Productos: ', data);
            const product = data;
            const modalProduct = `
            <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ver producto</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                  <div class="modal-body">
                    <div class="card">
                       <img src="${product.images}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">Nombre:${product.title}</h5>
                        <p class="card-text">Precio: ${product.price}</p>
                        <p class="card-text">Descripcion: ${product.description}</p>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>`;
            document.getElementById('viewModal').innerHTML = modalProduct;
            const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
            modal.show();
        })
        .catch(error => {
            console.error('error al obtener los productos', error)
            document.getElementById('info').innerHTML = '<h3>No se encontró el producto en la API</h3>';
        });
    
}