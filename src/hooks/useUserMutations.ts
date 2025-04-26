import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "../services/user";

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const update = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { create, update };
};
