const router = require("express").Router();
const MapController = use('App/Controllers/MapController');

router.post("/map/routes", MapController.routes);
router.get("/map/store", MapController.store);
router.get("/map/configs", MapController.configs);

module.exports = router;