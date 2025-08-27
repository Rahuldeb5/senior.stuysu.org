import React, { useEffect, useRef, useState } from "react";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

export default function GoogleCalendar() {
    const calendarRef = useRef(null);
    const calendarInstance = useRef<Calendar | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const API_KEY = "AIzaSyCXZaVDTHcRA-jM4Re_36AZqrNjTw2tPYM";
    const CALENDAR_ID = "9f907bfce879561c8100adc99079287e09d49cac881e6bbd3c5a9d3c5104ef81@group.calendar.google.com";

    useEffect(() => {
        // Null check
        if (!calendarRef.current) {
            console.log("Calendar div not found");
            return;
        };

        // Calendar initialization
        const calendar = new Calendar(calendarRef.current, {
            plugins: [
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                googleCalendarPlugin
            ],

            googleCalendarApiKey: API_KEY,

            eventSources: [
                {
                    googleCalendarId: CALENDAR_ID
                }
            ],

            headerToolbar: {
                left: 'prev,next,today',
                center: 'title',
                right: 'listWeek,dayGridMonth,timeGridWeek'
            },

            loading: (isLoadingEvents) => {
                setIsLoading(isLoadingEvents);
                console.log("Calendar loading state:", isLoadingEvents);
            },

            eventSourceFailure: (errorInfo) => {
                console.error("Calendar error:", errorInfo);
                setError("Failed to load calendar events");
                setIsLoading(false);
            },

            eventClick: handleEventClick,

            initialView: window.innerWidth < 768 ? 'listWeek' : 'dayGridMonth',
            contentHeight: 'auto',
            nowIndicator: true,
            fixedWeekCount: false,

            events: [
                {
                  title: 'Test Event',
                  start: '2025-08-20',
                //   end: '2025-08-21',
                  allDay: true
                }
            ],
        });

        // Change calendar view when window is resized using window listener
        const handleResize = () => {
            const targetView = getResponsiveView();
            changeView(targetView);
        };

        window.addEventListener('resize', handleResize);

        console.log("Current screen width:", window.innerWidth);
        console.log("Recommended view:", getResponsiveView());

        calendar.render();
        calendarInstance.current = calendar;

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    const handleEventClick = (eventInfo) => {
        const event = eventInfo.event;
        const title = event.title || "No Title";

        const startTime = event.start ? event.start.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) : "No start time";

        let endTime;
        if (event.allDay) {
            endTime = "All day";
        } else if (event.end) {
            endTime = event.end ? event.end.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) : "No end time";
        }

        const time = event.allDay ? "All day" : `${startTime} - ${endTime}`;
        const description = `Event: ${title}\nTime: ${time}`;

        alert(description);
        eventInfo.jsEvent.preventDefault();
    }

    const getResponsiveView = () => {
        return window.innerWidth < 768 ? 'listWeek' : 'dayGridMonth' 
    }

    const changeView = (viewName) => {
        if (calendarInstance.current) {
            calendarInstance.current.changeView(viewName);
            console.log("changed view to:", viewName);
        }
    }

    return (
        <div className="gc-wrapper">
            {error && <div className="gc-error">{error}</div>}
            {isLoading && <div className="gc-loading">Loading events...</div>}
    
            <div className="gc-buttons">
                <button className="gc-button" onClick={() => changeView('listWeek')}>List View</button>
                <button className="gc-button" onClick={() => changeView('dayGridMonth')}>Month View</button>
                <button className="gc-button" onClick={() => changeView('timeGridWeek')}>Week View</button>
            </div>
    
            <div ref={calendarRef} className="gc-calendar"></div>
        </div>
  
    )
}