export class Log {
    logName: string;
    logDate: Date;
    logImage: string | undefined;
    fieldName: string;
    cropName: string;
    staffMember: string;
    isDeleted: boolean;

    constructor(logName: string, logDate: Date,  logImage: string, fieldName: string, cropName: string, staffMember: string, isDeleted: boolean) {
        this.logName = logName;
        this.logDate = logDate;
        this.logImage = logImage;
        this.fieldName = fieldName;
        this.cropName = cropName;
        this.staffMember = staffMember;
        this.isDeleted = isDeleted;
    }
}