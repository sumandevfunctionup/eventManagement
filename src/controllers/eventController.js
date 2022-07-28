
const eventModel= require("../models/eventModel");


const createEvent= async function(req,res){
    try{
           let data=req.body;
           let newEvent=await eventModel.create(data)
          
           return res.status(201).send({status:true,msg:"new event created",data:newEvent})
    }

catch(err){
    return res.status(500).send({status:false,ERROR:err})

}
}
const getEvents = async function (req, res) {

    try {
      const filters = req.query
      console.log(filters)
      if (Object.keys(filters).length > 0) {
  
        const availableEvent = await eventModel.find({ $and: [filters, { isDeleted: false }] }).select({ _id: 1, name: 1, date: 1, userId: 1, place: 1}).sort({ name: 1 })
  
        if (!availableEvent.length > 0) {
          return res.status(404).send({ status: false, message: "No event Found For Given info" })
        }
  
        availableEvent.sort(function (first, last) {
          return first.name.localeCompare(last.name);
        })
  
        return res.status(200).send({ status: true, message: "event list", data: availableEvent })
      }
      else {
        const allEvent = await eventModel.find()
        return res.status(200).send({ status: true, message: allEvent })
      }
    }
  
    catch (err) {
      console.log(err)
      res.status(500).send({ status: "failed", message: err.message })
    }
  
  }
  
  




const updateEvent = async function (req, res) {
    try {
        //  eventId is present in request path params or not.
        let eventId = req.params.eventId
        if (!eventId) return res.status(400).send({ status: false, msg: "event Id is required" })

        //  eventId is valid or not.
        let event= await eventModel.findById(eventId)
        if (!event) return res.status(404).send({ status: false, msg: "event does not exists" })

        // checking if event is already deleted
        if (event.isDeleted == true) return res.status(400).send({ error: "Already deleted" })

        // data for updation
        let name = req.body.name
        let place = req.body.place
        let date= req.body.date
        

        // checking , if any filter has no value
        if (name != undefined) {
            if (!isValid(name)) return res.status(400).send({ status: false, msg: 'please provide name' })
        }
        if (place != undefined) {
            if (!isValid(place)) return res.status(400).send({ status: false, msg: 'please provide place' })
        }
        if (date != undefined) {
            if (!isValid(date)) return res.status(400).send({ status: false, msg: 'please provide date' })
        }
        

        let updatedEvent = await eventModel.findOneAndUpdate({ _id: eventId },
            {
                $set: { name: name,  isPublished: true, publishedAt: new Date() },
                $addToSet: { place: place, date: date }
            }, { new: true })

        res.status(200).send({ status: true, data: updatedEvent })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ status: false, msg: " Server Error", error: err.message })
    }
}

const deleteEventBypath = async function (req, res) {
    try {
        //  eventId is present in request path params or not.
        let eventId = req.params.eventId
        if (!eventId) return res.status(400).send({ status: false, msg: "eventId is required" })

        //  eventId is valid or not.
        let event = await eventModel.findById(eventId)
        if (!event) return res.status(404).send({ status: false, msg: "event does not exists" })

        // if event is already deleted
        if (event.isDeleted == true) return res.status(400).send({ status: false, msg: "event is already deleted" })

        // deleting event
        let deletedevent = await eventModel.findOneAndUpdate({ _id: eventId },
            { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })

        res.status(200).send({ msg: "event deleted successfully" })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


module.exports.createEvent=createEvent;
module.exports.updateEvent=updateEvent;
module.exports.deleteEventBypath=deleteEventBypath;
module.exports.getEvents=getEvents;