import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddEventForm from "@/components/AddEventForm";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import UpdateEventForm from "@/components/UpdateEventForm";

const CalendarPage = ({
  currentEvents,
  handleDateClick,
  handleEventClick,
  handleDeleteEvent,
  handleEventDrop,
  isDialogOpen,
  setIsDialogOpen,
  selectedDate,
  setCurrentEvents,
  deleteEvent,
  handleAddEvent,
  isSubmitting,
  updateEventInfo,
  handleUpdateEvent,
  setDeleteEvent,
  setUpdateEventInfo,
}) => {
  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {currentEvents?.length <= 0 ? (
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            ) : (
              currentEvents?.map((event, index) => (
                <li
                  className="border border-gray-200 shadow px-4 py-2 rounded-md font-medium"
                  key={event?.id || index}
                >
                  {event?.title}
                  <br />
                  <span className="font-light">
                    {event?.extendedProps?.description}
                  </span>
                  <br />
                  <label className="text-slate-950">
                    {formatDate(event?.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                  </label>
                </li>
              ))
            )}
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
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return selectInfo.start >= today;
            }}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            eventAllow={(dropInfo) => dropInfo?.start >= new Date()}
            eventDrop={handleEventDrop}
            initialEvents={currentEvents}
          />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-h-[80vh] max-w-xs sm:max-w-md rounded-lg overflow-y-auto"
          hideClose
        >
          <DialogClose className="absolute right-3 top-3" asChild>
            <Button
              className="h-7 w-7 p-0"
              variant="ghost"
              onClick={() => {
                setIsDialogOpen(false);
                setDeleteEvent(false);

                if (updateEventInfo) {
                  updateEventInfo.revert();
                  setUpdateEventInfo(null);
                }
              }}
            >
              <X size={15} />
            </Button>
          </DialogClose>

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
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  "Delete Event"
                )}
              </Button>
            </div>
          ) : updateEventInfo ? (
            <UpdateEventForm
              isSubmitting={isSubmitting}
              updateEventInfo={updateEventInfo}
              onSubmit={handleUpdateEvent}
            />
          ) : (
            <AddEventForm
              onSubmit={handleAddEvent}
              startDate={selectedDate?.start}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
