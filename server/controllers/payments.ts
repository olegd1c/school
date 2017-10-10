import Positions from '../models/payment.model';
import BaseCtrl from './base';

export default class PaymentsCtrl extends BaseCtrl {
    model = Positions;

    // Get all
    getAll = (req, res) => {
        this.model.find()
        .populate('companyId')
        .populate('typeId')
        .populate('details.individualId')
        .populate('details.positionId')
        .populate('details.charges.typeChargeId')
        .populate('details.typeBudgetId')
        .populate('details.mainWorkId')
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

    //db.blog.posts.findOne( { }, { "comments" : { "$slice" : 10 } } );

    getSalaryPayment = (req, res) => {
        console.log(req.body);
        const params = req.body.params;
        
        this.model.findOne({ 
            companyId: params.companyId,
            date : {
                $gte: params.start,
                $lte: params.end
            }
        })
        .exec(function(err, items) {
            if(err) return console.error(err);
            let data = JSON.parse(JSON.stringify(items));
            
            console.log('getSalaryPayment');
            console.log(items);
            res.status(200).json(data);
        });
    };     
}