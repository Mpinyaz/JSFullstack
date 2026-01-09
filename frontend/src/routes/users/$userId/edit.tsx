import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UserForm, ErrorPanel } from "@/components/ui";
import type { UserFormData } from "@/types";
import { useUser, useUpdateUser } from "@/lib/users.queries";

export const Route = createFileRoute("/users/$userId/edit")({
  component: EditUser,
});

function EditUser() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useUser(userId);
  const updateUser = useUpdateUser();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: UserFormData) => {
    setSubmitError(null);
    try {
      await updateUser.mutateAsync({ id: userId, data });
      navigate({ to: "/users" });
    } catch (error) {
      console.error("Failed to update user:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to update user. Please try again.",
      );
    }
  };

  const handleCancel = () => {
    navigate({ to: "/users" });
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading user...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="py-8">
        <ErrorPanel
          title="Failed to Load User"
          message={error?.message || "User not found"}
        >
          <button
            onClick={() => navigate({ to: "/users" })}
            className="mt-3 text-sm font-medium text-red-800 hover:text-red-900 underline"
          >
            Return to users list
          </button>
        </ErrorPanel>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
        <p className="mt-2 text-gray-600">
          Update details for {user.name} {user.lastname}
        </p>
      </div>

      {updateUser.isPending && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
          <div className="flex items-center">
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-blue-600 border-r-transparent mr-3"></div>
            Updating user...
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-4">
          <ErrorPanel
            title="Update Failed"
            message={submitError}
            onDismiss={() => setSubmitError(null)}
          />
        </div>
      )}

      <UserForm
        initialUser={user}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
