import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SignupPage from "../presentation/SignupPage";
import axios from "axios";

function SignupPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/users/register`, data);

      if (response.data?.success) {
        toast({
          title: "success",
          description: response.data.message,
        });
        navigate("/sign-in");
      }
    } catch (error) {
      let errorMessage = error.response?.data.message || error.message;

      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <SignupPage onSubmit={onSubmit} isSubmitting={isSubmitting} />;
}

export default SignupPageContainer;
