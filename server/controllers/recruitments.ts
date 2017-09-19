import Recruitment from '../models/recruitment.model';
import BaseCtrl from './base';
let moment = require('moment');

export default class RecruitmentsCtrl extends BaseCtrl {
    model = Recruitment;

    // Get all 
    getAll = (req, res) => {
        this.model.find()
        .populate('companyId')
        .populate('details.individualId')
        .populate('details.positionId')
        .populate('details.typeWorkId')
        .populate('details.charges.typeChargeId')
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
        obj.createdAt = new Date().getTime();
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
        //.populate('companyId')
        //.populate('details.individualId')
        //.populate('details.positionId')
        //.populate('details.charges.typeChargeId')
        //.populate('details.typeBudgetId')
        //.populate('details.mainWorkId')
        .populate('company')
        .exec(function(err, recruitment) {
            if(err) return console.error(err);
            let data = JSON.parse(JSON.stringify(recruitment));
            let d = data.date;
            data.date = moment(d).format('YYYY-MM-DD');    
            data.details.forEach(function(detail) {
                detail.dateReceipt = moment(detail.dateReceipt).format('YYYY-MM-DD');
                if(detail.dateDismissal) {
                    detail.dateDismissal = moment(detail.dateDismissal).format('YYYY-MM-DD');
                }
              });
              
              console.log('company get');
              console.log(data);
            res.status(200).json(data);
        });
    };
}