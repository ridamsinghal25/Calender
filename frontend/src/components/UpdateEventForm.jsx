import React from "react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import FormFieldInput from "./FormFieldInput";
import { FormFieldDatePicker } from "./FormFieldDatePicker";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function UpdateEventForm({ onSubmit, isSubmitting, updateEventInfo }) {
  const endEventForm = useForm({
    defaultValues: {
      title: updateEventInfo?.event?.title || "",
      description: updateEventInfo?.event?.extendedProps?.description || "",
      start: updateEventInfo?.event?.start || null,
      end: updateEventInfo?.event?.end || null,
    },
  });

  return (
    <div>
      <Form {...endEventForm}>
        <form
          onSubmit={endEventForm.handleSubmit((data) => onSubmit(data))}
          className="space-y-4"
        >
          <FormFieldInput form={endEventForm} name="title" label="Title" />
          <FormFieldInput
            form={endEventForm}
            name="description"
            label="Description"
          />
          <FormFieldDatePicker
            form={endEventForm}
            name="start"
            label="Start"
            startDate={updateEventInfo?.event?.start}
          />
          <FormFieldDatePicker
            form={endEventForm}
            name="end"
            label="End"
            startDate={updateEventInfo?.event?.start}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </>
            ) : (
              "Update Event"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateEventForm;
