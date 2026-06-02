// // import { NextRequest, NextResponse } from 'next/server';
// // import Anthropic from '@anthropic-ai/sdk';

// // const client = new Anthropic();

// // const SYSTEM_PROMPT = `You are a senior software architect and system design expert. When given a system to design, generate a comprehensive architecture in JSON format.

// // Return ONLY valid JSON matching this exact schema:
// // {
// //   "title": "System name",
// //   "description": "Brief description",
// //   "estimatedRPS": "e.g. 100K RPS at peak",
// //   "dataFlowDescription": "How data flows through the system",
// //   "scalingNotes": "Key scaling considerations",
// //   "nodes": [
// //     {
// //       "id": "unique_id",
// //       "type": "load_balancer|api_gateway|app_server|microservice|database|cache|message_queue|cdn|object_storage|auth_service|search_service",
// //       "label": "Display name",
// //       "description": "One-line description",
// //       "position": [x, y, z],
// //       "color": "#hexcolor matching type",
// //       "icon": "emoji",
// //       "instances": 1-10,
// //       "details": {
// //         "why": "Why this component exists in this system",
// //         "responsibility": "What it handles",
// //         "scalingStrategy": "How to scale this component",
// //         "interviewQuestions": ["Q1?", "Q2?", "Q3?"],
// //         "realWorldExamples": ["Company/use case 1", "Company/use case 2"],
// //         "techStack": ["Technology 1", "Technology 2"],
// //         "metrics": "Key metrics to monitor"
// //       }
// //     }
// //   ],
// //   "connections": [
// //     {
// //       "id": "conn_1",
// //       "from": "node_id",
// //       "to": "node_id",
// //       "label": "Protocol/action",
// //       "type": "http|tcp|pubsub|cache|db|cdn",
// //       "animated": true
// //     }
// //   ]
// // }

// // Position nodes in a 3D space: x from -25 to 25, y from -15 to 15, z from -20 to 20.
// // Arrange logically: CDN/LB at front (z=20), then API Gateway, then app servers/microservices in middle, then databases/cache/queues at back (z=-20).
// // Use y-axis for layers: high (y=10) for external-facing, middle (y=0) for processing, low (y=-10) for data.
// // Generate 8-16 nodes for a comprehensive architecture. Include all relevant components.
// // Colors: load_balancer=#00f5ef, api_gateway=#a855f7, app_server=#3b82f6, microservice=#84cc16, database=#f59e0b, cache=#ef4444, message_queue=#10b981, cdn=#f97316, object_storage=#6366f1, auth_service=#ec4899, search_service=#14b8a6`;

// // export async function POST(req: NextRequest) {
// //   try {
// //     const { prompt } = await req.json();
// //     if (!prompt) return NextResponse.json({ error: 'Prompt required' }, { status: 400 });

// //     const message = await client.messages.create({
// //       model: 'claude-opus-4-20250514',
// //       max_tokens: 4000,
// //       system: SYSTEM_PROMPT,
// //       messages: [{ role: 'user', content: `Design the system architecture for: ${prompt}` }],
// //     });

// //     const text = message.content[0].type === 'text' ? message.content[0].text : '';
    
// //     // Extract JSON
// //     const jsonMatch = text.match(/\{[\s\S]*\}/);
// //     if (!jsonMatch) throw new Error('No JSON found in response');
    
// //     const architecture = JSON.parse(jsonMatch[0]);
// //     return NextResponse.json({ architecture });
// //   } catch (err: any) {
// //     console.error('Generate error:', err);
// //     return NextResponse.json({ error: err.message }, { status: 500 });
// //   }
// // }


// import { NextRequest, NextResponse } from 'next/server';

// // Choose your free API provider - OPTION 1: OpenRouter (recommended)
// const OPENROUTER_API_KEY = process.env.NEXT_OPENROUTER_API_KEY || '';
// const OPENROUTER_MODEL = 'qwen/qwen3.6-plus-preview:free'; // Free model

// // OPTION 2: Groq (very fast, free tier)  
// const GROQ_API_KEY = process.env.NEXT_GROQ_API_KEY || '';
// const GROQ_MODEL = 'llama-3.3-70b-versatile';  // Free model on Groq

