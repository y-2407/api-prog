import { Router } from "express"; 
let router = Router()

let data = [
    {"id": "1", "Firstname": "Jyri", "Surname": "Kemppainen"},
    {"id": "2","Firstname": "Petri", "Surname": "Laitinen"}

]

router.get('/', (req, res) => {
    res.json( data )
})

router.get('/:id', (req, res) => {
    res.json( data.find(b => b.id ===req.params.id ) )
}) 


router.post('/', (req, res) => {
    if(data.find(b => b.id === req.body.id)){
        res.status(409).json({"error": "Record already exists"})
    } else {
        data = [...data, req.body];
        res.json(req.body);
    }
     
    
})

/*router.post('/', (req, res) => {
    if (req.headers['content-type'] !== 'application/json'){
        return res.status(415).json({ "error": "Unsupported Media Type"});
    }
    if(data.find(b => b.id === req.body.id)){
        res.status(409).json({"error": "record already exists"});
    } else {
        data = [...data, req.body];
        res.status(201).json(req.body);
    }
});*/

router.delete('/:id', (req, res) => {
    const index = data.findIndex(b => b.id === req.params.id);
    if (index === -1){
        return res.status(404).json({ "error": "Record not found"});
    }
    data.splice(index, 1);
    res.status(200).json({ "message" : "Record deleted"});
});

router.put('/:id', (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({"error" : "Unsupported media type"});
    }
    const index = data.findIndex(b => b.id === req.params.id);
    if (index === -1) {
        const newRecord = { id: req.params.id, ...req.body };
        data = [...data, newRecord];
        return res.status(201).json(newRecord);
    } else {
        data[index] = { ...data[index], ...req.body };
        return res.status(200).json(data[index]);
    }
});

export default router;