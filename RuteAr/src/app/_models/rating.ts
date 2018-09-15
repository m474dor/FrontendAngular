import { User } from './user';
import { Route } from './route';

export class Rating {
	id: number;
	rating: number;
	rateBy: User;
	route: Route;
}
