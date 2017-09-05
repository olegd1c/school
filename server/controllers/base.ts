abstract class BaseCtrl {

    abstract model: any;

    // Get all
    getAll = (req, res) => {
        this.model.find({}, (err, docs) => {
            if (err) { return console.error(err); }
            res.json(docs);
        });
    };

    // Count all
    count = (req, res) => {
        this.model.count((err, count) => {
            if (err) { return console.error(err); }
            res.json(count);
        });
    };

    // Insert
    insert = (req, res) => {
        console.log(req.body);
        const obj = new this.model(req.body);
        obj.createdAt = new Date().getTime();
        console.log(obj);
        obj.save((err, item) => {
            if (err) { return console.error(err); }
            res.status(200).json(item);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    // Get by id
    get = (req, res) => {
        this.model.findOne({ _id: req.params.id }, (err, obj) => {
            if (err) { return console.error(err); }
            res.json(obj);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    // Update by id
    update = (req, res) => {
        req.body.updatedAt = new Date().getTime();
       console.log(req.body);        
        this.model.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}, (err, obj) => {
            if (err) { return console.error(err); }
            //res.sendStatus(200);
            res.status(200).json(obj);
        });
    };

    // Delete by id
    delete = (req, res) => {
        this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
            if (err) { return console.error(err); }
            res.sendStatus(200);
        }).catch((e) => {
            res.status(400).send(e);
        });
    }
}

export default BaseCtrl;
