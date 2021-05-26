const router = require("express").Router();
const { postEvent, getEvent, getSearchEvent } = require("../controller/event");
const uploadImage = require("../middleware/multer");

router.post("/", uploadImage, postEvent);
router.get("/", getEvent);
router.get("/filter", getSearchEvent);

module.exports = router;
