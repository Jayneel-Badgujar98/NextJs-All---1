// file lib/inngest/functions.js
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "ai-career-coach" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

// import { inngest } from "./client";

// export const simpleFunction = inngest.createFunction(
//   { id: "simple-function" },
//   { event: "test/simple.function" },
//   async ({ event, step }) => {
//     console.log("Inngest simple function triggered");
//     await step.run("log-step", async () => {
//       console.log("This is a step in the simple function");
//     });
//     return { message: "Simple function executed successfully!" };
//   }
// );
