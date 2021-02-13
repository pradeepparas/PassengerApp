import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
// import { withTranslation,useTranslation } from 'react-i18next';

// Material UI
import CallMadeSharpIcon from '@material-ui/icons/CallMadeSharp';

//  Import images
import train1 from '../../components/Drawer/images/train1.svg';
import servicestack from '../../components/Drawer/images/servicestack.svg';
import user_friends from '../../components/Drawer/images/user_friends.svg';
import user_check from '../../components/Drawer/images/user_check.svg';
import rupee from '../../components/Drawer/images/rupee.svg';

import Card from "../../components/Card/Card";
// import * as acitons from '../../../store/actions/index'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
export default function DashBoard(props) {
	// const [t, i18n] = useTranslation('common');
	// useEffect(()=>{
	// 	props.getDashboardCount()
	// },[])

	return (
		<>
			<div className={styles.title}>Dashboard</div>
			{/* <button onClick={() => i18n.changeLanguage('hi')}>Hindi</button> */}

			<div className={styles.grid}>
			{<Card title={'Total Stations'} number="20" icon={train1} link="/station-management" arrow={<CallMadeSharpIcon />} color="#2d62ed" />}
			{<Card title={'Total Users'} arrow={<CallMadeSharpIcon />} link="/users" number="20K" icon={servicestack} color="#7d00b5" />}
			{<Card title={'Total Vendors'} arrow={<CallMadeSharpIcon />} link="/vendors" number="146" icon={user_friends} color="#ff007c" />}
			{<Card title={'Total Services'} number="180" icon={user_check} color="#0a4491" />}
		  	{<Card title={'Total Revenue'} arrow={<CallMadeSharpIcon />} number="256K" link="/revenue" icon={rupee} color="#025e87" />}
		  	{<Card title={"Today's Revenue"} arrow={<CallMadeSharpIcon />} number="2500" icon={rupee} color="#02873d" />}
			</div>
		</>
	);
}

// const mapStateToProps =(state)=>{
//
// 	return{
//
// 		dashboadCount: state.Users.dashboardCount,
//
// 	}
//
// }
//
// const mapDispatchToProps =(dispatch)=>{
//
// 	return {
// 		getDashboardCount: (type) =>
// 			dispatch(acitons.getDashboardCount(type)),
//
// 	}
// }
// export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(Dashboard)
