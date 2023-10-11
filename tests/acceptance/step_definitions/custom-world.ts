import { type IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber'
import type { BrowserContext, Page } from '@playwright/test'

export interface ICustomWorld extends World {
	context?: BrowserContext
	page?: Page
}

export class CustomWorld extends World implements ICustomWorld {
	constructor(options: IWorldOptions) {
		super(options)
	}
}

setWorldConstructor(CustomWorld)