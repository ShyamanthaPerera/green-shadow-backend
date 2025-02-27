import {FuelType} from "../enums/Fuel";
import {Status} from "../enums/Status";

export class Vehicle {
    licensePlateNumber: string;
    category: string;
    fuelType: FuelType;
    status: Status;
    remarks: string;
    staffMember: string;
    isDeleted: boolean;

    constructor(licensePlateNumber: string, category: string, fuelType: FuelType, status: Status,remarks: string,staffMember: string, isDeleted: boolean) {
        this.licensePlateNumber = licensePlateNumber;
        this.category = category;
        this.fuelType = fuelType;
        this.status = status;
        this.remarks = remarks;
        this.staffMember = staffMember;
        this.isDeleted = isDeleted;
    }
}