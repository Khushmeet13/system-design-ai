import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.NEXT_GROQ_API_KEY || '';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// Fallback explanations when API fails
const getFallbackExplanation = (node: any, systemContext: string) => {
  const fallbacks: Record<string, string> = {
    'load_balancer': `The load balancer distributes incoming traffic across multiple servers in your ${systemContext}, preventing any single server from becoming overloaded. It solves the challenge of handling sudden traffic spikes by dynamically routing requests to healthy servers. A key insight: modern load balancers use consistent hashing to maintain session persistence while scaling.`,
    
    'api_gateway': `The API Gateway acts as the single entry point for all client requests in your ${systemContext}, handling authentication, rate limiting, and request routing. It solves the complexity of managing multiple microservices by providing a unified interface and aggregating responses. Interesting fact: Netflix's API Gateway handles over 1 billion requests daily.`,
    
    'database': `The database provides persistent storage for your ${systemContext}, ensuring data durability and consistency across all operations. It solves the challenge of concurrent data access through ACID transactions and optimized query execution. Real-world insight: Most modern systems use a combination of relational and NoSQL databases for different use cases.`,
    
    'cache': `The cache layer dramatically reduces latency in your ${systemContext} by storing frequently accessed data in memory. It solves the performance challenge of repeated expensive database queries, often achieving sub-millisecond response times. Key insight: A 99% cache hit ratio can reduce database load by 100x.`,
    
    'message_queue': `The message queue enables asynchronous processing in your ${systemContext}, decoupling request receipt from actual processing. It solves the challenge of handling traffic spikes by buffering requests and processing them at a controlled rate. Interesting fact: Kafka can process millions of messages per second with proper configuration.`
  };
  
  return fallbacks[node.type] || 
    `${node.label} is a critical component in your ${systemContext} architecture. It handles ${node.description.toLowerCase()}. This component solves key scalability challenges while ensuring reliable operation under load.`;
};

async function callGroqForExplanation(prompt: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { 
          role: 'system', 
          content: 'You are a senior software architect. Provide concise, technical explanations of system components. Keep responses to 3-4 sentences maximum.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq API error:', response.status, errorText);
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function POST(req: NextRequest) {
  try {
    const { node, systemContext } = await req.json();
    
    if (!node || !systemContext) {
      return NextResponse.json({ 
        error: 'Node and systemContext required' 
      }, { status: 400 });
    }

    const prompt = `You are a senior software architect explaining a system component in a ${systemContext} architecture.

Component: ${node.label} (${node.type})
Description: ${node.description}

Provide a concise, insightful explanation (3-4 sentences) covering:
1. Its critical role in this specific system
2. A key engineering challenge it solves
3. A real-world insight or interesting fact

Be conversational, technical, and specific to ${systemContext}. Avoid generic descriptions.`;

    let explanation = '';
    let usedFallback = false;

    // Try to use Groq API if key is available
    if (GROQ_API_KEY) {
      try {
        console.log('Calling Groq API for explanation...');
        explanation = await callGroqForExplanation(prompt);
      } catch (apiError) {
        console.error('Groq API failed, using fallback:', apiError);
        explanation = getFallbackExplanation(node, systemContext);
        usedFallback = true;
      }
    } else {
      console.log('No Groq API key, using fallback explanations');
      explanation = getFallbackExplanation(node, systemContext);
      usedFallback = true;
    }

    return NextResponse.json({ 
      explanation, 
      usedFallback,
      provider: GROQ_API_KEY ? 'groq' : 'fallback'
    });
    
  } catch (err: any) {
    console.error('Explain endpoint error:', err);
    
    // Return a fallback explanation even on complete failure
    const { node, systemContext } = await req.json().catch(() => ({ node: null, systemContext: null }));
    const fallbackText = node ? 
      `${node.label} plays a crucial role in your ${systemContext || 'system'} architecture, handling ${node.description || 'critical operations'}. This component is designed for high availability and scalability.` :
      'Unable to generate explanation at this time. Please try again.';
    
    return NextResponse.json({ 
      explanation: fallbackText,
      error: err.message,
      usedFallback: true 
    });
  }
}