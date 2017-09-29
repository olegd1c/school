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
}