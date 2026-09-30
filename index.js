const express = require('express')
const app = express()

const fs = require('fs').promises
const path = require('path')

const filePath = path.join(__dirname, 'db.json')

app.use(express.json())

async function readfile() {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}
app.get('/products', async (req, res) => {
    const products = await readfile()
    res.json(products)
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