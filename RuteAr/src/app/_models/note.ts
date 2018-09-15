import { Route } from './route';
import { User } from './user';
import { CategoryType } from './category-type.enum';

export class Note {
	id: number;
	category: CategoryType;
	description: string;
	route: Route;
	user: User;
}
