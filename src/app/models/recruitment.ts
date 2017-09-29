
import { Individual, Position, Company, TypeCharge, TypeBudget, TypeWork } from '@app/models';

export class Charge{
    typeChargeId: TypeCharge = undefined;
    count: number = undefined;

    constructor() {

    }
}

export class Recruitment {
    _id: string = undefined;
    number: String = undefined;
    date: Date = undefined;
    companyId: Company = undefined;
    individualId: Individual = undefined;
    positionId: Position = undefined;
    dateReceipt: Date = undefined;
    dateDismissal: Date = undefined;
    salary: number= undefined;
    rate: number = undefined;
    mainWorkId: TypeWork = undefined;
    typeBudgetId: TypeBudget = undefined;
    charges: Charge[] = [new Charge()];

    constructor() {

    }
}