import { comics } from "./libros.js";

document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById('cartContainer');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center">El carrito está vacío</p>';
        return;
    }

    cart.forEach(comics => {
        if (comics) {
            const comicCard = document.createElement('div');
            comicCard.className = 'col-md-4 mb-4';
            comicCard.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">${comics.name || 'N/A'}</h2>
                    </div>
                    <div class="card-body">
                        ${comics.sprite1 ? `<img src="${comics.sprite1}" class="card-img-top" alt="${comics.name || 'Imagen del cómic'}">` : ''}
                        <p class="card-text">Escritor: ${comics.escritor || 'N/A'}</p>
                        <p class="card-text">Publicación: ${comics.publicaion || 'N/A'}</p>
                        <p class="card-text">Precio: ${comics.precio ? `${comics.precio}` : 'N/A'}</p>
                        <button class="btn btn-danger btn-remove-from-cart" data-id="${comics.id}">Eliminar del carrito</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(comicCard);
        }
    });

    document.querySelectorAll('.btn-remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const comicId = this.getAttribute('data-id');
            removeFromCart(comicId);
        });
    });
});

function removeFromCart(comicId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(comics => comics.id != comicId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Cómic eliminado del carrito');
    location.reload(); 
}


