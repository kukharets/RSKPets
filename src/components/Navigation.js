import React from 'react';
import { switchDailyPreviewModalState } from '../actions';
import { connect } from 'react-redux';
import AddPathModal from '../components/AddPathModal';
import Modal from 'react-modal';
const NavItem = props => {
    console.log(props);
    const pageURI = window.location.pathname+window.location.search
    const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item" + " " + props.classname;
    const aClassName = props.disabled ? "nav-link disabled" : "nav-link"
    return (
        <li className={liClassName}>
            <a href={props.path} className={aClassName}>
                {props.name}
                {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
            </a>
        </li>
    );
}

class NavDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };
    }
    showDropdown(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    render() {
        const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '')
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false"
                   onClick={(e) => {this.showDropdown(e)}}>
                    {this.props.name}
                </a>
                <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
                    {this.props.children}
                </div>
            </li>
        )
    }
}


class Navigation extends React.Component {
    addPathClick = () => {
      this.props.switchDailyPreviewModalState();
    };
    render() {
        console.log("Navigation props: ", this.props);
        return (
            <nav className="navbar bg-white">
                <a className="navbar-brand text-dark" href="/">Travels</a>
                <button onClick={this.addPathClick.bind(this)} className="btn bg-primary" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    ADD PATH
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavItem clasname="navbar-nav mr-auto text-dark" path="/" name="Home" />
                        <NavItem path="/secret" name="Secret" />

                        {/*<NavDropdown name="Dropdown">*/}
                            {/*<a className="dropdown-item" href="/">Action</a>*/}
                            {/*<a className="dropdown-item" href="/">Another action</a>*/}
                            {/*<div className="dropdown-divider"></div>*/}
                            {/*<a className="dropdown-item" href="/">Something else here</a>*/}
                        {/*</NavDropdown>*/}

                    </ul>
                    {/*<form className="form-inline my-2 my-lg-0">*/}
                        {/*<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />*/}
                        {/*<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
                    {/*</form>*/}
                    <AddPathModal/>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({ basic }) => {
    console.log('mSTP FullReports.js > ', basic);
    const {
        switchDailyPreviewModalState,
    } = basic;
    return {
        switchDailyPreviewModalState
    };
};
export default connect(mapStateToProps, {
    switchDailyPreviewModalState,
})(Navigation);