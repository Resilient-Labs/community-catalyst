app.get('/cal', function (req, res) {
    db.collection('calendar').find({ userId: req.user._id }).sort({ date: -1 }).toArray((err, result) => {
        if (err) return console.log(err)
        console.log(req.user)
        res.render('cal2.ejs', {
            user: req.user,
            events: result
        })
    })
});

app.post('/cal', (req, res) => {
    db.collection('calendar').save({ userId: req.user._id, title: req.body.title, date: req.body.date, note: req.body.note, tag: req.body.tag }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/cal')
    })
})