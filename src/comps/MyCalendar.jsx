import "./MyCalendar.css";
 
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { Box, Button, Typography, Stack } from "@mui/material";

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

    // window resizing -> calendar resizing 
    useEffect(() => {
        let timer;

        const handleResize = () => {
            // debounce resizing

            clearTimeout(timer);
            timer = setTimeout(
                () => {
                    const targetView = getResponsiveView();
                    const currentView = calendarInstance.current?.view.type;
                    if (targetView !== currentView)  {
                        changeView(targetView);
                    }
                },
                300);
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

    // 💀
    return (
        <Box className="min-h-screen bg-gradient-to-b from-[#fcfffc] to-[#fff2e2] font-montserrat py-12 flex flex-col items-center">
            <Box className="text-center mb-12 w-full max-w-3xl px-4 mx-auto">
                <Typography 
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
                        background: "linear-gradient(90deg, #6c5f83, #c2b9d7)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                    }}
                >
                    Event Calendar
                </Typography>
            </Box>
            
            <Box 
                sx={{
                    width: "100%",
                    maxWidth: "64rem",
                    mx: "auto",
                    p: { xs: 3, sm: 5 },
                    borderRadius: "1.5rem",
                    boxShadow: "0px 6px 20px rgba(50, 35, 67, 0.15)",
                    border: "1px solid #ded4f1",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                }}
            >
                {error && (
                    <Box 
                        sx={{
                            backgroundColor: "#fef3e1",
                            border: "2px solid #c7bcdc",
                            color: "#322343",
                            p: 2,
                            mb: 2,
                            borderRadius: "0.75rem",
                            textAlign: "center",
                            fontWeight: "600",
                        }}
                    >
                        {error}
                    </Box>
                )}
                {isLoading && (
                    <Box 
                        sx={{
                            backgroundColor: "#ded4f1",
                            border: "2px solid #c2b9d7",
                            color: "#322343",
                            p: 2,
                            mb: 2,
                            borderRadius: "0.75rem",
                            textAlign: "center",
                            fontWeight: "500",
                        }}
                    >
                        Loading events...
                    </Box>
                )}
        
                <Stack 
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                    mb={3}
                >
                    <Button 
                        onClick={() => changeView('listWeek')}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: "1rem",
                            fontWeight: 600,
                            textTransform: "none",
                            background: "linear-gradient(135deg, #c7bcdc, #c2b9d7)",
                            color: "#322343",
                            border: "2px solid #ded4f1",
                            boxShadow: "0px 3px 8px rgba(50, 35, 67, 0.15)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                background: "linear-gradient(135deg, #b6a8cf, #c7bcdc)",
                                color: "#fff",
                                boxShadow: "0px 6px 14px rgba(50, 35, 67, 0.25)",
                            },
                        }}
                    >
                        List View
                    </Button>
                    <Button 
                        onClick={() => changeView('dayGridMonth')}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: "1rem",
                            fontWeight: 600,
                            textTransform: "none",
                            background: "linear-gradient(135deg, #c7bcdc, #c2b9d7)",
                            color: "#322343",
                            border: "2px solid #ded4f1",
                            boxShadow: "0px 3px 8px rgba(50, 35, 67, 0.15)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                background: "linear-gradient(135deg, #b6a8cf, #c7bcdc)",
                                color: "#fff",
                                boxShadow: "0px 6px 14px rgba(50, 35, 67, 0.25)",
                            },
                        }}
                    >
                        Month View
                    </Button>
                    <Button 
                        onClick={() => changeView('timeGridWeek')}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: "1rem",
                            fontWeight: 600,
                            textTransform: "none",
                            background: "linear-gradient(135deg, #c7bcdc, #c2b9d7)",
                            color: "#322343",
                            border: "2px solid #ded4f1",
                            boxShadow: "0px 3px 8px rgba(50, 35, 67, 0.15)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                background: "linear-gradient(135deg, #b6a8cf, #c7bcdc)",
                                color: "#fff",
                                boxShadow: "0px 6px 14px rgba(50, 35, 67, 0.25)",
                            },
                        }}
                    >
                        Week View
                    </Button>
                </Stack>
        
                <Box ref={calendarRef} className="gc-calendar"></Box>
            </Box>
        </Box>
    )
}