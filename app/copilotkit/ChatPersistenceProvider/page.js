"use client";
import { useEffect } from "react";
import { useCopilotMessagesContext } from "@copilotkit/react-core";
import {
  ActionExecutionMessage,
  ResultMessage,
  TextMessage,
} from "@copilotkit/runtime-client-gql";

export default function ChatPersistenceProvider({ children }) {
  const { messages, setMessages } = useCopilotMessagesContext();

  // Save to localStorage on messages change
  useEffect(() => {
    if (messages.length !== 0) {
      localStorage.setItem("copilotkit-messages", JSON.stringify(messages));
    }
  }, [JSON.stringify(messages)]);

  // Load from localStorage on mount
  useEffect(() => {
    const messages = localStorage.getItem("copilotkit-messages");
    if (messages) {
      const parsedMessages = JSON.parse(messages).map((message) => {
        if (message.type === "TextMessage") {
          return new TextMessage({
            id: message.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt,
          });
        } else if (message.type === "ActionExecutionMessage") {
          return new ActionExecutionMessage({
            id: message.id,
            name: message.name,
            scope: message.scope,
            arguments: message.arguments,
            createdAt: message.createdAt,
          });
        } else if (message.type === "ResultMessage") {
          return new ResultMessage({
            id: message.id,
            actionExecutionId: message.actionExecutionId,
            actionName: message.actionName,
            result: message.result,
            createdAt: message.createdAt,
          });
        } else {
          throw new Error(`Unknown message type: ${message.type}`);
        }
      });
      setMessages(parsedMessages);
    }
  }, [setMessages]);

  return children;
}
