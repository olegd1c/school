import * as express from 'express';

import CompanyCtrl from './controllers/company';
import IndividualCtrl from './controllers/individual';
import TypeСharge from './controllers/type_charge';

export default function setRoutes(app) {

  const companies = new CompanyCtrl();
  const individuals = new IndividualCtrl();
  const typeСharges = new TypeСharge();

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
  app.route('/api/individuals/:id').delete(individuals.delete)

  app.route('/api/types-charges').get(typeСharges.getAll);
  app.route('/api/types-charges/count').get(typeСharges.count);
  app.route('/api/types-charges').post(typeСharges.insert);
  app.route('/api/types-charges/:id').get(typeСharges.get);
  app.route('/api/types-charges/:id').put(typeСharges.update);
  app.route('/api/types-charges/:id').delete(typeСharges.delete)
}
