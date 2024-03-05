import {faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function UserPageBtn({relLinkToPage = ''})
{
    return (
        <ul className="icon">
        <li className="icon-list">
            <a href={relLinkToPage} className="icon-a">
                <FontAwesomeIcon icon={faUser} />
            </a>
        </li>
    </ul>
    )
}

export default UserPageBtn