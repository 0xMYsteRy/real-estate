import React, { useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject } from '@syncfusion/ej2-react-schedule'
import UserSidebarNav from '../components/UserSidebarNav';
import Loader from '../components/Loader'
import { withAuthenticationRequired} from "@auth0/auth0-react";


const Calendar = () => {

    const [data, setData] = useState([{
        Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        StartTime: new Date(2021, 11, 12, 9, 30),
        EndTime: new Date(2021, 11, 12, 11, 0)
    }, {
        Id: 2,
        Subject: 'Thule Air Crash Report',
        StartTime: new Date(2021, 11, 15, 12, 0),
        EndTime: new Date(2021, 11, 15, 14, 0)
    }, {
        Id: 3,
        Subject: 'Thule Air Crash Report',
        StartTime: new Date(2021, 11, 18, 12, 0),
        EndTime: new Date(2021, 11, 18, 14, 0)
    }, {
        Id: 4,
        Subject: 'Explosion of Betelgeuse Star',
        StartTime: new Date(2021, 11, 20, 9, 30),
        EndTime: new Date(2021, 11, 20, 11, 0)
    }])

    return (
        <div className="col-lg-12 mrb30">
            <UserSidebarNav />
            <br />
            <ScheduleComponent
                currentView='Month' selectedDate={new Date()} height='850px' style={{ marginLeft: "250px" }} readonly={true}
                eventSettings={{
                    dataSource: data,
                    fields: {
                        id: 'Id',
                        subject: { name: 'Subject' },
                        isAllDay: { name: 'IsAllDay' },
                        startTime: { name: 'StartTime' },
                        endTime: { name: 'EndTime' }
                    }
                }}>

                <ViewsDirective>
                    <ViewDirective option='Week' />
                    <ViewDirective option='Month' />
                </ViewsDirective>
                <Inject services={[Week, Month]} />
            </ScheduleComponent>
        </div>
    );
};

export default withAuthenticationRequired(Calendar, {
    onRedirecting: () => <Loader />,
})