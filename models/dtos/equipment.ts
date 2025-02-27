import {EquipType} from "../enums/EquipType";
import {Status} from "../enums/Status";

export class Equipment {
    equipName: string;
    equipType: EquipType;
    status: Status;
    staffMember: string;
    fieldName: string;
    isDeleted: boolean;

    constructor(equipName: string, equipType: EquipType, status: Status, staffMember: string, fieldName: string,isDeleted: boolean) {
        this.equipName = equipName;
        this.equipType = equipType;
        this.status = status;
        this.staffMember = staffMember;
        this.fieldName = fieldName;
        this.isDeleted = isDeleted;
    }
}