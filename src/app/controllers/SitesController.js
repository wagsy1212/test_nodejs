const Board = require('../model/Board');
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

    // async index(req, res) {
    //     try {
    //         const users = await Board.find({});
    //         res.json(users);
    //     } catch (err) {
    //         res.status(400).json({ err: 'ERROR!!!' });
    //     }

    index(req, res, next) {
        Board.find({})
            .then(courses => res.render('home', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }

        // try {
        //     const newBoard = await Board.create({
        //         name: 'Sample Board',
        //         description: 'This is a sample board created from code'
        //     });
        //     console.log('New board created:', newBoard);
        // } catch (error) {
        //     console.error('Error creating new board:', error);
        // }

    show(req, res) {
        res.render('search');
    }

}

module.exports = new SiteController;