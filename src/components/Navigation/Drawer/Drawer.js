import React, { Component } from 'react';
import classes from './Drawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [1, 2, 3];

class Drawer extends Component {
  renderLinks = () => links.map((link, index) => <li key={index}><a>Link {link}</a></li>)

  render() {
    const cls = [classes.Drawer, !this.props.isOpen ? classes.close : ''];
    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen && <Backdrop onClick={this.props.onClose}/>}
      </>
    )
  }
};

export default Drawer;

