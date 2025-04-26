import { createFileRoute, useParams } from "@tanstack/react-router";
import FormController from "../../components/FormController";

export const Route = createFileRoute("/table/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: Route.id });

  return <FormController id={id} />;
}
