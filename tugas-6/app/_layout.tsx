import { NotesProvider } from "@/context/NotesContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <NotesProvider>
      <Slot />
    </NotesProvider>
  )
}