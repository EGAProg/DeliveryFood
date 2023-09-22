const menu = () => {
    const menu = document.querySelector("#menu");
    
    const cartArr = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    const renderHead = (rests) => {
        const title = document.querySelector(".restaurant-title");
        title.classList.add("section-title");
        const rating = document.querySelector(".rating");
        const price = document.querySelector(".price");
        const category = document.querySelector(".category");

        title.textContent = rests.name;
        rating.textContent = rests.stars;
        price.textContent = rests.price;
        category.textContent = rests.kitchen;
        
    }

    const addToCart = (obj) => {
        if (cartArr.some(item => item.id === obj.id)){
            cartArr.map(item => {
                if (item.id === obj.id){
                    item.count++;
                }
                return item;
            });
        } else {
            cartArr.push(obj);
        }

        localStorage.setItem("cart", JSON.stringify(cartArr));
    }

    const renderDate = (date) => {
        date.forEach(item => {
            const card = document.createElement("div");
            

            card.classList.add("card");
            card.classList.add("card-restaurant");

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${item.name}</h3>
                    </div>
                    <!-- /.card-heading -->
                    <div class="card-info">
                        <div class="ingredients">${item.description}
                        </div>
                    </div>
                    <!-- /.card-info -->
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${item.price} ₽</strong>
                    </div>
                </div>
                <!-- /.card-text -->
            `;
            card.querySelector(".button-add-cart").addEventListener("click", () => {
                const cartItem = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    count: 1
                };
                addToCart(cartItem);
            });
            menu.append(card);
        });
    };

    if (localStorage.getItem("restaurants")) {
        const rests = JSON.parse(localStorage.getItem("restaurants"));
        renderHead(rests);

        fetch(`../db/${rests.products}`)
        .then(res => res.json())
        .then(data => {
            renderDate(data);
        }).catch(err => console.log(err));
    }
    else {
        window.location.href = "/";
    }

};
menu();