import { useCopilotAction } from "@copilotkit/react-core";

export default function SummaryAction() {
  useCopilotAction({
    name: "PrintSummaryInConsole",
    description: "Prints a summary in the browser console based on a topic.",
    parameters: [
      { name: "summary", type: "string", description: "The summary to print" }
    ],
    handler: async ({ summary }) => {
      console.group("📋 AI-Generated Summary:");
      console.log(summary);
      console.groupEnd();
      return "The AI-generated summary has been printed in the browser console.";
    }
  });
  return null;
}