import React, { Component } from 'react';
import classes from './Drawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

class Drawer extends Component {
  renderLinks = (links) => links.map((link, index) => (
    <li key={index}>
      <NavLink
        to={link.to}
        exact={link.eact}
        activeClassName={classes.active}
        onClick={this.props.onClose}>
        {link.label}
      </NavLink>
    </li>)
  );

  render() {
    const cls = [classes.Drawer, !this.props.isOpen ? classes.close : ''],
      links = [
        {
          to: '/',
          label: 'Список',
          exact: true,
        },
      ];

    if (this.props.isAuth) {
      links.push({
        to: '/quiz-creator',
        label: 'Создать тест',
        exact: false,
      }, {
        to: '/logout',
        label: 'Выйти',
        exact: false,
      });
    } else {
      links.push({
        to: '/auth',
        label: 'Авторизация',
        exact: false,
      });
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
      </>
    );
  }
}

export default Drawer;

