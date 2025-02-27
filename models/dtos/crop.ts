export class Crop{
    commonName: string;
    scientificName: string;
    category: string;
    cropImage: string | undefined;
    fieldName: string;
    isDeleted: boolean

    constructor(commonName:string,scientificName:string,category:string,cropImage:string,fieldName:string,isDeleted:boolean) {
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.category = category;
        this.cropImage = cropImage;
        this.fieldName = fieldName;
        this.isDeleted = isDeleted;
    }
}