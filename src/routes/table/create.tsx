import { createFileRoute } from "@tanstack/react-router";
import FormController from "../../components/FormController";

export const Route = createFileRoute("/table/create")({
  component: FormController,
});
