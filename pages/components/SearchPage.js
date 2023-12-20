import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
function SearchPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const apiKey = "AIzaSyALvBX4D5tTTlEGTMCFucTM23-XvtHwuWY"; // Replace with your actual key

  const getGeminiContent = () => {
    const url = 'https://api.geminilabs.ai/v1/content';
    const requestBody = {
      instruction: "Generate content for a blog post and a LinkedIn post based on the following YouTube video:",
      content: prompt, // Use the entered prompt as the content
      desiredOutputs: ["blog-post", "linkedin-post"]
    };

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        setGeneratedContent(JSON.stringify(data)); // Update the state with the received content
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Enter your prompt:</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={getGeminiContent}>Generate Content</button>
      <br />
      <div id="content">{generatedContent}</div>
    </div>
  );
}

export default SearchPage;