// // OPTION 3: Google Gemini (free tier)
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// // Choose which provider to use (priority order)
// const USE_PROVIDER = process.env.USE_PROVIDER || 'groq'; // 'openrouter', 'groq', or 'gemini'

// const SYSTEM_PROMPT = `You are a senior software architect and system design expert. When given a system to design, generate a comprehensive architecture in JSON format.

// Return ONLY valid JSON matching this exact schema:
// {
//   "title": "System name",
//   "description": "Brief description",
//   "estimatedRPS": "e.g. 100K RPS at peak",
//   "dataFlowDescription": "How data flows through the system",
//   "scalingNotes": "Key scaling considerations",
//   "nodes": [
//     {
//       "id": "unique_id",
//       "type": "load_balancer|api_gateway|app_server|microservice|database|cache|message_queue|cdn|object_storage|auth_service|search_service",
//       "label": "Display name",
//       "description": "One-line description",
//       "position": [x, y, z],
//       "color": "#hexcolor matching type",
//       "icon": "emoji",
//       "instances": 1-10,
//       "details": {
//         "why": "Why this component exists in this system",
//         "responsibility": "What it handles",
//         "scalingStrategy": "How to scale this component",
//         "interviewQuestions": ["Q1?", "Q2?", "Q3?"],
//         "realWorldExamples": ["Company/use case 1", "Company/use case 2"],
//         "techStack": ["Technology 1", "Technology 2"],
//         "metrics": "Key metrics to monitor"
//       }
//     }
//   ],
//   "connections": [
//     {
//       "id": "conn_1",
//       "from": "node_id",
//       "to": "node_id",
//       "label": "Protocol/action",
//       "type": "http|tcp|pubsub|cache|db|cdn",
//       "animated": true
//     }
//   ]
// }

// Position nodes in a 3D space: x from -25 to 25, y from -15 to 15, z from -20 to 20.
// Arrange logically: CDN/LB at front (z=20), then API Gateway, then app servers/microservices in middle, then databases/cache/queues at back (z=-20).
// Use y-axis for layers: high (y=10) for external-facing, middle (y=0) for processing, low (y=-10) for data.
// Generate 8-16 nodes for a comprehensive architecture. Include all relevant components.
// Colors: load_balancer=#00f5ef, api_gateway=#a855f7, app_server=#3b82f6, microservice=#84cc16, database=#f59e0b, cache=#ef4444, message_queue=#10b981, cdn=#f97316, object_storage=#6366f1, auth_service=#ec4899, search_service=#14b8a6`;

// // OpenRouter API call (free tier)
// async function callOpenRouter(prompt: string) {
//   const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
//       'Content-Type': 'application/json',
//       'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
//       'X-Title': 'System Architecture Generator',
//     },
//     body: JSON.stringify({
//       model: OPENROUTER_MODEL,
//       messages: [
//         { role: 'system', content: SYSTEM_PROMPT },
//         { role: 'user', content: `Design the system architecture for: ${prompt}` }
//       ],
//       temperature: 0.7,
//       max_tokens: 4000,
//     }),
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
//   }

//   const data = await response.json();
//   return data.choices[0].message.content;
// }

// // Groq API call (free tier, very fast)
// async function callGroq(prompt: string) {
//   const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${GROQ_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       model: GROQ_MODEL,
//       messages: [
//         { role: 'system', content: SYSTEM_PROMPT },
//         { role: 'user', content: `Design the system architecture for: ${prompt}` }
//       ],
//       temperature: 0.7,
//       max_tokens: 4000,
//     }),
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(`Groq API error: ${response.status} - ${error}`);
//   }

//   const data = await response.json();
//   return data.choices[0].message.content;
// }

// // Google Gemini API call (free tier)
// async function callGemini(prompt: string) {
//   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       contents: [{
//         parts: [{
//           text: `${SYSTEM_PROMPT}\n\nDesign the system architecture for: ${prompt}\n\nReturn ONLY valid JSON, no other text.`
//         }]
//       }],
//       generationConfig: {
//         temperature: 0.7,
//         maxOutputTokens: 4000,
//       },
//     }),
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(`Gemini API error: ${response.status} - ${error}`);
//   }

