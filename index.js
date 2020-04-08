let fruits = [
    { id: 1, title: 'Apples', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348' },
    { id: 2, title: 'Oranges', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg' },
    { id: 3, title: 'Mango', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg' },
]

// const modal = $.modal({
//     title: 'My titile',
//     content: `<p>Lorem  dolor sit.</p> 
//       <p>Lorem  dolor sit.</p>`,
//     width: '350px',
//     closable: true,
//     footerButtons: [{
//             text: 'Ok',
//             type: 'primary',
//             handler() {
//                 console.log('Primary btn click')
//                 modal.close()
//             }
//         },
//         {
//             text: 'Cansel',
//             type: 'danger',
//             handler() {
//                 console.log('Danger btn click')
//                 modal.close()
//             }
//         }
//     ]
// })


function setHandlers(card, modal) {

    event.preventDefault()
    console.log(modal)
        // if (event.target.dataset.btnPrice) {
        // console.log(card)
    if (modal) {
        modal.setContent(`<p>Цена на ${card.title} - <strong>${card.price}$<strong></p>`, )
        modal.open()
    } else {
        const modal = $.modal({
            title: 'Price',
            content: `<p>Цена на ${card.title} - ${card.price}</p>`,
            width: '350px',
            closable: true,
            footerButtons: [{
                text: 'Ok',
                type: 'primary',
                handler() { modal.close() }
            }]
        })
        modal.open()
    }

    // } else if (event.target.dataset.btnDel) {

    // }

}

function setDelModal(card) {
    event.preventDefault()
    const modal = $.modal({
        title: 'Подтвердите действие',
        content: `<p>Delete card with ${card.title}?</p>`,
        width: '350px',
        closable: false,
        footerButtons: [{
                text: 'Ok',
                type: 'primary',
                handler() {
                    // console.log(document.querySelectorAll('[data-type]'))
                    $cards = [...document.querySelectorAll('[data-type]')]
                        // console.log($cards)
                    const $card = $cards.find(elem => card.title === elem.dataset.type)
                    console.log($card)
                    $card.closest('.col').remove()
                    modal.close()
                    modal.destroy()
                }
            },
            {
                text: 'Cancel',
                type: 'danger',
                handler() {
                    modal.close()
                    modal.destroy()
                }
            }
        ]
    })
    setTimeout(() => modal.open(), 100)
}


function renderCard(cards) {
    const container = document.querySelector('.container')
    const $cardsContainer = document.createElement('div')
    $cardsContainer.classList.add('row')

    container.insertAdjacentElement('beforeend', $cardsContainer)

    const modal = $.modal({
        title: 'Price',
        // content: `<p>Цена на ${card.title} - ${card.price}</p>`,
        width: '350px',
        closable: true,
        footerButtons: [{
            text: 'Ok',
            type: 'primary',
            handler() { modal.close() }
        }]
    })

    cards.forEach(card => {

        const $cardContainer = document.createElement('div')
        $cardContainer.classList.add('col')
        const $cardWrap = document.createElement('div')
        $cardWrap.classList.add('card')
        $cardWrap.dataset.type = card.title
        $cardWrap.insertAdjacentHTML('beforeend',
            `<img class="card-img-top" style="height: 300px;" src="${card.img}">
              <div class="card-body">
                  <h5 class="card-title">${card.title}</h5>
                  <a href="" class="btn btn-primary" data-btn-price="true">View price</a>
                  <a href="" class="btn btn-danger" data-btn-del="true">Delete</a>
              </div>`
        )

        $cardContainer.appendChild($cardWrap)
        $cardsContainer.appendChild($cardContainer)

        $cardWrap.querySelector('[data-btn-price]').addEventListener('click', () => setHandlers(card, modal));
        $cardWrap.querySelector('[data-btn-del]').addEventListener('click', () => setDelModal(card));
    })
}

renderCard(fruits)