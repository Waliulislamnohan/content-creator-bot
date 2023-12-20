import axios from 'axios';

const BARD_API_URL = 'https://api.bard.ai/v1/content';

export default async function handler(req, res) {
  const { url } = req.body;



  const headers = {
    Authorization: `Bearer ${process.env.BARD_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const body = {
    instruction: 'Generate content for a blog post and a LinkedIn post based on the following YouTube video:',
    content: url,
    desiredOutputs: ['blog-post', 'linkedin-post'],
  };

  try {
    const response = await axios.post(BARD_API_URL, body, { headers });

    if (response.status === 200) {
      return res.status(200).json({ content: response.data });
    } else {
      console.error(response.data.error);
      return res.status(500).json({ message: 'Failed to generate content' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to generate content' });
  }
}