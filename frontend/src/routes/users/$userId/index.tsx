import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useUser, useDeleteUser } from "@/lib/users.queries";
import { ErrorPanel } from "@/components/ui/ErrorPanel";

export const Route = createFileRoute("/users/$userId/")({
  component: UserDetail,
});

function UserDetail() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(userId);
  const deleteUser = useDeleteUser();

  const handleDelete = async () => {
    if (!user) return;

    if (
      window.confirm(
        `Are you sure you want to delete ${user.name} ${user.lastname}?`,
      )
    ) {
      try {
        await deleteUser.mutateAsync(userId);
        navigate({ to: "/users" });
      } catch (err) {
        console.error("Failed to delete user:", err);
        alert("Failed to delete user");
      }
    }
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
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/users"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Users
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          {user.name} {user.lastname}
        </h1>
      </div>

      {/* User Details Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">
            User Information
          </h2>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                First Name
              </label>
              <p className="text-base text-gray-900">{user.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Last Name
              </label>
              <p className="text-base text-gray-900">{user.lastname}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email
              </label>
              <p className="text-base text-gray-900">{user.email}</p>
            </div>

            {user.age !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Age
                </label>
                <p className="text-base text-gray-900">{user.age} years old</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Account Created
              </label>
              <p className="text-base text-gray-900">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Last Updated
              </label>
              <p className="text-base text-gray-900">
                {new Date(user.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                User ID
              </label>
              <p className="text-base text-gray-900 font-mono text-sm">
                {user.id}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
          <Link
            to="/users/$userId/edit"
            params={{ userId: user.id }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Edit User
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleteUser.isPending}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
          >
            {deleteUser.isPending ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
}
