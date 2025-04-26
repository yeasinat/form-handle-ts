## Understanding workflow

### 1st Method (Traditional way)

1. Create `form data` types

   ```tsx
   type FormValues = {
     name: string;
     email: string;
     age?: number;
   };
   ```

2. Extend or reuse base type in mutation

   - For Create

   ```tsx
   const createUser = async (data: FormValues) => {
     // Call API to create
   };
   ```

   - For Edit

   ```tsx
   const EditValues = FormValues & { id: string }; // usually comes from params

   const editUser = async (data: EditValues) => {
     // Call API to update
   };
   ```

3. Use a union or optional `id` if using one handler

   ```tsx
   type CreateOrEditPayload = FormValues & { id?: string };

   const submitUser = async (data: CreateOrEditPayload) => {
     if (data.id) {
       await updateUser(data as EditValues);
     } else {
       await createUser(data);
     }
   };
   ```
