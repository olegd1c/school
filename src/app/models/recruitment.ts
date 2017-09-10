
import { Individual, Position, Company, TypeCharge, TypeBudget, TypeWork } from '@app/models';

export class Charge{
    typeChargeId: TypeCharge = undefined;
    count: number = undefined;

    constructor() {

    }
}

export class RecruitmentDetails{
    date_receipt: Date = undefined;
    date_dismissal: Date = undefined;
    positionId: Position = undefined;
    individualId: Individual = undefined;
    salary: number= undefined;
    rate: number = undefined;
    mainWorkId: TypeWork = undefined;
    typeBudgetId: TypeBudget = undefined;
    charges: Charge[] = [new Charge()];

    constructor() {

    }
}

export class Recruitment{
    _id: string = undefined;
    number: String = undefined;
    date: Date = undefined;
    companyId: Company = undefined;
    details: RecruitmentDetails[] = [new RecruitmentDetails()];

    constructor() {

    }
}