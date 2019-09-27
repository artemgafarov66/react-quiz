import React, { Component } from 'react';
import classes from './Drawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  {
    to: '/',
    label: 'Список',
    exact: true,
  },
  {
    to: '/auth',
    label: 'Авторизация',
    exact: true,
  },
  {
    to: '/quiz-creator',
    label: 'Создать тест',
    exact: true,
  },
];

class Drawer extends Component {
  renderLinks = () => links.map((link, index) => (
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
    const cls = [classes.Drawer, !this.props.isOpen ? classes.close : ''];
    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
      </>
    );
  }
}

export default Drawer;

