import { Individual, Position, Company, TypeCharge, TypeBudget, TypeWork, Recruitment } from '@app/models';

export class Employee {
    individualId: Individual = undefined;
    positionId: Position = undefined;
    countWorkDays: number = undefined;
    countHospitalDays: number = undefined;
    countVacationDays: number = undefined;
    countNightShift: number = undefined;
    salary: number = 0;
    recruimentId: Recruitment = undefined;
    constructor() {

    }
}    

export class TimeSheet {
    _id: string = undefined;
    date: Date = undefined;
    number: number = undefined;
    companyId: Company = undefined;
    countWorkDayMounth: number = undefined;
    details: Employee[] = [new Employee];

    constructor() {
        
    }    
}