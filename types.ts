export enum AppView {
  DASHBOARD = 'DASHBOARD',
  GENERATOR = 'GENERATOR',
  CALENDAR = 'CALENDAR',
  MEDIA = 'MEDIA',
  SETTINGS = 'SETTINGS',
}

export enum SocialPlatform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  LINKEDIN = 'LinkedIn',
  FACEBOOK = 'Facebook',
}

export interface GeneratedContent {
  id: string;
  platform: SocialPlatform;
  destination: string;
  content: string;
  hashtags: string[];
  createdAt: Date;
}

export interface BrandSettings {
  name: string;
  tone: string;
  targetAudience: string;
  primaryDestination: string;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  platform: SocialPlatform;
}
