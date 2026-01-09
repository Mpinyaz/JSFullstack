import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h1 className="text-red-400">Welcome Home!</h1>
    </div>
  );
}
