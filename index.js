let fruits = [
    { id: 1, title: 'Apples', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348' },
    { id: 2, title: 'Oranges', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg' },
    { id: 3, title: 'Mango', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg' },
]

const priceModal = $.modal({
    title: 'Price',
    width: '350px',
    closable: true,
    footerButtons: [{
        text: 'Ok',
        type: 'primary',
        handler() { priceModal.close() }
    }]
})

const toHTML = fruit => {
    return `
    <div class="col">
      <div class="card">
        <img class="card-img-top" style="height: 300px;" src="${fruit.img}">
        <div class="card-body">
          <h5 class="card-title">${fruit.title}</h5>
          <a href="" class="btn btn-primary" data-id="${fruit.id}" data-btn="price">View price</a>
          <a href="" class="btn btn-danger" data-id="${fruit.id}" data-btn="del">Delete</a>
        </div>
      </div>
    </div>`
}

function renderCard() {
    const $cardsContainer = document.querySelector('[data-cards]')
    $cardsContainer.innerHTML = fruits.map(toHTML).join('')
}

renderCard()

document.addEventListener('click', () => {
    event.preventDefault()
    if (event.target.dataset.btn === 'price') {
        const id = +event.target.dataset.id
        const fruit = fruits.find(fruit => fruit.id === id)
        priceModal.setContent(`<p>Цена на ${fruit.title} - <strong>${fruit.price}$</strong></p>`)
        priceModal.open()
    } else if (event.target.dataset.btn === 'del') {
        const id = +event.target.dataset.id
        const fruit = fruits.find(fruit => fruit.id === id)
        $.confirm({
            title: 'Are you sure?',
            content: `<p><strong>You deleting card with fruit: ${fruit.title}</strong></p>`
        }).then(() => {
            console.log('Remove')
                // тут можно удалить из общего массива удаляемый элемент и перерендерить страницу
            fruits = fruits.filter(fruit => fruit.id !== id)
            renderCard()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})