//   const data = await response.json();
//   return data.candidates[0].content.parts[0].text;
// }

// // Fallback mock generator (no API key needed)
// function generateMockArchitecture(prompt: string) {
//   const lowerPrompt = prompt.toLowerCase();
  
//   if (lowerPrompt.includes('uber') || lowerPrompt.includes('ride')) {
//     return {
//       title: "Uber-like Ride-Hailing System",
//       description: "Real-time ride matching, tracking, and payment system",
//       estimatedRPS: "100K RPS",
//       dataFlowDescription: "User requests ride → matched with nearby driver → real-time tracking → payment processing",
//       scalingNotes: "Geographic sharding of drivers, WebSocket connections for live tracking",
//       nodes: [
//         { id: "cdn", type: "cdn", label: "Cloud CDN", description: "Static assets & map tiles", position: [0, 10, 20], color: "#f97316", icon: "🌍", instances: 1, details: { why: "Serve static content globally", responsibility: "Static assets", scalingStrategy: "Auto-scaling", interviewQuestions: ["How to handle cache invalidation?"], realWorldExamples: ["CloudFront", "Cloudflare"], techStack: ["Cloudflare", "AWS CloudFront"], metrics: "Cache hit ratio" } },
//         { id: "lb", type: "load_balancer", label: "Load Balancer", description: "Traffic distribution", position: [0, 5, 18], color: "#00f5ef", icon: "⚖️", instances: 3, details: { why: "Distribute traffic across API gateways", responsibility: "Traffic routing", scalingStrategy: "Active-active", interviewQuestions: ["Which algorithm for sticky sessions?"], realWorldExamples: ["AWS ALB", "HAProxy"], techStack: ["NGINX", "AWS ALB"], metrics: "Requests per second" } },
//         { id: "api-gateway", type: "api_gateway", label: "API Gateway", description: "Route requests to services", position: [0, 0, 15], color: "#a855f7", icon: "🚪", instances: 5, details: { why: "Central entry point", responsibility: "Auth, rate limiting, routing", scalingStrategy: "Horizontal scaling", interviewQuestions: ["How to handle auth?"], realWorldExamples: ["Kong", "AWS API Gateway"], techStack: ["Kong", "Express Gateway"], metrics: "Latency p99" } },
//         { id: "auth", type: "auth_service", label: "Auth Service", description: "User authentication", position: [-8, 5, 12], color: "#ec4899", icon: "🔐", instances: 3, details: { why: "Secure user access", responsibility: "JWT tokens, OAuth", scalingStrategy: "Stateless scaling", interviewQuestions: ["How to store sessions?"], realWorldExamples: ["Auth0", "Keycloak"], techStack: ["JWT", "OAuth 2.0"], metrics: "Auth success rate" } },
//         { id: "ride-service", type: "microservice", label: "Ride Service", description: "Match riders with drivers", position: [-4, 0, 8], color: "#84cc16", icon: "🚗", instances: 10, details: { why: "Core ride matching logic", responsibility: "Ride creation, matching", scalingStrategy: "Event-driven", interviewQuestions: ["Algorithm for nearest driver?"], realWorldExamples: ["Uber Dispatch"], techStack: ["Go", "gRPC"], metrics: "Match time" } },
//         { id: "tracking", type: "microservice", label: "Real-time Tracking", description: "Driver location updates", position: [4, 0, 8], color: "#84cc16", icon: "📍", instances: 8, details: { why: "Live location updates", responsibility: "WebSocket connections", scalingStrategy: "Connection pooling", interviewQuestions: ["How to handle millions of connections?"], realWorldExamples: ["Uber Tracking"], techStack: ["Node.js", "Socket.io"], metrics: "Active connections" } },
//         { id: "payment", type: "microservice", label: "Payment Service", description: "Process payments", position: [-4, -5, 5], color: "#84cc16", icon: "💳", instances: 5, details: { why: "Handle transactions", responsibility: "Payment processing", scalingStrategy: "Idempotent design", interviewQuestions: ["How to handle failures?"], realWorldExamples: ["Stripe", "PayPal"], techStack: ["Stripe API", "Square"], metrics: "Success rate" } },
//         { id: "redis-cache", type: "cache", label: "Redis Cache", description: "Location cache", position: [8, -5, 0], color: "#ef4444", icon: "⚡", instances: 6, details: { why: "Low-latency location access", responsibility: "Caching driver locations", scalingStrategy: "Redis Cluster", interviewQuestions: ["Eviction policy?"], realWorldExamples: ["Uber Location Cache"], techStack: ["Redis", "Redisearch"], metrics: "Hit ratio" } },
//         { id: "postgres", type: "database", label: "PostgreSQL", description: "User & ride data", position: [-6, -10, -8], color: "#f59e0b", icon: "🐘", instances: 3, details: { why: "ACID compliance", responsibility: "Persistent storage", scalingStrategy: "Read replicas", interviewQuestions: ["Sharding strategy?"], realWorldExamples: ["Uber PostgreSQL"], techStack: ["PostgreSQL", "Citus"], metrics: "Query latency" } },
//         { id: "kafka", type: "message_queue", label: "Kafka", description: "Event streaming", position: [0, -8, -5], color: "#10b981", icon: "📨", instances: 5, details: { why: "Async processing", responsibility: "Event bus", scalingStrategy: "Partition scaling", interviewQuestions: ["Exactly-once semantics?"], realWorldExamples: ["Uber Kafka"], techStack: ["Kafka", "Debezium"], metrics: "Lag" } }
//       ],
//       connections: [
//         { id: "c1", from: "cdn", to: "lb", label: "HTTP/2", type: "http", animated: true },
//         { id: "c2", from: "lb", to: "api-gateway", label: "HTTP", type: "http", animated: true },
//         { id: "c3", from: "api-gateway", to: "auth", label: "JWT", type: "http", animated: true },
//         { id: "c4", from: "api-gateway", to: "ride-service", label: "gRPC", type: "http", animated: true },
//         { id: "c5", from: "api-gateway", to: "tracking", label: "WebSocket", type: "tcp", animated: true },
//         { id: "c6", from: "tracking", to: "redis-cache", label: "Cache", type: "cache", animated: false },
//         { id: "c7", from: "ride-service", to: "postgres", label: "SQL", type: "db", animated: false },
//         { id: "c8", from: "ride-service", to: "kafka", label: "Event", type: "pubsub", animated: true },
//         { id: "c9", from: "payment", to: "postgres", label: "SQL", type: "db", animated: false }
//       ]
//     };
//   }
  
