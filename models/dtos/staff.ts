import {Gender} from "../enums/Gender";

export class Staff {
    name: string;
    designation: string;
    gender: Gender;
    joinedDate: Date;
    dob: Date;
    address: string;
    contact: string;
    email: string;
    fieldName: string;
    isDeleted: boolean;

    constructor(name: string, designation: string, gender: Gender,joinedDate: Date, dob: Date, address: string, contact: string, email: string, fieldName: string, isDeleted: boolean) {
        this.name = name;
        this.designation = designation;
        this.gender = gender;
        this.joinedDate = joinedDate;
        this.dob = dob;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.fieldName = fieldName;
        this.isDeleted = isDeleted;
    }
}