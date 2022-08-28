const express = require("express");
const router = express.Router();
const db = require('./db')
const docRef = db.collection('classes');
//instructor for api || This gives us a generic result, good for searching but not for specific results


router.get("/instructor/:instructor1", async (req, res) => {
    let instructor1 = req.params.instructor1.toUpperCase();
    if (instructor1.length <=1){
        res.sendStatus(404);
        return;
    }
    

    const query = await docRef.orderBy('instructor').startAt(instructor1).endAt(instructor1 + '\uf8ff').get();
    if (query.empty) {
        res.sendStatus(404)
    }
    let data = [];
    query.forEach(doc => {
        data.push(doc.data());
    })
    res.json(data);
})
router.get("/result/class", async (req, res) => {
    let params = req.query;
    const query = await docRef
                                .where('instructor', '==', params.instructor)
                                .where('term', '==', params.term)
                                .where('course_number','==',params.course_number)
                                .where('class_section','==',params.class_section).get();
    if (query.empty) {
        res.sendStatus(404)
    }
    let data = [];
    query.forEach(doc => {
        data.push(doc.data());
    });
    
    
    res.json(data);

})
module.exports = router;