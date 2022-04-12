import * as React from "react";
import BigCalendar from 'react-big-calendar-like-google';
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import moment from 'moment';
import { useCourseEnrollment } from "../../hooks/useCourseEnrollment";
import { useUserModules } from "../../hooks/useUserModules";
import { useCourses } from "../../hooks/useCourses";
import { useModules } from "../../hooks/useModules";

BigCalendar.momentLocalizer(moment);

export default function LearningLogPage() {

    const { getUserEnrollments } = useCourseEnrollment();
    const { getUserAttempts } = useUserModules();
    const { getCourse } = useCourses();
    const { getModule } = useModules();

    const events = getUserEnrollments().map(e => {
        if (e.completionDate) {
            let course = getCourse(e.courseId);
            return {
                title: `${course?.name} Course Completed`,
                start: e.completionDate,
                end: e.completionDate || new Date(),
                allDay: false,
                bgColor:  '#ff7f50',
            }
        }
    }).concat(
        getUserAttempts().map(a => {
            if (a.bestScore && a.bestScore >= 75) {
                let module = getModule(a.moduleId);
                return {
                    title: `${module?.name} Module Completed`,
                    start: a.lastAttempt,
                    end: a.lastAttempt,
                    allDay: false,
                    bgColor:  '#dc143c'
                }
            }
        })
    );
    console.log(events);

    return (
        <BigCalendar events={events} />
    );
}