import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject, Day } from '@syncfusion/ej2-react-schedule'
import Loader from '../components/Loader'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEnv } from '../context/env.context';
import axios from 'axios';

const Calendar = () => {
    const { getAccessTokenSilently, user } = useAuth0()
    const { apiServerUrl } = useEnv()
    const [meetings, setMeetings] = useState([]);
    const currentUserId =
        user.sub.length < 21
            ? user.sub.substring(user.sub.lastIndexOf("|") + 1, user.sub.length)
            : Math.trunc(
                user.sub.substring(
                    user.sub.lastIndexOf("|") + 1,
                    user.sub.length
                ) / 10000
            );

    useEffect(() => {

        // get the calendar data
        const getCalendarData = async () => {
            const token = await getAccessTokenSilently()
            // if userid is bigger than 21, they use oauth2
            await axios.get(`${apiServerUrl}/api/v1/meetings/search/byUser/${currentUserId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {  // after fetched all meeting data, get the user data using userId in meeting data
                Promise.all(res.data.content.map(i =>
                    fetch(`${apiServerUrl}/api/v1/houses/${i.userHouse.houseId}`)
                )).then(res2 => Promise.all(res2.map(r => r.json())))
                    .then(result => {
                        Promise.all(res.data.content.map((it) => {
                            result.map((data, i) => {
                                if (it.userHouse.userId === result[i].houseId) {
                                    setMeetings(prevList => [...prevList, {
                                        meetingId: it.meetingId,
                                        houseId: it.userHouse.houseId,
                                        userId: it.userHouse.userId,
                                        date: new Date(it.date.concat(' ', it.time)),
                                        title: result[i].name,
                                    }])
                                }
                            })
                        }))
                    })
            })
        }
        getCalendarData()
    }, []);
    return (
        <section className="hero d-flex align-items-center">
            <div className="col-lg-10">
                <br />
                <br />
                <br />
                <ScheduleComponent
                    currentView='Month' selectedDate={new Date()} height='850px' style={{ marginLeft: "250px" }} readonly={true}
                    eventSettings={{
                        dataSource: meetings,
                        fields: {
                            Id: 'meetingId',
                            subject: { name: 'title' },
                            startTime: { name: 'date' },
                            endTime: { name: 'date' }
                        }
                    }}>

                    <ViewsDirective>
                        <ViewDirective option='Day' />
                        <ViewDirective option='Week' />
                        <ViewDirective option='Month' />
                    </ViewsDirective>
                    <Inject services={[Day, Week, Month]} />
                </ScheduleComponent>
            </div>
        </section>
    );
};

export default withAuthenticationRequired(Calendar, {
    onRedirecting: () => <Loader />,
})