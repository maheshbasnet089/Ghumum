const tourController = require("../controllers /tourController");
const router = require("express").Router();

router.get("/tours", tourController().getAllTours);
router.get("/tours/:id", tourController().getTour);
router.post("/tours", tourController().createTour);
router.get("/tours/delete/:id", tourController().deleteTour);
router.patch("/tours/update/:id", tourController().updateTour);

module.exports = router;
