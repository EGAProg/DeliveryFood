const partners = () => {
    const cardRest = document.querySelector("#rests");

    const renderDate = (date) => {
        date.forEach(item => {
            const a = document.createElement("a");
            a.setAttribute("href", "./pizzaPlus.html");
            
            a.classList.add("card-restaurant");
            a.classList.add("card");
            a.dataset.products = item.products;
            
            a.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${item.name}</h3>
                        <span class="card-tag tag">${item.time_of_delivery}</span>
                    </div>
                    <!-- /.card-heading -->
                    <div class="card-info">
                        <div class="rating">
                            ${item.stars}
                        </div>
                        <div class="price">${item.price}</div>
                        <div class="category">${item.kitchen}</div>
                    </div>
                    <!-- /.card-info -->
                </div>
            `;
            cardRest.append(a);

            a.addEventListener("click", (e) => {
                e.preventDefault();

                localStorage.setItem("restaurants", JSON.stringify(item));
                window.location.href = "./pizzaPlus.html";
            });
        });
    };
    fetch(`../db/partners.json`).then(res => res.json()).then(data => { renderDate(data); }).catch(err => console.log(err)); 
}; 
partners();