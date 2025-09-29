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

    const getResponsiveView = () => {
        return window.innerWidth < 768 ? 'listWeek' : 'dayGridMonth';
    };

    const changeView = (viewName) => {
        if (calendarInstance.current) {
            calendarInstance.current.changeView(viewName);
        }
    };

    useEffect(() => {
        if (!calendarRef.current) return;

        const calendar = new Calendar(calendarRef.current, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin],
            googleCalendarApiKey: API_KEY,
            eventSources: [{ googleCalendarId: CALENDAR_ID }],
            headerToolbar: {
                left: 'prev,next,today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,listWeek'
            },
            eventClick: (eventInfo) => {
                eventInfo.jsEvent.preventDefault();
                showEventModal(eventInfo.event);
            },
            loading: (isLoadingEvents) => setIsLoading(isLoadingEvents),
            eventSourceFailure: (errorInfo) => {
                console.error("Calendar error:", errorInfo);
                setError("Failed to load calendar events");
                setIsLoading(false);
            },
            initialView: getResponsiveView(),
            contentHeight: 'auto',
            nowIndicator: true,
            fixedWeekCount: false,
        });

        calendar.render();
        calendarInstance.current = calendar;
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (calendarInstance.current) {
                const targetView = getResponsiveView();
                calendarInstance.current.changeView(targetView);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Box className="page-container font-montserrat py-12 flex flex-col items-center">
            <Modal open={modalOpen} onClose={closeModal} className="modal">
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
            
            <Box className="w-full max-w-6xl mx-auto bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8">
                {error && <Typography className="gc-error">{error}</Typography>}
                {isLoading && <Box className="gc-loading">Loading events...</Box>}

                <Box className="gc-buttons" sx={{ mb: 2 }}>
                    <Button className="gc-button" onClick={() => changeView('listWeek')}>List View</Button>
                    <Button className="gc-button" onClick={() => changeView('dayGridMonth')}>Month View</Button>
                    <Button className="gc-button" onClick={() => changeView('timeGridWeek')}>Week View</Button>
                </Box>

                <Box id="calendar" ref={calendarRef}></Box>
            </Box>
        </Box>
    );
}