export class operatorsAvailability {
    constructor(
        public iOperatorsAvailabilityId:number=0,
        public iOperatorId:number=0,
        public iOperatorAvailabilityType:number=0,
        public bActive:boolean=false,
        public iWeekDay:number=0,
        public tMorningFromTime:string="",
        public tMorningToTime :string="",
        public tAfternoonFromTime :string="",
        public tAfternoonToTime:string="",
        public iNumLeaders :number=0
    ) { }

}