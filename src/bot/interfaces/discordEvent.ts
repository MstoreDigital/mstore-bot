import { Events } from 'discord.js'

export interface DiscordEvent {
	type: 'once' | 'on';
	name: Events;
	execute: (...args: any[]) => Promise<any>;
}
