import React from "react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import FormFieldInput from "./FormFieldInput";
import { FormFieldDatePicker } from "./FormFieldDatePicker";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function AddEventForm({ onSubmit, startDate, isSubmitting }) {
  const addEventForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      end: null,
    },
  });

  return (
    <div>
      <Form {...addEventForm}>
        <form
          onSubmit={addEventForm.handleSubmit((data) => onSubmit(data))}
          className="space-y-4"
        >
          <FormFieldInput form={addEventForm} name="title" label="Title" />
          <FormFieldInput
            form={addEventForm}
            name="description"
            label="Description"
          />
          <FormFieldDatePicker
            form={addEventForm}
            name="end"
            label="End"
            description={"Optional if not picked default is set to full day"}
            startDate={startDate}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </>
            ) : (
              "Add Event"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddEventForm;
