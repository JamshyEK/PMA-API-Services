const express = require("express");
const router = express.Router();
const adminController=require("../Controller/admin");
const authCheck = require('../middleware/check-auth');
const authadminCheck = require('../middleware/admin-auth');

router.get("/allRequests",authCheck,authadminCheck,adminController.allRequests);

router.put("/updateRequests",authCheck,authadminCheck,adminController.updateRequests);

router.post("/registerKudumbashree",authCheck,authadminCheck,adminController.registerKudumbashree);

router.post("/frontpagePosts",authCheck,authadminCheck,adminController.frontpagePosts);

module.exports = router;