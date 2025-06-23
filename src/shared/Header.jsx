import { NavLink } from 'react-router';

import styles from './Header.module.css';

/* ======================================================== */

function Header({ title }) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>

      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to="/"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/* ======================================================== */

export default Header;

/* 
Active State Styling:
NavLink automatically applies an "active" class (or allows for custom styling via the "className" or "style" props, which can accept a function to dynamically apply styles based on "isActive" and "isPending" states) when its to prop matches the current URL. This is useful for visually highlighting the active link in a navigation bar or menu.


Ex:

<NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
  Home
</NavLink>
*/
