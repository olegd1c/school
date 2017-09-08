
import { Individual } from '@app/models/individual';
import { Position } from '@app/models/position';
import { Company } from '@app/models/company';
import { TypeCharge } from '@app/models/type-charge';
import { TypeBudget } from '@app/models/type-budget';

export class Charge{
    typeChargeId: TypeCharge = undefined;
    count: number = undefined;

    constructor() {
        
    }    
}

export class RecruitmentDetails{
    date_receipt: number = undefined;
    date_dismissal: number=undefined;
    positionId: Position=undefined;
    individualId: Individual=undefined;
    salary: number=undefined;
    rate: number=undefined;
    main_work: string=undefined;
    typeBudgetId: TypeBudget=undefined;
    charges: Charge[]=[new Charge()];
    
    constructor() {

    }
}

export class Recruitment{
    _id:string = undefined;
    number: String = undefined;
    date: number = undefined;
    companyId: Company = undefined;
    details: RecruitmentDetails[] = [new RecruitmentDetails()];

    constructor() {

    }
}