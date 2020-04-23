const express = require('express');
const app = express();
const port = 8080;

const router = express.Router()

app.use(router);

router.get('/', (req, res) => {
    res.send('Proba')
});

router.get('/stanimir', (req, res)=> {
    res.send('Stanimir')
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`)
})