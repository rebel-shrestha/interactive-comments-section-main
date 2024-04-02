const fs = require('fs')

const data = fs.readFileSync('data.json')

const jsonData = JSON.parse(data)

console.log(jsonData.comments[1].replies)
