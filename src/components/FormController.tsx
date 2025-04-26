import { useQuery } from "@tanstack/react-query";
import Form from "./Form";
import { getUserById } from "../services/user";

interface FormControllerProps {
  id?: string;
}

function FormController({ id }: FormControllerProps) {
  const mode = id ? "edit" : "create";

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
  });

  return (
    <div>
      <Form mode={mode} defaultValues={userData} isLoading={isLoading} />
    </div>
  );
}

export default FormController;
