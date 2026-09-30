const express = require('express')
const app = express()

const fs = require('fs').promises
const path = require('path')

const filePath = path.join(__dirname, 'db.json')

// Cache
const cache = {}


async function readfile() {

    const data = await fs.readFile(filePath, 'utf-8')

    return JSON.parse(data)
}


async function readfileWithDelay() {

    await new Promise((resolve) => {
        setTimeout(resolve, 1500)
    })

    return readfile()
}


app.get('/products', async (req, res) => {

    try {

        const key = req.url
        const value = cache[key]

        if (value) {
            console.log("Getting from cache")
            return res.json(value)
        }

        const products = await readfileWithDelay()

        cache[key] = products
          res.json(products)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')

    }
})


app.get('/product/:id', async (req, res) => {

    const { id } = req.params
    const products = await readfile()
    const product = products.find(
        product => product.id === Number(id)
    )
    if (product) {
        res.json(product)
    } else {
        res.status(404).send('Product not found')
    }

})

app.listen(3000, () => {
    console.log("SERVER START AT LOCALHOST 3000")
})