
import { Individual } from '@app/models/individual';
import { Position } from '@app/models/position';
import { Company } from '@app/models/company';
import { TypeCharge } from '@app/models/type-charge';
import { TypeBudget } from '@app/models/type-budget';

export interface Charge{
    typeChargeId: TypeCharge;
    count: number;
}

export interface RecruitmentDetails{
    date_receipt: number;
    date_dismissal: number;
    positionId: Position;
    individualId: Individual;
    salary: number;
    rate: number;
    main_work: string;
    typeBudgetId: TypeBudget;
    charges: Charge[];
}

export interface Recruitment{
    _id:string;
    number: String;
    date: number;
    companyId: Company;
    details: RecruitmentDetails[]
}