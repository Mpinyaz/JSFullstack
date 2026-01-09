import { createFileRoute, useNavigate } from "@tanstack/react-router";
import UserForm from "@/components/ui/UserForm";
import type { UserFormData } from "@/types";

export const Route = createFileRoute("/users/create")({
  component: CreateUser,
});

function CreateUser() {
  const navigate = useNavigate();

  const handleSubmit = (data: UserFormData) => {
    // Here you would typically send the data to your API
    // For now, we'll just log it and navigate back
    console.log("Creating user:", data);

    // Simulate API call
    const newUser = {
      id: crypto.randomUUID(),
      ...data,
      password: "", // This would be handled by backend
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("User created:", newUser);

    // Navigate back to users list
    navigate({ to: "/users" });
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

      <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
