"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [promptId, setPromptId] = useState(""); // State to hold the promptId

  useEffect(() => {
    const id = searchParams.get("id"); // Now inside useEffect
    setPromptId(id); // Store the id in state

    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${id}`);
      const data = await response.json();
      console.log(data);

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (id) getPromptDetails(); // Fetch prompt details only if id is available
  }, [searchParams]); // Dependency on searchParams to run this effect when searchParams change

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID is missing"); // Ensure promptId is available

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
