import { NodeType } from '@/types';

export const NODE_CONFIG: Record<NodeType, {
  color: string;
  icon: string;
  glowColor: string;
  shape: 'box' | 'cylinder' | 'sphere' | 'octahedron' | 'cone' | 'torus';
}> = {
  load_balancer: { color: '#00f5ef', icon: '⚖️', glowColor: '#00f5ef', shape: 'octahedron' },
  api_gateway: { color: '#a855f7', icon: '🔌', glowColor: '#a855f7', shape: 'box' },
  app_server: { color: '#3b82f6', icon: '🖥️', glowColor: '#3b82f6', shape: 'box' },
  microservice: { color: '#84cc16', icon: '⚙️', glowColor: '#84cc16', shape: 'box' },
  database: { color: '#f59e0b', icon: '🗄️', glowColor: '#f59e0b', shape: 'cylinder' },
  cache: { color: '#ef4444', icon: '⚡', glowColor: '#ef4444', shape: 'sphere' },
  message_queue: { color: '#10b981', icon: '📨', glowColor: '#10b981', shape: 'torus' },
  cdn: { color: '#f97316', icon: '🌐', glowColor: '#f97316', shape: 'sphere' },
  object_storage: { color: '#6366f1', icon: '📦', glowColor: '#6366f1', shape: 'box' },
  auth_service: { color: '#ec4899', icon: '🔐', glowColor: '#ec4899', shape: 'octahedron' },
  search_service: { color: '#14b8a6', icon: '🔍', glowColor: '#14b8a6', shape: 'cone' },
};

export const CONNECTION_COLORS: Record<string, string> = {
  http: '#00f5ef',
  tcp: '#a855f7',
  pubsub: '#10b981',
  cache: '#ef4444',
  db: '#f59e0b',
  cdn: '#f97316',
};

export const PRESET_SYSTEMS = [
  { name: 'Instagram', emoji: '📸', prompt: 'Build Instagram - photo/video sharing with stories, reels, explore feed, DMs, and social graph' },
  { name: 'Netflix', emoji: '🎬', prompt: 'Build Netflix - video streaming platform with recommendations, CDN delivery, encoding pipeline, and global scale' },
  { name: 'Uber', emoji: '🚗', prompt: 'Build Uber - ride sharing with real-time location tracking, driver matching, surge pricing, and trip management' },
  { name: 'WhatsApp', emoji: '💬', prompt: 'Build WhatsApp - messaging app with end-to-end encryption, group chats, media sharing, and presence indicators' },
  { name: 'Amazon', emoji: '🛒', prompt: 'Build Amazon - e-commerce platform with product catalog, cart, payments, inventory, fulfillment, and recommendations' },
  { name: 'Twitter/X', emoji: '🐦', prompt: 'Build Twitter/X - social media with tweets, timeline feed, trending topics, notifications, and search' },
  { name: 'Airbnb', emoji: '🏠', prompt: 'Build Airbnb - rental marketplace with listings, search, booking, payments, reviews, and host management' },
  { name: 'YouTube', emoji: '▶️', prompt: 'Build YouTube - video platform with uploads, transcoding, streaming, comments, subscriptions, and recommendations' },
];
