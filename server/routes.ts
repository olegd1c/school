import * as express from 'express';

import CompanyCtrl from './controllers/company';
import IndividualCtrl from './controllers/individual';
import TypeCharge from './controllers/type-charge';
import PositionsCtrl from './controllers/positions';
import RecruitmentsCtrl from './controllers/recruitments';
import TypeBudgetCtrl from './controllers/type-budget';

export default function setRoutes(app) {

    const companies = new CompanyCtrl();
    const individuals = new IndividualCtrl();
    const typeCharges = new TypeCharge();
    const positions = new PositionsCtrl();
    const recruitments = new RecruitmentsCtrl();
    const typeBudgets = new TypeBudgetCtrl();

    // APIs
    app.route('/api/companies').get(companies.getAll);
    app.route('/api/companies/count').get(companies.count);
    app.route('/api/companies').post(companies.insert);
    app.route('/api/companies/:id').get(companies.get);
    app.route('/api/companies/:id').put(companies.update);
    app.route('/api/companies/:id').delete(companies.delete);

    app.route('/api/individuals').get(individuals.getAll);
    app.route('/api/individuals/count').get(individuals.count);
    app.route('/api/individuals').post(individuals.insert);
    app.route('/api/individuals/:id').get(individuals.get);
    app.route('/api/individuals/:id').put(individuals.update);
    app.route('/api/individuals/:id').delete(individuals.delete);

    app.route('/api/types-charges').get(typeCharges.getAll);
    app.route('/api/types-charges/count').get(typeCharges.count);
    app.route('/api/types-charges').post(typeCharges.insert);
    app.route('/api/types-charges/:id').get(typeCharges.get);
    app.route('/api/types-charges/:id').put(typeCharges.update);
    app.route('/api/types-charges/:id').delete(typeCharges.delete);

    app.route('/api/positions').get(positions.getAll);
    app.route('/api/positions/count').get(positions.count);
    app.route('/api/positions').post(positions.insert);
    app.route('/api/positions/:id').get(positions.get);
    app.route('/api/positions/:id').put(positions.update);
    app.route('/api/positions/:id').delete(positions.delete)

    app.route('/api/type-budgets').get(typeBudgets.getAll);
    app.route('/api/type-budgets/count').get(typeBudgets.count);
    app.route('/api/type-budgets').post(typeBudgets.insert);
    app.route('/api/type-budgets/:id').get(typeBudgets.get);
    app.route('/api/type-budgets/:id').put(typeBudgets.update);
    app.route('/api/type-budgets/:id').delete(typeBudgets.delete);  

    app.route('/api/recruitments').get(recruitments.getAll);
    app.route('/api/recruitments/count').get(recruitments.count);
    app.route('/api/recruitments').post(recruitments.insert);
    app.route('/api/recruitments/:id').get(recruitments.get);
    app.route('/api/recruitments/:id').put(recruitments.update);
    app.route('/api/recruitments/:id').delete(recruitments.delete);
}