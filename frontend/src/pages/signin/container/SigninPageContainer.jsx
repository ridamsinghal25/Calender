import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SigninPage from "../presentation/SigninPage";
import axios from "axios";

function SigninPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        data
      );

      sessionStorage.setItem("token", response.data?.data?.accessToken);

      if (response.data?.success) {
        toast({
          title: "success",
          description: response.data.message,
        });
        navigate("/");
      }
    } catch (error) {
      let errorMessage = error.response?.data.message || error.message;

      toast({
        title: "Signin failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <SigninPage onSubmit={onSubmit} isSubmitting={isSubmitting} />;
}

export default SigninPageContainer;
