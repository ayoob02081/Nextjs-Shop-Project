import { useMutation } from "@tanstack/react-query";

function useMutate() {
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: getOtpApi,
  });
  return { data, error, isPending, mutateAsync };
}
