import { Container } from 'inversify';
import { INTERFACES } from './interfaces.types';
import ApiRoutes from '../../Presentation/Http/Routes';

const DIContainer = new Container();

DIContainer.bind<ApiRoutes>(ApiRoutes).toSelf();

export default DIContainer;