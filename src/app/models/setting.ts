import { TypePayment } from '@app/models';

export interface Setting{
    _id?:string;
    percentPrepayment?: number;
    prepaymentId?: TypePayment;
    salaryId?: TypePayment;
}