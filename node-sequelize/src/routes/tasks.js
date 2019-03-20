module.exports = app =>{

    const Tasks = app.db.models.Tasks;

    app.route('/tasks')
    .get((req, res)=>{
        Tasks.findAll({})
        .then(result =>{
            res.json({result})
        })
        .catch(error=>{
            return res.status(412).json({message: error.message})
        })
    })
    .post((req, res)=>{
        const task = req.body;
        // console.log(req.body);
        Tasks.create(task)
        .then(result =>{
            console.log(result);
            res.json({result})
        })
        .catch(error=>{
            console.log(error);
            return res.status(500).json({error: error.message})
        })
    })
    
    app.get('/task/:id', (req, res)=>{
        Tasks.findByPk(req.params.id)
        .then(result=>{
            if(!result) return res.json({message: 'No hay tareas'})
            res.json({result})
        })
    })

    app.put('/task/:id', (req, res)=>{
        const task = req.body;
        console.log(req.body);
        // console.log(req.body);
        Tasks.update(task, {where: {id: req.params.id}})
        .then(result =>{
            console.log(result);
            res.json({result})
        })
        .catch(error=>{
            console.log(error);
            return res.status(500).json({error: error.message})
        })
    })

    app.delete('/task/:id', (req, res)=>{
        Tasks.destroy({where: {id: req.params.id}})
        .then(result =>{
            console.log(result);
            res.json({result})
        })
        .catch(error=>{
            console.log(error);
            return res.status(500).json({error: error.message})
        })
    })

}