//   // Default architecture
//   return {
//     title: "Microservices Architecture",
//     description: "Scalable backend system",
//     estimatedRPS: "50K RPS",
//     dataFlowDescription: "Client → Load Balancer → API Gateway → Services → Database",
//     scalingNotes: "Horizontal scaling for stateless services",
//     nodes: [
//       { id: "lb", type: "load_balancer", label: "Load Balancer", position: [0, 5, 20], color: "#00f5ef", icon: "⚖️", instances: 2, details: { why: "Traffic distribution", responsibility: "Routing", scalingStrategy: "Active-active", interviewQuestions: [], realWorldExamples: [], techStack: ["NGINX"], metrics: "RPS" } },
//       { id: "api", type: "api_gateway", label: "API Gateway", position: [0, 0, 15], color: "#a855f7", icon: "🚪", instances: 3, details: { why: "Entry point", responsibility: "Routing", scalingStrategy: "Horizontal", interviewQuestions: [], realWorldExamples: [], techStack: ["Kong"], metrics: "Latency" } },
//       { id: "app", type: "app_server", label: "App Server", position: [0, -5, 5], color: "#3b82f6", icon: "💻", instances: 5, details: { why: "Business logic", responsibility: "Processing", scalingStrategy: "Stateless", interviewQuestions: [], realWorldExamples: [], techStack: ["Node.js"], metrics: "CPU" } },
//       { id: "db", type: "database", label: "Database", position: [0, -10, -10], color: "#f59e0b", icon: "🗄️", instances: 2, details: { why: "Data persistence", responsibility: "Storage", scalingStrategy: "Read replicas", interviewQuestions: [], realWorldExamples: [], techStack: ["PostgreSQL"], metrics: "Query time" } }
//     ],
//     connections: [
//       { id: "c1", from: "lb", to: "api", label: "HTTP", type: "http", animated: true },
//       { id: "c2", from: "api", to: "app", label: "HTTP", type: "http", animated: true },
//       { id: "c3", from: "app", to: "db", label: "SQL", type: "db", animated: false }
//     ]
//   };
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();
//     if (!prompt) {
//       return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
//     }

