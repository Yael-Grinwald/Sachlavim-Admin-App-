export class Activity {
    constructor(
        public iActivityId:number=0,
        public iOperatorId:number=0,
        public nvActivityName:string="",
        public iCategoryType:number=0,
        public iStatusType:number=0,
        public nvActivityProduct:string="",
        public nPrice:string="",
        public nShortBreak:string="",
        public nLongBreak:string="",
       public bActivityPreference:boolean=false,
       public lActivityAgegroups:number[]=[],
       public bActivityMorning:boolean=false,
       public bActivityNoon:boolean=false,


        ){

    }
}

