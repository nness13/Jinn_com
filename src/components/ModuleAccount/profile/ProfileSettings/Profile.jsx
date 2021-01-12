import {connect} from "react-redux";
import React from "react";
import Preloader from "../../../common/preloader/Preloader";
import styleC from "../../../../styles/Container.module.css";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import EditProfile from "./editProfile/EditProfile";

const ProfileContainer = ({isFetching}) => {
    return isFetching
        ? <div id="container" className={styleC.container}><Preloader/></div>
        : <div id="container" className={styleC.container}><EditProfile/></div>
}

export default compose(
    connect(state => ({
        isFetching: false
    })),
    withAuthRedirect
)(ProfileContainer);