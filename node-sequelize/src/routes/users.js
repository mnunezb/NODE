module.exports = app => {
  const Users = app.db.models.Users;

  
  app.get("/users", (req, res) => {
    Users.find()
      .then(result => {
        console.log(result);
        res.json({ result });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: error.message });
      });
  });

  app.get("/user/:id", (req, res) => {
    Users.findByPk(req.params.id, {
      attributes: ["id", "name", "email"]
    })
      .then(result => {
        console.log(result);
        res.json({ result });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: error.message });
      });
  });

  app.post("/user", (req, res) => {
    Users.create(req.body)
      .then(result => {
        console.log(result);
        res.json({ result });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: error.message });
      });
  });

  app.delete("/user:id", (req, params) => {
    User.destroy({ where: { id: req.params.id } })
      .then(result => {
        console.log(result);
        res.json({ result });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: error.message });
      });
  });
};
