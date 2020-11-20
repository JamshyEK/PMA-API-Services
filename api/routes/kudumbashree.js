const express = require("express");
const router = express.Router();
const authCheck = require('../middleware/check-auth');
const kuduCheck = require('../middleware/kudu-auth');
const kudumbashreeController= require('../Controller/kudumbashree');


router.get("/allRequests",authCheck,kuduCheck,kudumbashreeController.allRequests);
router.put("/updateRequest/:id",authCheck,kuduCheck,kudumbashreeController.updateRequest)
module.exports = router;