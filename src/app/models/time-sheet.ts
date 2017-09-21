import { Individual, Position, Company, TypeCharge, TypeBudget, TypeWork } from '@app/models';

export class Employee {
    individualId: Individual = undefined;
    positionId: Position = undefined;
    countWorkDays: Number = undefined;
    countHospitalDays: Number = undefined;
    countVacationDays: Number = undefined;
    period_payment: Date = undefined;
    sum: Number = undefined;
    
    constructor() {

    }
}    

export class TimeSheet {
    _id: string = undefined;
    date: Date = undefined;
    number: Number = undefined;
    companyId: Company = undefined;
    countWorkDayMounth: number = undefined;
    total: number = undefined;
    details: Employee[] = [new Employee];

    constructor() {
        
    }    
}