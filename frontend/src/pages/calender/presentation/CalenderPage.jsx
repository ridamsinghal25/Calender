import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddEventForm from "@/components/AddEventForm";
import { Button } from "@/components/ui/button";

const CalendarPage = ({
  currentEvents,
  handleDateClick,
  handleEventClick,
  handleDeleteEvent,
  isDialogOpen,
  setIsDialogOpen,
  selectedDate,
  setCurrentEvents,
  deleteEvent,
  handleAddEvent,
}) => {
  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event) => (
                <li
                  className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                  key={event.id}
                >
                  {event.title}
                  <br />
                  {event.extendedProps?.description}
                  <br />
                  <label className="text-slate-950">
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                  </label>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectAllow={(selectInfo) => {
              return selectInfo.start >= new Date();
            }}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            }
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {deleteEvent ? "Delete Event" : "Add Event"}
            </DialogTitle>
            {deleteEvent && (
              <DialogDescription>
                Are you sure you want to delete this event?
              </DialogDescription>
            )}
          </DialogHeader>
          {deleteEvent ? (
            <div className="w-full flex justify-end">
              <Button
                variant="destructive"
                onClick={() => handleDeleteEvent(selectedDate)}
              >
                Delete Event
              </Button>
            </div>
          ) : (
            <AddEventForm
              onSubmit={handleAddEvent}
              startDate={selectedDate?.start}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
