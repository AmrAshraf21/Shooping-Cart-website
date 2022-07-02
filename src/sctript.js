let shop = document.querySelector('#shop');
let basket=JSON.parse(localStorage.getItem('data')) || [];



let generateShop = ()=>{
    return (shop.innerHTML = shopItemData.map(x =>{
        let {id,name,price,desc,img} = x;
            let search = basket.find((x)=> x.id ===id) ||[];
        return `
    
        <div id=product-id-${id} class="item">
                <img width="220" src=${} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>${price}$</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${search.item ===undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus"></i>
                        </div>
    
                    </div>
                </div>
    
            </div>
        
        
        
        `
    }).join('')

)
}

generateShop();


let increment = (id)=>{
    let selectedItem = id;
    let search = basket.find((ele)=> ele.id ===selectedItem)
    if(search === undefined){
        basket.push({
            id:selectedItem,
            item:1
    })
    }else{
        search.item +=1
    }
    update(selectedItem)
    localStorage.setItem('data',JSON.stringify(basket))

}


let decrement = (id)=>{
    let selectedItem =id;
    let search = basket.find((ele)=> ele.id ===selectedItem);
    if(search === undefined)return;
    else if(search.item ===0)return;
    else{
        search.item -=1
    }

    update(selectedItem)
    basket = basket.filter((ele)=> ele.item !==0)
    localStorage.setItem('data',JSON.stringify(basket))
}
let update = (id)=>{

let search = basket.find((ele)=> ele.id ===id);
document.getElementById(id).innerHTML = search.item;
calc();
}

let calc = ()=>{

    let cartIcon = document.querySelector('.cartAmount');
    cartIcon.innerHTML = basket.map((ele)=> ele.item).reduce((pre,cur)=> pre + cur,0)

}
calc()

