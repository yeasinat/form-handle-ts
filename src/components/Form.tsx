import { useForm } from "react-hook-form";
import { UserFormValues, userSchema } from "../schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserMutations } from "../hooks/useUserMutations";
import "./Form.css";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

type UserFormProps = {
  mode: "create" | "edit";
  defaultValues: Partial<UserFormValues>;
  isLoading?: boolean;
};

function Form({ mode, defaultValues, isLoading }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues || {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const { create, update } = useUserMutations();

  const onSubmit = (data: UserFormValues) => {
    if (mode === "create") {
      create.mutate(data);
      navigate({ to: "/table" });
    } else if (mode === "edit") {
      update.mutate(data);
      navigate({ to: "/table" });
    }
  };

  return (
    <div>
      <h2> {mode === "edit" ? "Update" : "Create"} User </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register("age")} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {mode === "create" ? "Create" : "Update"}
        </button>
      </form>
    </div>
  );
}

export default Form;
