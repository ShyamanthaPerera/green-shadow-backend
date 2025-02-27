export class Field {
    fieldName : string;
    location : string;
    extentSize: number;
    fieldImage : string | undefined;
    isDeleted: boolean;

    constructor(fieldName: string, location: string, extentSize: number, fieldImage: string, isDeleted: boolean) {
        this.fieldName = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.fieldImage = fieldImage;
        this.isDeleted = isDeleted;
    }
}