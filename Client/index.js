const API_URL = "http://localhost:8080/api/";
const isAdmin = true;

let productos = document.getElementById("productos");
// productos.addEventListener ("click", e => {
  
//   console.log(e.target.dataset)
  
//   if (e.target.dataset.funcion == "comprarProd"){
//     // elimininarProd(e.target.data.id)
//     console.log(e.target.dataset.funcion)
//     comprarProd(e.target.dataset.id)
//   }
//   e.preventDefault();
// })

async function getResponse() {
  await fetch("http://localhost:8080/api/productos")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((prod) => {
        productos.innerHTML += `
      <div class="col">
      <div class="card">
        <img src="${prod.thumbnail}" class="card-img-top"
          alt="${prod.name}" />
          <div class="card-body">
          <h5 class="card-title">${prod.name}</h5>

          <p class="card-text">
          $ ${(prod.price).toLocaleString('de-DE')}
          </p>
          ${
            isAdmin
              ? `<button type="button" class="btn btn-secondary botonAct" disabled>Actualizar</button><i class="fa-solid fa-trash" onclick="eliminarProd(${prod.id})" data-id="${prod.id}"></i>`
              : `<button  class="compra btn btn-secondary" data-funcion="comprarProd" data-id="${prod.id}" >Comprar</button>`
          }

        </div>
      </div>
    </div>
    `;
    // onclick="comprarProd(${prod.id})"

      });
      
    })
    
    .catch((err) => console.log(err));
  }
  
getResponse();

function eliminarProd(id) {
  fetch(API_URL + "productos/" + id, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error: ", error));
}


// let buttons = document.querySelectorAll('compra');
// buttons.forEach (b => {


//     b.addEventListener('click', function (event) {  
//         // prevent browser's default action
//         event.preventDefault();
//         console.log(event.target)

//         // call your awesome function here
//         // comprarProd(this); // 'this' refers to the current button on for loop
//     }, false);
// })

function comprarProd(id){


let request = {
  method: "POST",
  body: JSON.stringify({
    id: id,
  }),
};

fetch(API_URL + "carrito/2/productos", request)
  .then((res) => res.json())
  .then((data) => {
    console.log(request.body);
    console.log("Producto agregado al carrito");
    
  })
  .catch((error) => console.error("Error: ", error));

}
  