//     let text = '';
//     let usedFallback = false;

//     // Try to use real API if key is available
//     try {
//       if (USE_PROVIDER === 'openrouter' && OPENROUTER_API_KEY) {
//         console.log('Using OpenRouter API...');
//         text = await callOpenRouter(prompt);
//       } else if (USE_PROVIDER === 'groq' && GROQ_API_KEY) {
//         console.log('Using Groq API...');
//         text = await callGroq(prompt);
//       } else if (USE_PROVIDER === 'gemini' && GEMINI_API_KEY) {
//         console.log('Using Gemini API...');
//         text = await callGemini(prompt);
//       } else {
//         console.log('No API key configured, using mock generator');
//         usedFallback = true;
//         const architecture = generateMockArchitecture(prompt);
//         return NextResponse.json({ architecture, usedFallback: true });
//       }
//     } catch (apiError) {
//       console.error('API error, falling back to mock:', apiError);
//       usedFallback = true;
//       const architecture = generateMockArchitecture(prompt);
//       return NextResponse.json({ architecture, usedFallback: true });
//     }

//     // Extract JSON from response
//     const jsonMatch = text.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('No JSON found in response');
//     }
    
//     const architecture = JSON.parse(jsonMatch[0]);
//     return NextResponse.json({ architecture, usedFallback: false });
    
//   } catch (err: any) {
//     console.error('Generate error:', err);
//     // Fallback to mock on error
//     const mockArchitecture = generateMockArchitecture(err.message);
//     return NextResponse.json({ architecture: mockArchitecture, usedFallback: true, error: err.message });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.NEXT_OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = 'qwen/qwen3.6-plus-preview:free';

const GROQ_API_KEY = process.env.NEXT_GROQ_API_KEY || '';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const GEMINI_API_KEY = process.env.NEXT_GEMINI_API_KEY || '';

// const USE_PROVIDER = process.env.USE_PROVIDER || 'groq';

const SYSTEM_PROMPT = `You are a senior software architect and system design expert. When given a system to design, generate a comprehensive architecture in JSON format.

Return ONLY valid JSON matching this exact schema:
{
  "title": "System name",
  "description": "Brief description",
  "estimatedRPS": "e.g. 100K RPS at peak",
  "dataFlowDescription": "How data flows through the system",
  "scalingNotes": "Key scaling considerations",
  "nodes": [
    {
      "id": "unique_id",
      "type": "load_balancer|api_gateway|app_server|microservice|database|cache|message_queue|cdn|object_storage|auth_service|search_service",
      "label": "Display name",
      "description": "One-line description",
      "position": [x, y, z],
      "color": "#hexcolor matching type",
      "icon": "emoji",
      "instances": 1-10,
      "details": {
        "why": "Why this component exists in this system",
        "responsibility": "What it handles",
        "scalingStrategy": "How to scale this component",
        "interviewQuestions": ["Q1?", "Q2?", "Q3?"],
        "realWorldExamples": ["Company/use case 1", "Company/use case 2"],
        "techStack": ["Technology 1", "Technology 2"],
        "metrics": "Key metrics to monitor"
      }
    }
  ],
  "connections": [
    {
      "id": "conn_1",
      "from": "node_id",
      "to": "node_id",
      "label": "Protocol/action",
      "type": "http|tcp|pubsub|cache|db|cdn",
      "animated": true
    }
  ]
}

Position nodes in a 3D space: x from -25 to 25, y from -15 to 15, z from -20 to 20.
Arrange logically: CDN/LB at front (z=20), then API Gateway, then app servers/microservices in middle, then databases/cache/queues at back (z=-20).
Use y-axis for layers: high (y=10) for external-facing, middle (y=0) for processing, low (y=-10) for data.
Generate 8-16 nodes for a comprehensive architecture. Include all relevant components.
Colors: load_balancer=#00f5ef, api_gateway=#a855f7, app_server=#3b82f6, microservice=#84cc16, database=#f59e0b, cache=#ef4444, message_queue=#10b981, cdn=#f97316, object_storage=#6366f1, auth_service=#ec4899, search_service=#14b8a6`;

