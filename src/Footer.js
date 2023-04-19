import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer'>
            <ul className='footer-list'>
                <li>
                    <Link to='/'>About</Link>
                </li>
                <li>
                    <Link to='/'>FAQ</Link>
                </li>
                <li>
                    <Link to='/'>Privacy</Link>
                </li>
                <li>
                    <Link to='/'>Contact</Link>
                </li>
            </ul>

            <p className='copyright'>
                <FontAwesomeIcon icon={faCopyright} />
                <span>
                    {' '}
                    2023 Vutran | Made by{' '}
                    <Link className='username-contact'>Vutran</Link>
                </span>
            </p>
        </div>
    );
}

export default Footer;
