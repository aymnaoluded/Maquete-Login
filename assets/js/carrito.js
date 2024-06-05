document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById('cartContainer');
    const carro = JSON.parse(localStorage.getItem('carro')) || [];

    if (carro.length === 0) {
        cartContainer.innerHTML = '<p class="text-center">El carrito está vacío</p>';
        return;
    }

    carro.forEach(libros => {
        if (libros) {
            const comicCard = document.createElement('div');
            comicCard.className = 'col-md-4 mb-4';
            comicCard.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">${libros.name || 'N/A'}</h2>
                    </div>
                    <div class="card-body">
                        ${libros.sprite1 ? `<img src="${libros.sprite1}" class="card-img-top" alt="${libros.name || 'Imagen del cómic'}">` : ''}
                        <p class="card-text">Escritor: ${libros.escritor || 'N/A'}</p>
                        <p class="card-text">Publicación: ${libros.publicaion || 'N/A'}</p>
                        <p class="card-text">Precio: ${libros.precio ? `${libros.precio}` : 'N/A'}</p>
                        <button class="btn btn-danger btn-remove-from-cart" data-id="${libros.id}">Eliminar del carrito</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(comicCard);
        }
    });

    document.querySelectorAll('.btn-remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const libroId = this.getAttribute('data-id');
            removeFromCart(libroId);
        });
    });
});

function removeFromCart(libroId) {
    let carro = JSON.parse(localStorage.getItem('carro')) || [];
    carro = carro.filter(libros => libros.id != libroId);
    localStorage.setItem('carro', JSON.stringify(carro));
    alert('Cómic eliminado del carrito');
    location.reload(); 
}
