import "./MyCalendar.css";
 
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { Box, Button, Typography } from "@mui/material";

export default function MyCalendar() {
    const calendarRef = useRef(null);
    const calendarInstance = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const API_KEY = import.meta.env.VITE_CALENDAR_API_KEY;
    const CALENDAR_ID = import.meta.env.VITE_CALENDAR_ID;

    useEffect(() => {
        // null check
        if (!calendarRef.current) {
            console.log("Calendar not found");
            return;
        };

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
                right: ''
            },

            loading: (isLoadingEvents) => {
                setIsLoading(isLoadingEvents);
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
        const handleResize = () => {
            const targetView = getResponsiveView();
            changeView(targetView);
        };

        calendar.render();
        calendarInstance.current = calendar;
    }, [])

    useEffect(() => {
        // change calendar view when window is resized using window listener
        const handleResize = () => {
            const targetView = getResponsiveView();
            changeView(targetView);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        <Box className="min-h-screen bg-gradient-to-b from-[#fcfffc] to-[#fff2e2] font-montserrat py-12 flex flex-col items-center">
            <Box className="text-center mb-12 w-full max-w-3xl px-4 mx-auto">
                <Typography variant="h1" className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#6c5f83] to-[#c2b9d7] bg-clip-text text-transparent mb-4">
                    Event Calendar
                </Typography>
            </Box>
            
            <Box className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#ded4f1] p-6 sm:p-8">
                {error && <Box className="gc-error">{error}</Box>}
                {isLoading && <Box className="gc-loading">Loading events...</Box>}
        
                <Box className="gc-buttons">
                    <Button className="gc-button" onClick={() => changeView('listWeek')}>List View</Button>
                    <Button className="gc-button" onClick={() => changeView('dayGridMonth')}>Month View</Button>
                    <Button className="gc-button" onClick={() => changeView('timeGridWeek')}>Week View</Button>
                </Box>
        
                <Box ref={calendarRef} className="gc-calendar"></Box>
            </Box>
        </Box>
    )
}