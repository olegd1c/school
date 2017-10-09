import TimeSheet from '../models/time-sheet.model';
import BaseCtrl from './base';

export default class TimeSheetCtrl extends BaseCtrl {
    model = TimeSheet;

    // Get all 
    getAll = (req, res) => {
        this.model.find()
        .populate('companyId')
        .populate('details.individualId')
        .populate('details.positionId')
        .exec(function(err, positions) {
            if(err) return console.error(err);
            console.log(positions);
            res.json(positions);
        });
    };

    getEmployees = (req, res) => {
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
            
            console.log('getEmployees');
            console.log(items);
            res.status(200).json(data);
        });
    };        
}