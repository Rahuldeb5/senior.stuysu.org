import "./MyCalendar.css";
 
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { Box, Button, Typography, Modal } from "@mui/material";

export default function MyCalendar() {
    const calendarRef = useRef(null);
    const calendarInstance = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', time: '', description: '' });

    const API_KEY = import.meta.env.VITE_CALENDAR_API_KEY;
    const CALENDAR_ID = import.meta.env.VITE_CALENDAR_ID;

    const timeFormat = (date) => {
        return date !== null ? date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }) : "empty";
    };

    const dayFormat = (date) => {
        return date !== null ? date.toLocaleDateString([], {
            month: "short",
            day: "numeric"
        }) : "empty";
    };

    const showEventModal = (event) => {
        const time = timeFormat(event.start) === timeFormat(event.end) ? `All Day` : `${timeFormat(event.start)} - ${timeFormat(event.end)}`;
        const day = dayFormat(event.start) === dayFormat(event.end) ? dayFormat(event.start) : `${dayFormat(event.start)} - ${dayFormat(event.end)}`;      

        const description = event.extendedProps.description || "";

        setModalData({
            title: event.title,
            time: `${day}: ${time}`,
            description: description
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

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
                left: '',
                center: 'title',
                right: ''
            },
            
            footerToolbar: {
                left: 'prev,next,today',
                center: '',
                right: 'listWeek,dayGridMonth'
            },

            loading: (isLoadingEvents) => {
                setIsLoading(isLoadingEvents);
            },

            eventSourceFailure: (errorInfo) => {
                console.error("Calendar error:", errorInfo);
                setError("Failed to load calendar events");
                setIsLoading(false);
            },

            eventClick: (eventInfo) => {
                eventInfo.jsEvent.preventDefault();
                showEventModal(eventInfo.event);
            },

            initialView: "dayGridMonth",
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

        calendar.render();
        calendarInstance.current = calendar;
    }, [])

    return (
        <Box className="page-container">
            <Modal
                open={modalOpen}
                onClose={closeModal}
                className="modal"
            >
                <Box className="modal-content">
                    <Box className="modal-header">
                        <Typography variant="h2" id="modalTitle">{modalData.title}</Typography>
                        <Typography className="close" onClick={closeModal}>&times;</Typography>
                    </Box>
                    <Box className="modal-body">
                        <Typography id="modalTime">{modalData.time}</Typography>
                        {modalData.description && (
                            <Typography id="modalDescription">{modalData.description}</Typography>
                        )}
                    </Box>
                </Box>
            </Modal>

            <Box className="page-title">
                <Typography variant="h1" component="h1">
                    Event Calendar
                </Typography>
            </Box>
            
            <Box className="calendar-card">
                {error && <Typography className="gc-error">{error}</Typography>}
                <Box className="container">
                    <Box id="calendar" ref={calendarRef}></Box>
                </Box>
            </Box>
        </Box>
    )
}