let fruits = [
    {id: 1, title: "яблука", price: 20, img: 'https://www.harbuz.info/wp-content/uploads/2018/05/yabloko.jpg'},
    {id: 2, title: "апельстни", price: 30, img: 'https://ukrslovo.net/wp-content/uploads/files/zdrave/Orange.jpg'},
    {
        id: 3,
        title: "манго",
        price: 40,
        img: 'https://apetit.com.ua/wp-content/uploads/2019/06/korol_fruktov_mango_1.jpg'
    }
]

const toHTML = fruit => `
         <div class="col">
            <div class="card">
                <img class="card-img-top" style="height: 300px;" src=${fruit.img} alt="${fruit.title}">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">побачити ціну</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Видалити</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(fruit => toHTML(fruit)).join('')
    document.querySelector("#fruits").innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Ціна на товар ',
    closable: true,
    width: "400px",
    footerButtons: [
        {
            text: 'Закрити', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
        <p> ціна на ${fruit.title}: <strong>${fruit.price}$</strong>  </p>`)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Ви впевнені ?',
            content: `<p> ви видаляєте фрукт: <strong> ${fruit.title} </strong></p> `
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('cancel')
        })
    }
})

