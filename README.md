
# 🛠️ Form Handling Workflow (Create + Edit) with React Query, React Hook Form, and Zod

This guide explains **how to properly organize your form handling workflow** with **type safety** and **dynamic behaviors** like Create and Edit modes.

---

## 🧭 Quick Navigation

| Step | Description | File |
|:----|:------------|:-----|
| 1️⃣ | [Create Types and Schema](#-1-create-form-types-and-schema) | `src/schema/userSchema.ts` |
| 2️⃣ | [Create Mutation Hook](#-2-create-mutation-functions-in-a-separate-hook) | `src/hooks/useUserMutations.ts` |
| 3️⃣ | [Build the Form Component](#-3-build-the-form-component) | `src/components/UserForm.tsx` |
| 4️⃣ | [Use the Form Dynamically](#-4-use-the-form-and-load-default-values-dynamically) | `src/pages/users.tsx` |

---

## ✍️ 1. Create Form Types and Schema

> **File: `src/schema/userSchema.ts`**

```ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.coerce.number().min(1, "Age must be a positive number"),
  id: z.string().optional(), // only needed for Edit mode
});

export type UserFormValues = z.infer<typeof userSchema>;
```

---

## 🔥 2. Create Mutation Functions in a Separate Hook

> **File: `src/hooks/useUserMutations.ts`**

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormValues } from "@/schema/userSchema";

const createUser = async (data: UserFormValues) => {
  // API POST call to create a user
};

const updateUser = async (data: UserFormValues) => {
  // API PUT call to update a user
};

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const update = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  return { create, update };
};
```


---

## 🧩 3. Build the Form Component

> **File: `src/components/UserForm.tsx`**

```tsx
import { useForm, useEffect } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormValues } from "@/schema/userSchema";
import { useUserMutations } from "@/hooks/useUserMutations";

interface UserFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<UserFormValues>;
}

export const UserForm = ({ mode, defaultValues }: UserFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const { create, update } = useUserMutations();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data: UserFormValues) => {
    if (mode === "edit") {
      update.mutate(data);
    } else {
      create.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="number" {...register("age")} placeholder="Age" />
      {errors.age && <p>{errors.age.message}</p>}

      {mode === "edit" && <input type="hidden" {...register("id")} />}

      <button type="submit">{mode === "edit" ? "Update" : "Create"}</button>
    </form>
  );
};
```

---

## 🔄 4. Use the Form and Load Default Values Dynamically

> **File: `src/pages/users.tsx`**

```tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserForm } from "@/components/UserForm";

export default function UsersPage() {
  const [userId, setUserId] = useState<string | null>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
    enabled: !!userId,
  });

  return (
    <div>
      {userId && !isLoading && user ? (
        <UserForm mode="edit" defaultValues={user} />
      ) : (
        <UserForm mode="create" />
      )}
    </div>
  );
}
```

---

## 📋 Final Folder Structure

```bash
src/
├── components/
│   └── UserForm.tsx
├── hooks/
│   └── useUserMutations.ts
├── schema/
│   └── userSchema.ts
└── pages/
    └── users.tsx
```

---

## 📌 Important Best Practices

- Always call `reset()` with `defaultValues` in edit mode.
- Use `enabled: !!userId` in dynamic queries to prevent unnecessary API calls.
- Always invalidate related queries after mutation to refresh UI.
- Keep all form types and schemas centralized for reusability.
- Handle mutation errors gracefully with `onError` in `useMutation`.

---
