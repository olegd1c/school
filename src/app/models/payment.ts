
import { TypeCharge, Company, Individual, Position, TypeBudget, TypePayment } from '@app/models';

export enum Budgeting {
    PLAN = 0,
    FACT = 1
}

export class DetailsPayment {    
    individualId: Individual = undefined;
    positionId: Position = undefined;
    typeBudgetId: TypeBudget = undefined;
    typeChargeId: TypeCharge = undefined;
    month: Date = undefined; 
    sum: number = undefined;
    budgeting: Budgeting = undefined;
    constructor(){        
    }    
}

export class Payment{
    _id:string;
    number: string = undefined;
    date: Date = undefined;
    companyId: Company = undefined;
    typePaymentId: TypePayment = undefined;
    details: DetailsPayment[] = undefined;
    total: number = undefined;
    createdAt: Date  = undefined;
    updatedAt: Date  = undefined;

    constructor(){
    }
}