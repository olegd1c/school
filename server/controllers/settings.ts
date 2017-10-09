import Setting from '../models/setting.model';
import BaseCtrl from './base';

export default class SettingCtrl extends BaseCtrl {
    model = Setting;

    // Get all 
    getAll = (req, res) => {
        this.model.find()
        .populate('salaryId')
        .populate('prepaymentId')
        .exec(function(err, positions) {
            if(err) return console.error(err);
            console.log(positions);
            res.json(positions);
        });
    };    
}