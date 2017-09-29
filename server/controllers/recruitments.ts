import Recruitment from '../models/recruitment.model';
import RecruitmentDetails from '../models/recruitment.model';
import BaseCtrl from './base';
let moment = require('moment');
import * as mongoose from 'mongoose';

export default class RecruitmentsCtrl extends BaseCtrl {
    model = Recruitment;

    // Get all 
    getAll = (req, res) => {
        this.model.find()
        .populate('companyId')
        .populate('individualId')
        .populate('positionId')
        .populate('typeWorkId')
        .populate('charges.typeChargeId')
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
        .exec(function(err, recruitment) {
            if(err) return console.error(err);
            let data = JSON.parse(JSON.stringify(recruitment));
            let d = data.date;
            data.date = moment(d).format('YYYY-MM-DD');
            data.dateReceipt = moment(data.dateReceipt).format('YYYY-MM-DD');
            if(data.dateDismissal) {
                data.dateDismissal = moment(data.dateDismissal).format('YYYY-MM-DD');
            }            
            res.status(200).json(data);
        });
    };

    getEmployees = (req, res) => {
        console.log(req.body);
        const params = req.body.params;
        
        this.model.find({ 
            companyId: params.companyId,
            dateReceipt : {
                $gte: params.start,
                $lte: params.end
            }          
        })
        .select('individualId')
        .select('positionId')
        .and([
            {$or: [
                {dateDismissal: null},
                {dateDismissal : 
                    {
                        $gte: params.end,
                    }
                }
            ]}
        ])
        .exec(function(err, items) {
            if(err) return console.error(err);
            let data = JSON.parse(JSON.stringify(items));
            
            console.log('getEmployees');
            console.log(items);
            res.status(200).json(data);
        });
    };    
}