const handleSend = async (e) => {
  e.preventDefault();

  const userMessage = input;
  setInput("");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await res.json();

  const reply = data?.choices?.[0]?.message?.content || "No response";

  setMessages(prev => [
    ...prev,
    { role: "user", text: userMessage },
    { role: "model", text: reply }
  ]);
};
