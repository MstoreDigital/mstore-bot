import { Events } from 'discord.js'

export class DiscordEvent {
	constructor(
		protected _type: 'once' | 'on',
		protected _name: Events,
		protected _execute: (...args: any[]) => Promise<any>
	) {}
	public get type() { return this._type }
	public get name() { return this._name }
	public get execute() { return this._execute }
}
