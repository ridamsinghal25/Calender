import React, { useState, useEffect } from "react";
import CalendarPage from "@/pages/calendar/presentation/CalendarPage";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

const CalendarPageContainer = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [updateEventInfo, setUpdateEventInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    setIsFetching(true);
    axios
      .get(`/events/get-events`)
      .then((response) => {
        if (response.data) {
          const sanitizedData = response.data.data?.map((event) => ({
            ...event,
            id: event._id,
          }));
          setCurrentEvents(sanitizedData);
        }
      })
      .catch((err) => {
        toast({
          description: err.response?.data?.message || err.message,
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

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

  const handleEventDrop = (draggedEvent) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (draggedEvent.event.start < currentDate) {
      draggedEvent.revert();
      alert("Cannot move event to a past date.");
      return;
    }

    setUpdateEventInfo(draggedEvent);
    setIsDialogOpen(true);
  };

  const handleUpdateEvent = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `/events/update-event/${updateEventInfo.event?.id}`,
        data
      );

      if (response.data?.success) {
        toast({
          title: "success",
          description: response.data?.message,
        });

        setCurrentEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === updateEventInfo.event.id ? response?.data?.data : event
          )
        );

        setIsDialogOpen(false);
        setUpdateEventInfo(null);
      }
    } catch (error) {
      let errorMessage = error.response?.data.message || error.message;

      toast({
        title: "Error deleting event",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (selectedEvent) => {
    setIsSubmitting(true);
    try {
      const response = await axios.delete(
        `/events/delete-event/${selectedEvent.event?.id}`
      );

      if (response.data?.success) {
        toast({
          title: "success",
          description: response.data?.message,
        });

        setCurrentEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== selectedEvent.event.id)
        );
        selectedEvent.event.remove();
        setIsDialogOpen(false);
        setDeleteEvent(false);
      }
    } catch (error) {
      let errorMessage = error.response?.data.message || error.message;

      toast({
        title: "Error deleting event",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddEvent = async (data) => {
    setIsSubmitting(true);

    let calendarApi;
    if (selectedDate) {
      calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
      calendarApi.unselect(); // Unselect the date range.
    }

    const newEvent = {
      title: data?.title,
      start: selectedDate.start,
      end: data?.end || selectedDate.end,
      description: data?.description,
    };

    try {
      const response = await axios.post(`/events/create-event`, newEvent);

      if (response.data?.success) {
        toast({
          title: "success",
          description: response.data?.message,
        });

        calendarApi.addEvent({
          ...response.data?.data,
          id: response.data?.data?._id,
        });
        setIsDialogOpen(false);
      }
    } catch (error) {
      let errorMessage = error.response?.data.message || error.message;

      toast({
        title: "Error creating event",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return isFetching ? (
    <Loader />
  ) : (
    <CalendarPage
      currentEvents={currentEvents}
      handleDateClick={handleDateClick}
      handleEventClick={handleEventClick}
      handleDeleteEvent={handleDeleteEvent}
      handleAddEvent={handleAddEvent}
      handleEventDrop={handleEventDrop}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      selectedDate={selectedDate}
      setCurrentEvents={setCurrentEvents}
      deleteEvent={deleteEvent}
      isSubmitting={isSubmitting}
      updateEventInfo={updateEventInfo}
      handleUpdateEvent={handleUpdateEvent}
      setDeleteEvent={setDeleteEvent}
      setUpdateEventInfo={setUpdateEventInfo}
    />
  );
};

export default CalendarPageContainer;
