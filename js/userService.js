function users() {
    document.getElementById('cardHeader').innerHTML = '<h5>Usuarios</h5>';
    const FAKESTORE_ENDPOINT = 'https://api.escuelajs.co/api/v1/users';

    fetch(FAKESTORE_ENDPOINT, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Productos: ', data);

        let listUser = `
        <table class="table ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>`;

        data.forEach(element => {
            listUser += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.email}</td>
                    
                    <td>${element.name}</td>
                    <td>${element.role}</td>
                    <td><img src="${element.avatar}" class="img-thumbnail" alt="avatar del usuario">
                        </td>
                    <td><button type="button" class="btn btn-outline-success" onclick="getUser(${element.id})">Ver</button></td>
                </tr>`;
        });

        listUser += `
            </tbody>
        </table>
       `;

        console.log('HTML generado:', listUser);
        document.getElementById('info').innerHTML = listUser;
    })
    .catch(error => {
        console.error('Error al obtener los productos:', error);
        document.getElementById('info').innerHTML = '<p>Error al cargar productos</p>';
    });
}

function getUser(idUser) {
    const FAKESTORE_ENDPOINT = 'https://api.escuelajs.co/api/v1/users'+ idUser;

    fetch(FAKESTORE_ENDPOINT, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Productos: ', data);
            const user = data;
            const modalUser = `
            <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ver producto</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                  <div class="modal-body">
                    <div class="card">
                       <img src="${user.image}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${user.title}</h5>
                        <p class="card-text">Año: ${user.price}</p>
                        <p class="card-text">Color: ${user.description}</p>
                        <p class="card-text">Código: ${user.category}</p>
                        
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>`;
            document.getElementById('viewModal').innerHTML = modalUser;
            const modal = new bootstrap.Modal(document.getElementById('modalUser'));
            modal.show();
        })
        .catch(error => {
            console.error('error al obtener los productos', error)
            document.getElementById('info').innerHTML = '<h3>No se encontró el producto en la API</h3>';
        });
    
}