async function callOpenRouter(prompt: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'System Architecture Generator',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Design the system architecture for: ${prompt}` }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });
  if (!response.ok) throw new Error(`OpenRouter API error: ${response.status} - ${await response.text()}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGroq(prompt: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Design the system architecture for: ${prompt}` }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });
  if (!response.ok) throw new Error(`Groq API error: ${response.status} - ${await response.text()}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(prompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nDesign the system architecture for: ${prompt}\n\nReturn ONLY valid JSON, no other text.` }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4000 },
    }),
  });
  if (!response.ok) throw new Error(`Gemini API error: ${response.status} - ${await response.text()}`);
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

function generateMockArchitecture(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes('uber') || lowerPrompt.includes('ride')) {
    return {
      title: "Uber-like Ride-Hailing System",
      description: "Real-time ride matching, tracking, and payment system",
      estimatedRPS: "100K RPS",
      dataFlowDescription: "User requests ride → matched with nearby driver → real-time tracking → payment processing",
      scalingNotes: "Geographic sharding of drivers, WebSocket connections for live tracking",
      nodes: [
        { id: "cdn", type: "cdn", label: "Cloud CDN", description: "Static assets & map tiles", position: [0, 10, 20], color: "#f97316", icon: "🌍", instances: 1, details: { why: "Serve static content globally", responsibility: "Static assets", scalingStrategy: "Auto-scaling", interviewQuestions: ["How to handle cache invalidation?"], realWorldExamples: ["CloudFront", "Cloudflare"], techStack: ["Cloudflare", "AWS CloudFront"], metrics: "Cache hit ratio" } },
        { id: "lb", type: "load_balancer", label: "Load Balancer", description: "Traffic distribution", position: [0, 5, 18], color: "#00f5ef", icon: "⚖️", instances: 3, details: { why: "Distribute traffic across API gateways", responsibility: "Traffic routing", scalingStrategy: "Active-active", interviewQuestions: ["Which algorithm for sticky sessions?"], realWorldExamples: ["AWS ALB", "HAProxy"], techStack: ["NGINX", "AWS ALB"], metrics: "Requests per second" } },
        { id: "api-gateway", type: "api_gateway", label: "API Gateway", description: "Route requests to services", position: [0, 0, 15], color: "#a855f7", icon: "🚪", instances: 5, details: { why: "Central entry point", responsibility: "Auth, rate limiting, routing", scalingStrategy: "Horizontal scaling", interviewQuestions: ["How to handle auth?"], realWorldExamples: ["Kong", "AWS API Gateway"], techStack: ["Kong", "Express Gateway"], metrics: "Latency p99" } },
        { id: "auth", type: "auth_service", label: "Auth Service", description: "User authentication", position: [-8, 5, 12], color: "#ec4899", icon: "🔐", instances: 3, details: { why: "Secure user access", responsibility: "JWT tokens, OAuth", scalingStrategy: "Stateless scaling", interviewQuestions: ["How to store sessions?"], realWorldExamples: ["Auth0", "Keycloak"], techStack: ["JWT", "OAuth 2.0"], metrics: "Auth success rate" } },
        { id: "ride-service", type: "microservice", label: "Ride Service", description: "Match riders with drivers", position: [-4, 0, 8], color: "#84cc16", icon: "🚗", instances: 10, details: { why: "Core ride matching logic", responsibility: "Ride creation, matching", scalingStrategy: "Event-driven", interviewQuestions: ["Algorithm for nearest driver?"], realWorldExamples: ["Uber Dispatch"], techStack: ["Go", "gRPC"], metrics: "Match time" } },
        { id: "tracking", type: "microservice", label: "Real-time Tracking", description: "Driver location updates", position: [4, 0, 8], color: "#84cc16", icon: "📍", instances: 8, details: { why: "Live location updates", responsibility: "WebSocket connections", scalingStrategy: "Connection pooling", interviewQuestions: ["How to handle millions of connections?"], realWorldExamples: ["Uber Tracking"], techStack: ["Node.js", "Socket.io"], metrics: "Active connections" } },
        { id: "payment", type: "microservice", label: "Payment Service", description: "Process payments", position: [-4, -5, 5], color: "#84cc16", icon: "💳", instances: 5, details: { why: "Handle transactions", responsibility: "Payment processing", scalingStrategy: "Idempotent design", interviewQuestions: ["How to handle failures?"], realWorldExamples: ["Stripe", "PayPal"], techStack: ["Stripe API", "Square"], metrics: "Success rate" } },
        { id: "redis-cache", type: "cache", label: "Redis Cache", description: "Location cache", position: [8, -5, 0], color: "#ef4444", icon: "⚡", instances: 6, details: { why: "Low-latency location access", responsibility: "Caching driver locations", scalingStrategy: "Redis Cluster", interviewQuestions: ["Eviction policy?"], realWorldExamples: ["Uber Location Cache"], techStack: ["Redis", "Redisearch"], metrics: "Hit ratio" } },
        { id: "postgres", type: "database", label: "PostgreSQL", description: "User & ride data", position: [-6, -10, -8], color: "#f59e0b", icon: "🐘", instances: 3, details: { why: "ACID compliance", responsibility: "Persistent storage", scalingStrategy: "Read replicas", interviewQuestions: ["Sharding strategy?"], realWorldExamples: ["Uber PostgreSQL"], techStack: ["PostgreSQL", "Citus"], metrics: "Query latency" } },
        { id: "kafka", type: "message_queue", label: "Kafka", description: "Event streaming", position: [0, -8, -5], color: "#10b981", icon: "📨", instances: 5, details: { why: "Async processing", responsibility: "Event bus", scalingStrategy: "Partition scaling", interviewQuestions: ["Exactly-once semantics?"], realWorldExamples: ["Uber Kafka"], techStack: ["Kafka", "Debezium"], metrics: "Lag" } }
      ],
      connections: [
        { id: "c1", from: "cdn", to: "lb", label: "HTTP/2", type: "http", animated: true },
        { id: "c2", from: "lb", to: "api-gateway", label: "HTTP", type: "http", animated: true },
        { id: "c3", from: "api-gateway", to: "auth", label: "JWT", type: "http", animated: true },
        { id: "c4", from: "api-gateway", to: "ride-service", label: "gRPC", type: "http", animated: true },
        { id: "c5", from: "api-gateway", to: "tracking", label: "WebSocket", type: "tcp", animated: true },
        { id: "c6", from: "tracking", to: "redis-cache", label: "Cache", type: "cache", animated: false },
        { id: "c7", from: "ride-service", to: "postgres", label: "SQL", type: "db", animated: false },
        { id: "c8", from: "ride-service", to: "kafka", label: "Event", type: "pubsub", animated: true },
        { id: "c9", from: "payment", to: "postgres", label: "SQL", type: "db", animated: false }
      ]
    };
  }
  return {
    title: "Microservices Architecture",
    description: "Scalable backend system",
    estimatedRPS: "50K RPS",
    dataFlowDescription: "Client → Load Balancer → API Gateway → Services → Database",
    scalingNotes: "Horizontal scaling for stateless services",
    nodes: [
      { id: "lb", type: "load_balancer", label: "Load Balancer", description: "Traffic distribution", position: [0, 5, 20], color: "#00f5ef", icon: "⚖️", instances: 2, details: { why: "Traffic distribution", responsibility: "Routing", scalingStrategy: "Active-active", interviewQuestions: [], realWorldExamples: [], techStack: ["NGINX"], metrics: "RPS" } },
      { id: "api", type: "api_gateway", label: "API Gateway", description: "Central entry point", position: [0, 0, 15], color: "#a855f7", icon: "🚪", instances: 3, details: { why: "Entry point", responsibility: "Routing", scalingStrategy: "Horizontal", interviewQuestions: [], realWorldExamples: [], techStack: ["Kong"], metrics: "Latency" } },
      { id: "app", type: "app_server", label: "App Server", description: "Business logic", position: [0, -5, 5], color: "#3b82f6", icon: "💻", instances: 5, details: { why: "Business logic", responsibility: "Processing", scalingStrategy: "Stateless", interviewQuestions: [], realWorldExamples: [], techStack: ["Node.js"], metrics: "CPU" } },
      { id: "db", type: "database", label: "Database", description: "Persistent storage", position: [0, -10, -10], color: "#f59e0b", icon: "🗄️", instances: 2, details: { why: "Data persistence", responsibility: "Storage", scalingStrategy: "Read replicas", interviewQuestions: [], realWorldExamples: [], techStack: ["PostgreSQL"], metrics: "Query time" } }
    ],
    connections: [
      { id: "c1", from: "lb", to: "api", label: "HTTP", type: "http", animated: true },
      { id: "c2", from: "api", to: "app", label: "HTTP", type: "http", animated: true },
      { id: "c3", from: "app", to: "db", label: "SQL", type: "db", animated: false }
    ]
  };
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'Prompt required' }, { status: 400 });

     let text = '';
    let usedProvider = 'none';
    let lastError = null;

     const providers = [
      { name: 'groq', fn: () => callGroq(prompt), hasKey: !!GROQ_API_KEY },
      { name: 'gemini', fn: () => callGemini(prompt), hasKey: !!GEMINI_API_KEY },
      { name: 'openrouter', fn: () => callOpenRouter(prompt), hasKey: !!OPENROUTER_API_KEY }
    ];

    for (const provider of providers) {
      if (provider.hasKey) {
        try {
          text = await provider.fn();
          usedProvider = provider.name;
          break; // Success, exit the chain
        } catch (error) {
          console.error(`${provider.name} failed:`, error);
          lastError = error;
          continue; // Try next provider
        }
      } else {
        console.log(`Skipping ${provider.name} - no API key`);
      }
    }

    if (!text) {
      console.log('All APIs failed, using mock generator');
      return NextResponse.json({ 
        architecture: generateMockArchitecture(prompt), 
        usedFallback: true,
        provider: 'mock',
        error: lastError?.message 
      });
    }

    // try {
    //   if (USE_PROVIDER === 'openrouter' && OPENROUTER_API_KEY) {
    //     console.log('Using OpenRouter API...');
    //     text = await callOpenRouter(prompt);
    //   } else if (USE_PROVIDER === 'groq' && GROQ_API_KEY) {
    //     console.log('Using Groq API...');
    //     text = await callGroq(prompt);
    //   } else if (USE_PROVIDER === 'gemini' && GEMINI_API_KEY) {
    //     console.log('Using Gemini API...');
    //     text = await callGemini(prompt);
    //   } else {
    //     console.log('No API key configured, using mock generator');
    //     return NextResponse.json({ architecture: generateMockArchitecture(prompt), usedFallback: true });
    //   }
    // } catch (apiError) {
    //   console.error('API error, falling back to mock:', apiError);
    //   return NextResponse.json({ architecture: generateMockArchitecture(prompt), usedFallback: true });
    // }

    // Strip markdown fences
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('No JSON found in response');

    const architecture = JSON.parse(cleaned.slice(start, end + 1));
    return NextResponse.json({ architecture, usedFallback: false });

  } catch (err: any) {
    console.error('Generate error:', err);
    return NextResponse.json({ architecture: generateMockArchitecture('default'), usedFallback: true, error: err.message });
  }
}
