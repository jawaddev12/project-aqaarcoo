export class Property {
  
    subscribe(arg0: (data: any) => void) {
      throw new Error('Method not implemented.');
    }
    constructor(public id: number,
        public country: any, 
        public catrgory:number,
        public titleEn: string, 
        public titlear: string, 
        public titleAr: string, 
        public titleFr: string, 
        public titleTr: string, 
        public slug: string, 
        public slugar: string, 
        public desc: string,
        public descrAr: string,
        public descrEn: string,
        public descrTr: string,
        public descrFr: string,
        public propertyType: string,
        public type: string[], 
        public mainphoto:string,
        public currency:string,
        public city: string,
        public zipCode: string[],
        public neighborhood: string[],
        public street: string[],
        public location: Location,
        public formattedAddress: string,
        public features: string[],
        public featured: boolean,
        public priceDollar: Price,
        public priceEuro: Price,
        public priceqatar: Price,
        public price: Price,
        public nbrBedRooms: number,
        public nbrBathroom: number,
        public nbrLivingroom: number,
        public nbrDinning: number,
        public buildArea: number,
        public blotArea: number,
        public garages: number,
        public area: Area,
        public yearBuilt: number,
        public ratingsCount: number,
        public ratingsValue: number,
        public additionalFeatures: AdditionalFeature[],
        public gallery: Gallery[],
        public plans: Plan[],
        public videos: Video[],
        public published: string,
        public lastUpdate: string,
        public languageto: string,
        public unit :string,
        public lat :string,
        public lng :string,
        public email :string,
        public whatsapp :number,
        public company :number,
        public phone :number,
        public views: number,
        public broker: number){ }
/*
    constructor(public id: number,
                public title: string, 
                public titlear: string, 
                public slug: string, 
                public slugar: string, 
                public desc: string,
                public acquisitionType: string,
                public propertyStatus: string[], 
                public city: string,
                public zipCode: string[],
                public neighborhood: string[],
                public street: string[],
                public location: Location,
                public formattedAddress: string,
                public features: string[],
                public featured: boolean,
                public priceDollar: Price,
                public priceEuro: Price,
                public priceqatar: Price,
                public nbrBedRooms: number,
                public nbrBathroom: number,
                public garages: number,
                public area: Area,
                public yearBuilt: number,
                public ratingsCount: number,
                public ratingsValue: number,
                public additionalFeatures: AdditionalFeature[],
                public gallery: Gallery[],
                public plans: Plan[],
                public videos: Video[],
                public published: string,
                public lastUpdate: string,
                public languageto: string,
                public views: number){ }

                */
} 


export class photos {
    constructor(public id: number, 
                public img: string,
                public aqar: number,
                public type :string){ }
}
export class Area {
    constructor(public id: number, 
                public value: number,
                public unit: string){ }
}
export class AdditionalFeature {
    constructor(public id: number, 
                public name: string,
                public value: string){ }
}

export class Location {
    constructor(public propertyId: number,
                public lat: number,
                public lng: number){ }
}

export class Price {
    public sale: number;
    public rent: number;
}


export class Gallery {
    constructor(public id: number, 
                public small: string,
                public medium: string,
                public big: string){ }
}

export class Plan {
    constructor(public id: number, 
                public name: string,
                public desc: string,
                public area: Area,
                public rooms: number,
                public baths: number,
                public image: string){ }
}

export class Video {
    constructor(public id: number, 
                public name: string,
                public link: string){ }
}

export class Pagination {
    constructor(public page: number,
                public perPage: number,
                public prePage: number,
                public nextPage: number,
                public total: number,
                public totalPages: number){ }
}

export class Cityclass {
    find(arg0: (c: any) => boolean) {
      throw new Error('Method not implemented.');
    }
    constructor(public id: number, 
        public buy:string,
        public sell:string,
        public asked:string,
        public arabicname: string,
        public englishname: string,
        public frenchname: string,
        public turkishname: string,
        public img:string,
        public isactive:number,
        public createdby:number,
        public modifiedby:number,

    
    
                ){ }
}
export class regionclass {
    constructor(public id: number,
        public category: string,
        public cityId:number,
        public arabicname: string,
        public englishname: string,
        public frenchname: string,
        public turkishname: string,
        public img: string,
        public isactive: 1,
        public createdby: string,
        public  modifiedby: string,
        public  _id: string
                ){ }
}
export class PropertyTypes {
    constructor(public id: number, 
                public namear: string,
                public nameen: string,
                public namefr: string,
                public nametu: string,
                public img:string,
                ){ }
}
export class PropertyStatuess {
    constructor(public id: number, 
                public name: string,

                ){ }
}
export class countries {
static namearabic: any;
    constructor(public id: any, 
                public namearabic: string,
                public nameenglish: string,
                public namefrench: string,
                public nameturkish: string,
                public flag:string,
                public arabic:boolean,
                public english:boolean,
                public french:boolean,
                public turkish:boolean,
                public _id:string,
                public buy:boolean,
                public asked:boolean,
                public sell:boolean,
                public showregions:boolean,
                public isactive:number,
                ){ }
    }
                export class language {
                    constructor(public id: number, 
                                public name: string,
                                public short: string,
                                public countryid: any,
                                public firstlang:boolean,
                                public arabic:any,
                                public english:any,
                                public french:any,
                                public turkish:any,
                                public namearabic:string,
                                public nameenglish:string,
                                public namefrench:string,
                                public nameturkish:string,

                                ){ }
                                
}
export class Articles {
    constructor(public id: number, 
                public title1: string,
                public title2: string,
                public title3: string,
                public text1: string,
                public text2: string,
                public text3: string,
                public img1: string,
                public img2: string,
                public img3: string,
               

                ){ }
                
}
export class companyclass {
    constructor(public id: number, 
                public country: number,
                public img: string,
                public is_active: number,
                public startpublish: string,
                public endpublish: string,
                public text3: string,
                public createdby: number,
                public action: string,
                public value: string,
               

                ){ }
                
}
export class counteqars {
    constructor(public eqars: number, 

               

                ){ }
                
}
