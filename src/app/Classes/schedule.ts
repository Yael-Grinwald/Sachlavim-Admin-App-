export class schedule {
    constructor(
        public iOperatorId: number = -1,
        public iActivityId: number = -1,
        public iScheduleId: number = -1,
        public iSettingId: number = -1,
        public iProgramId: number = -1,
        public dtStartTime: string='',
        public nvProgramValue: string = '',
        public bClosedDay: boolean = false,
        public bLongDay: boolean = false,
        public dtDoneDate: Date = new Date(),
        public iActivityDetailsId: number = -1,
        public iCategoryType: number = -1,
        public iClusterId: number = -1,
        public iDayInWeek: number = -1,
        public iLeaderNumber: number = -1,
        public nvActivityName: string = '',
        public nvAddress: string = '',
        public nvCategoryValue: string = '',
        public nvComment: string='',
        public nvCompanyName: string='',
        public nvOperatingLocation: string='',
        public nvOperatorName: string='',
        public nvPhone: string='',
        public nvSettingName: string=''

    ) { }


}