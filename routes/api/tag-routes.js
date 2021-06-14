const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//-----------------------FIND ALL
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag,
      as: 'products'
    }]
  }).then(data => {
    console.log(data);
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//-----------------------FIND ONE
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      through: ProductTag,
      as: 'products'
    }]
  }).then(data => {
    res.json(data)
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//-----------------------CREATE
router.post('/', (req, res) => {
  Tag.create(
    req.body
  )
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log("Tag Created!")
});


//-----------------------UPDATE
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  console.log("Tag Updated")
});
//-----------------------DELETE
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.status(200).json(data);
    console.log('TAG DESTROYED!')
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
