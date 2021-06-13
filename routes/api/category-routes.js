const router = require('express').Router();
const { Category, Product } = require('../../models/index');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{
      model: Product
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

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product
    }]
  }).then(data => {
    res.json(data)
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post('/', (req, res) => {
  // create a new category
  Category.create(
    req.body
  )
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log("Category Created!")
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
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
  console.log("Category ID Updated")
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
      // res.json(data);
      console.log('CATEGORY DESTROYED!')
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });


module.exports = router;
