import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import UserForm from "@/components/ui/UserForm";
import { ErrorPanel } from "@/components/ui/ErrorPanel";
import type { UserFormData } from "@/types";
import { useCreateUser } from "@/lib/users.queries";

export const Route = createFileRoute("/users/create")({
  component: CreateUser,
});

function CreateUser() {
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: UserFormData) => {
    setSubmitError(null);
    try {
      await createUser.mutateAsync(data);
      navigate({ to: "/users" });
    } catch (error) {
      console.error("Failed to create user:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create user. Please try again.",
      );
    }
  };

  const handleCancel = () => {
    navigate({ to: "/users" });
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
        <p className="mt-2 text-gray-600">
          Fill in the details to create a new user account.
        </p>
      </div>

      {createUser.isPending && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
          <div className="flex items-center">
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-blue-600 border-r-transparent mr-3"></div>
            Creating user...
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-4">
          <ErrorPanel
            title="Creation Failed"
            message={submitError}
            onDismiss={() => setSubmitError(null)}
          />
        </div>
      )}

      <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
