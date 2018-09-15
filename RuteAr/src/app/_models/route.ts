import { User } from './user';
import { Activity } from './activity';
import { Difficulty } from './difficulty';

export class Route {
	id: number;
	name: string;
	description: string;
	isPublic: boolean;
	doneByCount: number;
	length: number;
	duration: number;
	date: Date;
	isCircular: boolean;
	rateAvg: number;
	difficulty: Difficulty;
	activity: Activity;
	owner: User;
	points: string;
}
