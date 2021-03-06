import Positions from '../models/position.model';
import BaseCtrl from './base';

export default class PositionsCtrl extends BaseCtrl {
    model = Positions;

    // Get all
    getAll = (req, res) => {
        this.model.find()
        .populate('typeChargeIds')
        .exec(function(err, positions) {
            if(err) return console.error(err);
            console.log(positions);
            res.json(positions);
        });
    };

    // Insert
    insert = (req, res) => {
        console.log(req.body);
        const obj = new this.model(req.body);
        obj.save((err, item) => {
            if (err) { return console.error(err); }
            res.status(200).json(item);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    // Get by id
    get = (req, res) => {
        this.model.findOne({ _id: req.params.id })
        .populate('typeChargeIds')
        .exec(function(err, position) {
            if(err) return console.error(err);
            console.log(position);
            res.status(200).json(position);
        });
    };
}