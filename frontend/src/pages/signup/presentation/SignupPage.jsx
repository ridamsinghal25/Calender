import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FormFieldInput from "@/components/FormFieldInput";

function SignupPage({ onSubmit, isSubmitting }) {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Calendar
          </h1>
          <p className="mb-4">Sign up to start</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormFieldInput
              form={form.control}
              label="Username"
              name="username"
              placeholder="Enter your username"
            />
            <FormFieldInput
              form={form.control}
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <FormFieldInput
              form={form.control}
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link to="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
