import { LongTapEvent } from 'ag-grid-community';

export class Setting {

    constructor(
        public iSettingId: number=-1,
        public nvSettingName: string="",
        public nvSettingCode: string="",
        public iSettingType: number=-1,
        public nvLat: string="",
        public nvLng: string="",
        public nvAddress: string="",
        public nvOperatingLocation: string="",
        public iNeighborhoodType: number=-1,
        public nvPhone: string="",
        public nvContactPerson: string="",
        public nvContactPersonMail: string="",
        public nvContactPersonPhone: string="",
        public iCoordinatorId: number=-1,
        public iCreateByUserId: number=-1,
        public dCreateDate: Date=new Date(),
        public iLastModifyUserId: number=-1,
        public iLastModifyDate: number=-1,
        public iSysRowStatus: number=-1,
        public bSettingMorning: boolean=false,
        public bSettingNoon: boolean=false,
        public bActiveAfternoon: boolean=false,
        public bisJoint: boolean=false,
        public lSettingAgegroups: Array<number>=new Array<number>(),
    ) { 
    }
    
}