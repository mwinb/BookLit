import { UserContextInterface } from './../common/context/UserContext';
import * as UserContext from '../common/context/UserContext';

export function spyUseUser(initialUserContext: UserContextInterface) {
    return jest.spyOn(UserContext, 'useUser').mockReturnValue(initialUserContext);
}