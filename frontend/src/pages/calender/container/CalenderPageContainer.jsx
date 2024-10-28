import React, { useState, useEffect } from "react";
import CalendarPage from "@/pages/calender/presentation/CalenderPage";

const CalendarPageContainer = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(false);

  useEffect(() => {
    // Load events from local storage when the component mounts
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    // Save events to local storage whenever they change
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateClick = (selected) => {
    setDeleteEvent(false);
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected) => {
    setDeleteEvent(true);
    setIsDialogOpen(true);
    setSelectedDate(selected);
  };

  const handleDeleteEvent = (selectedEvent) => {
    setCurrentEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== selectedEvent.event.id)
    );
    selectedEvent.event.remove();
    setIsDialogOpen(false);
  };

  const handleAddEvent = (data) => {
    if (selectedDate) {
      const calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
      calendarApi.unselect(); // Unselect the date range.

      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${data?.title}`,
        title: data?.title,
        start: selectedDate.start,
        end: data?.end || selectedDate.end,
        allDay: selectedDate.allDay,
        description: data?.description,
      };

      calendarApi.addEvent(newEvent);
      setIsDialogOpen(false);
    }
  };

  return (
    <CalendarPage
      currentEvents={currentEvents}
      handleDateClick={handleDateClick}
      handleEventClick={handleEventClick}
      handleDeleteEvent={handleDeleteEvent}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      selectedDate={selectedDate}
      setCurrentEvents={setCurrentEvents}
      deleteEvent={deleteEvent}
      handleAddEvent={handleAddEvent}
    />
  );
};

export default CalendarPageContainer;
