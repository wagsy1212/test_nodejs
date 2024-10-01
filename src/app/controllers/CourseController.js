const Board = require('../model/Board');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class CourseController {

    // GET show
    show(req, res, next) {
        Board.findOne({slug: req.params.slug})
            .then(console.log(req.params.slug))
            .then(course => res.render('courses/show', {course: mongooseToObject(course)}))
            .catch(next)
    }

    // GET create
    create(req, res, next) {
        res.render('courses/create');
        // res.send([{item1: 'item1'}, {item2: 'item2'}])
        // res.json({
        //     name: 'Phong'
        // })
    }

    // POST store
    store(req, res, next) {
        const user = new Board(req.body);
        user.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    // async store(req, res) {
    //     try {
    //         const users = await Board.find({});
    //         res.json(users);
    //     } catch (err) {
    //         res.status(400).json({ err: 'ERROR!!!' });
    //     }
    // }

    // GET update
    update(req, res, next) {
        Board.find({})
            .then(users => res.render('courses/update', {
                users: multipleMongooseToObject(users)
            }))
            .catch(next)
    }

    // GET edit
    edit(req, res, next) {
        Board.findById(req.params.id)
            .then(user => res.render('courses/edit', {
                user: mongooseToObject(user)
            }))
    }

    // PUT save
    save(req, res, next) {
        Board.updateOne({_id : req.params.id}, req.body)
            .then(() => res.redirect('/courses/update'))
            .catch(next)
    }

    //DELETE delete
    delete(req, res, next) {
        Board.deleteOne({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

}

module.exports = new CourseController;