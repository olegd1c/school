
import { TypeCharge } from '@app/models/type-charge';

export interface Position{
    _id?:string;
    name?: string;
    typeChargeIds?: TypeCharge[];
}