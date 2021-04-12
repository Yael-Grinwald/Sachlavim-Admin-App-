import { time } from 'console';

export class Program {
    constructor(public iProgramId: number = 0,
        public iProgramType: number = 0,
        public nvProgramName: string = "",
        public nvBudgetItem: string = "",//סעיף תקציב
        public dFromDate: string ="",
        public dToDate: string="",
        public iNumActivityMorning: number = 0,//מיספר הפעלות בוקר
        public iNumActivityAfternoon: number = 0,//מיספר הפעלות צהרים
        public iActivityPreferenceCount: number = 0,//מספר הפעלות מועדפות
        public iActivityPreferenceInWeekCount: number = 0,//מספר הפעלות מועדפות לשבוע
        public tFromTimeMorning: string = new Date("00:00").toTimeString(),
        public tToTimeMorning: string = new Date("00:00").toTimeString(),
        public tFromTimeAfternoon: string =  new Date("00:00").toTimeString(),
        public tToTimeAfternoon: string = new Date("00:00").toTimeString(),
        public bTwoActivitiesThatDay: boolean = false,
        public iStatusType: number = 0,
        public CreateByUserId: number = 0,
        public CreateDate: string ="",
        public LastModifyUserId: number = 0,//קוד מישתמש שינוי אחרון
        public iSysRowStatus: number = 0,//לבדוק מה זה
        public bProgramAfternoon: boolean = false,//האם תוכנית צהרים
        public iSemesterType: number = 0,
        public tFirstActivity: string= new Date("00:00").toTimeString(),
        public tSecondActivity: string= new Date("00:00").toTimeString(),
        public iYearType: number = 0,//לבדוק
        public iNumActivityInWeek: number = 0,
        public lProgramAgegroups: Array<number> = new Array<number>(),
        public lProgramSettings: Array<number> = new Array<number>(),
    ) { }

}