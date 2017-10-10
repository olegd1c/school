import * as express from 'express';

import CompanyCtrl from './controllers/company';
import IndividualCtrl from './controllers/individual';
import TypeCharge from './controllers/type-charges';
import PositionsCtrl from './controllers/positions';
import RecruitmentsCtrl from './controllers/recruitments';
import TypeBudgetCtrl from './controllers/type-budgets';
import TypeWorkCtrl from './controllers/type-works';
import UnitCtrl from './controllers/unit';
import TimeSheetCtrl from './controllers/time-sheets';
import TypePaymentsCtrl from './controllers/type-payments';
import PaymentsCtrl from './controllers/payments';
import SettingsCtrl from './controllers/settings';

export default function setRoutes(app) {

    const companies = new CompanyCtrl();
    const individuals = new IndividualCtrl();
    const typeCharges = new TypeCharge();
    const positions = new PositionsCtrl();
    const recruitments = new RecruitmentsCtrl();
    const typeBudgets = new TypeBudgetCtrl();
    const typeWorks = new TypeWorkCtrl();
    const units = new UnitCtrl();
    const timeSheets = new TimeSheetCtrl();
    const typePayments = new TypePaymentsCtrl();
    const payments = new PaymentsCtrl();
    const settings = new SettingsCtrl();

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

    app.route('/api/type-charges').get(typeCharges.getAll);
    app.route('/api/type-charges/count').get(typeCharges.count);
    app.route('/api/type-charges').post(typeCharges.insert);
    app.route('/api/type-charges/:id').get(typeCharges.get);
    app.route('/api/type-charges/:id').put(typeCharges.update);
    app.route('/api/type-charges/:id').delete(typeCharges.delete);

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
    app.route('/api/recruitments/employees').post(recruitments.getEmployees);
    app.route('/api/recruitments').post(recruitments.insert);
    app.route('/api/recruitments/:id').get(recruitments.get);
    app.route('/api/recruitments/:id').put(recruitments.update);
    app.route('/api/recruitments/:id').delete(recruitments.delete);

    app.route('/api/type-works').get(typeWorks.getAll);
    app.route('/api/type-works/count').get(typeWorks.count);
    app.route('/api/type-works').post(typeWorks.insert);
    app.route('/api/type-works/:id').get(typeWorks.get);
    app.route('/api/type-works/:id').put(typeWorks.update);
    app.route('/api/type-works/:id').delete(typeWorks.delete);

    app.route('/api/units').get(units.getAll);
    app.route('/api/units/count').get(units.count);
    app.route('/api/units').post(units.insert);
    app.route('/api/units/:id').get(units.get);
    app.route('/api/units/:id').put(units.update);
    app.route('/api/units/:id').delete(units.delete);

    app.route('/api/time-sheets').get(timeSheets.getAll);
    app.route('/api/time-sheets/count').get(timeSheets.count);
    app.route('/api/time-sheets/employees').post(timeSheets.getEmployees);
    app.route('/api/time-sheets').post(timeSheets.insert);
    app.route('/api/time-sheets/:id').get(timeSheets.get);
    app.route('/api/time-sheets/:id').put(timeSheets.update);
    app.route('/api/time-sheets/:id').delete(timeSheets.delete);

    app.route('/api/type-payments').get(typePayments.getAll);
    app.route('/api/type-payments/count').get(typePayments.count);
    app.route('/api/type-payments').post(typePayments.insert);
    app.route('/api/type-payments/:id').get(typePayments.get);
    app.route('/api/type-payments/:id').put(typePayments.update);
    app.route('/api/type-payments/:id').delete(typePayments.delete);

    app.route('/api/payments').get(payments.getAll);
    app.route('/api/payments/count').get(payments.count);
    app.route('/api/payments/salary-payment').post(payments.getSalaryPayment);
    app.route('/api/payments').post(payments.insert);
    app.route('/api/payments/:id').get(payments.get);
    app.route('/api/payments/:id').put(payments.update);
    app.route('/api/payments/:id').delete(payments.delete);

    app.route('/api/settings').get(settings.getAll);
    app.route('/api/settings/count').get(settings.count);
    app.route('/api/settings').post(settings.insert);
    app.route('/api/settings/:id').get(settings.get);
    app.route('/api/settings/:id').put(settings.update);
    app.route('/api/settings/:id').delete(settings.delete);    
}