const cart = () => {
    const modalCart = document.querySelector('.modal-cart');
    const buttonCart = document.querySelector('.button-cart');
    const close = modalCart.querySelector('.close');
    const body = modalCart.querySelector('#cart-body');
    const buttonSend = modalCart.querySelector('.button-primary');
    const clear = document.querySelector('.clear-cart');
    const increment = (id) => {
        const cartArr = JSON.parse(localStorage.getItem('cart'));
        if (cartArr.some(item => item.id === id)){
            cartArr.map(item => {
                if (item.id === id) {
                    item.count++;
                }
                return item;
            });
        }
        localStorage.setItem("cart", JSON.stringify(cartArr));
        fillCart(JSON.parse(localStorage.getItem('cart')));
    }
    const decrement = (id) => {
        const cartArr = JSON.parse(localStorage.getItem('cart'));
        if (cartArr.some(item => item.id === id)){
            cartArr.map(item => {
                if (item.id === id){
                    if (item.count > 0) {
                        item.count--;
                    }
                    else {
                        item.count = 0;
                    }
                }
                return item;
            });
        }
        localStorage.setItem("cart", JSON.stringify(cartArr));
        fillCart(JSON.parse(localStorage.getItem('cart')));
    }

    const resetCart = () => {
        body.innerHTML = '';
        localStorage.removeItem('cart');
        //window.location.reload();
        modalCart.style.display = 'none';
    };
    const fillCart = (date) => {
        date.forEach((item) => {
            body.innerHTML = '';
            const cartEl = document.createElement('div');
            cartEl.classList.add('food-row');

            cartEl.innerHTML = `
                <span class="food-name">${item.name}</span>
				<strong class="food-price">${item.price} ₽</strong>
				<div class="food-counter">
					<button class="counter-button btn-dec" data-index="${item.id}">-</button>
					<span class="counter">${item.count}</span>
					<button class="counter-button btn-inc" data-index="${item.id}">+</button>
				</div>
            `;
            
            body.append(cartEl);
        });
    };

//   /\_ /\
//   |0  0|
//   |
//   \_--_/
//  
//

    // Я до этого костыля сам додумался, хотя можно просто body.innerHTML = '';       (-_-)
    // const removeCart = () => {                                                  \_/     \_/
    //     const cartEl = document.querySelector('.food-row');
    //     while (body.firstChild) {
    //         body.removeChild(body.lastChild);
    //       }
    // };
    
    body.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('btn-dec')) {
            decrement(e.target.dataset.index)
        }
        else if (e.target.classList.contains('btn-inc')) {
            increment(e.target.dataset.index)
        }
    });
    clear.addEventListener('click', () => {
        resetCart();
    });
    buttonSend.addEventListener('click', () => {
        const cartArr = JSON.parse(localStorage.getItem('cart'));
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartArr)
        }).then((data) => {
            console.log(data);
            resetCart();
        }).catch((err) => {console.log(err)});
        
    });

    buttonCart.addEventListener('click', () => {
		modalCart.style.display = 'flex';
        if (localStorage.getItem('cart')) {
            fillCart(JSON.parse(localStorage.getItem('cart')));
        }

	});
    close.addEventListener('click', () => {
        //removeCart();
		modalCart.style.display = 'none';
	});
};
cart();

