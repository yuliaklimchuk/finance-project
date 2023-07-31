
    (() => {
        const ICreamBtnRef = document.querySelector("[data-ice-cream-button]");
        const ICreamBackBtnRef = document.querySelector("[data-ice-cream-back-button]");
        const ICreamCardRef = document.querySelector("[data-products-ice-cream]");
        const ICoffeeBtnRef = document.querySelector("[data-ice-coffee-button]");
        const ICoffeeBackBtnRef = document.querySelector("[data-ice-coffee-back-button]");
        const ICoffeeCardRef = document.querySelector("[data-products-ice-coffee]");
        const milkshakesBtnRef = document.querySelector("[data-milkshakes-button]");
        const milkshakesBackBtnRef = document.querySelector("[data-milkshakes-back-button]");
        const milkshakesCardRef = document.querySelector("[data-products-milkshakes]");
        //Скрипт для первой карточки Ice-Cream  
        ICreamBtnRef.addEventListener("click", () => {
        ICreamCardRef.classList.add("is-flipped-back");
        ICreamCardRef.classList.remove("is-flipped-front");
        });
        ICreamBackBtnRef.addEventListener("click", () => {
        ICreamCardRef.classList.remove("is-flipped-back");
        ICreamCardRef.classList.add("is-flipped-front");
        });
         //Скрипт для второй карточки Ice-Coffee
        ICoffeeBtnRef.addEventListener("click", () => {
        ICoffeeCardRef.classList.add("is-flipped-back");
        ICoffeeCardRef.classList.remove("is-flipped-front");
        });
        ICoffeeBackBtnRef.addEventListener("click", () => {
        ICoffeeCardRef.classList.remove("is-flipped-back");
        ICoffeeCardRef.classList.add("is-flipped-front");
        });
         //Скрипт для  карточки milkshakes
        milkshakesBtnRef.addEventListener("click", () => {
        milkshakesCardRef.classList.add("is-flipped-back");
        milkshakesCardRef.classList.remove("is-flipped-front");
        });
        milkshakesBackBtnRef.addEventListener("click", () => {
        milkshakesCardRef.classList.remove("is-flipped-back");
        milkshakesCardRef.classList.add("is-flipped-front");
        });
    })();