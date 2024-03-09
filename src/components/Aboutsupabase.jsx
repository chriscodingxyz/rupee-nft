import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import supabase from "../services/supabase";

async function getNotes() {
  const { data, error } = await supabase.from("notes").select("*");

  if (error) {
    throw new Error("Failed to fetch notes");
  }

  console.log("data!!!", data);

  return data;
}

export default function About() {
  const queryClient = useQueryClient();

  const {
    data: notesData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const mutation = useMutation({
    mutationFn: async (newNoteTitle) => {
      const { data, error } = await supabase
        .from("notes")
        .insert({
          title: "testint testing",
        })
        .single();

      if (error) {
        throw new Error("Failed to insert note");
      }

      return data; // Return the mutated data
    },
    onSuccess: () => {
      queryClient.invalidateQueries("notes"); // Invalidate the "notes" query after mutation
      console.log("we did it bitch");
    },
  });

  const handleInsert = async () => {
    try {
      await mutation.mutate("testing"); // Call mutate with the new data
    } catch (error) {
      console.error("Error inserting note:", error);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>; // Corrected loading message
  }

  return (
    <div className="text-center">
      notes stuff{JSON.stringify(notesData)}
      <button onClick={handleInsert}>Insert Note</button>{" "}
      {/* Call handleInsert instead of mutate */}
    </div>
  );
}
