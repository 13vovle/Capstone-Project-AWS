let express = require("express");
let router = express.Router();
let TicketController = require("../controller/tickets.controller.js");

router.post("/createTicket", TicketController.addTicket);
router.get("/getTickets", TicketController.getTickets);
router.put("/updateTicket", TicketController.updateTicket);

module.exports = router;