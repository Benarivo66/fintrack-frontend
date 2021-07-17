import React, { useEffect, useState  } from 'react';
import Sidebar from '../components/sideBar';
import Navbar from '../components/navBar';
import classes from "../css/Wrapper.module.css";
import { Container, Card } from 'react-bootstrap';
import walletIcon from '../images/wallet.png';
import calculatorIcon from '../images/calculator.png';
import deniedIcon from '../images/denied.png';
import moneyIcon from '../images/money.png';
import waitingIcon from '../images/pending.png';
import cards from '../css/analytics.module.css';
import axiosInstance from '../utils/axiosInstance';
import { routes } from '../../constants';
import { PieChart } from 'react-minimal-pie-chart';
import jwtDecode from 'jwt-decode';

let cookie = document.cookie;
    let token = cookie.split('=')[1];
let decoded: any;
    
try {
  decoded = jwtDecode(token);
} catch (err) {
  console.log(err);
}

function AdminAnalytics() {

  let obj = {
			pendingNumber:0,
			resolvedNumber:0,
			canceledNumber:0,
			approvedNumber:0,
			total: 0,
			invoiceNumber: 0,
			loanNumber:0,
			stipendNumber:0,
			refundsNumber:0,
			upfrontNumber:0,
			otherNumber:0
  }
  
  let userDataObj = {
    countOnlyUsers:0,
		countAdmin:0,
		countAgent:0,
		countUsers:0
  }
  
  let [data, setData] = useState(obj);
  let [userData, setUserData] = useState(userDataObj)

  useEffect(() => {
        const getRequestsByStatus = async () => {
            try {
              let { data } = await axiosInstance().get(routes.ADMIN_ANALYTIC);
              setData(data.data)
              setUserData(data.userData);

            } catch (error) {
                console.log('this is an error', error);
            }   
    }
        getRequestsByStatus();
  }, [])
  
    
  const { pendingNumber, resolvedNumber, canceledNumber, approvedNumber,
          invoiceNumber, loanNumber, stipendNumber, refundsNumber,
    upfrontNumber, otherNumber } = data;

  const {countOnlyUsers, countAdmin, countAgent } = userData;
  
  let statusChartData = [
  { title: 'Approved', value: approvedNumber, color: 'rgb(110, 212, 110)' },
  { title: 'Canceled', value: canceledNumber, color: 'rgb(226, 70, 83)' },
  { title: 'Resolved', value: resolvedNumber, color: 'rgb(61, 105, 187)' },
  { title: 'Pending', value: pendingNumber, color: 'orange' }
  ];
  
  let typeChartData = [
  { title: 'refunds', value: refundsNumber, color: 'rgb(110, 212, 110)' },
  { title: 'invoice', value: invoiceNumber, color: 'rgb(226, 70, 83)' },
  { title: 'loan', value: loanNumber, color: 'rgb(61, 105, 187)' },
  { title: 'stipend', value: stipendNumber, color: 'orange' },
  { title: 'upfront', value: upfrontNumber, color: 'rgb(177, 177, 57)' },
  { title: 'other', value: otherNumber, color: 'rgb(51, 102, 109)' }
  ];
  
  let userCategoryChartData = [
    { title: 'users', value: countOnlyUsers, color: 'rgb(61, 105, 187)'},
    { title: 'agents', value: countAgent , color: 'rgb(177, 177, 57)' },
    {title: 'admin', value: countAdmin, color:'rgb(51, 102, 109)'}
  ]

    return (
      <div className="App">
      <div className={classes.wrapper}>
        <Sidebar />
        <div className="content" style={{ width: "100%" }}>
            <Navbar />
            <div>
            <div><h5 className={cards.user}>Hello {decoded.lastName}</h5></div>
            <Container className={cards.analyticsContent}>
              
                <Card className={cards.normalCard}>
                  <Card.Img variant="top" src={walletIcon} className={cards.img}/>
                  <Card.Body>
                  <Card.Title><h5 style={{textAlign:"center"}}>{data.total}</h5></Card.Title>
                    <Card.Text>Requests</Card.Text>
                  </Card.Body>
                  <Card.Img></Card.Img>
              </Card>
              
              <Card className={cards.normalCard}>
                  <Card.Img variant="top" src={calculatorIcon} className={cards.img}/>
                  <Card.Body>
                  <Card.Title><h5 style={{textAlign:"center"}}>{ data.approvedNumber }</h5></Card.Title>
                    <Card.Text>Approved</Card.Text>
                  </Card.Body>
                  <Card.Img></Card.Img>
              </Card>
              
              <Card className={cards.normalCard}>
                  <Card.Img variant="top" src={deniedIcon} className={cards.img}/>
                  <Card.Body>
                  <Card.Title><h5 style={{textAlign:"center"}}>{ canceledNumber}</h5></Card.Title>
                    <Card.Text>Canceled</Card.Text>
                  </Card.Body>
                  <Card.Img></Card.Img>
              </Card>
              
              <Card className={cards.normalCard}>
                  <Card.Img variant="top" src={moneyIcon} className={cards.img}/>
                  <Card.Body>
                  <Card.Title ><h5 style={{textAlign:"center"}}>{ resolvedNumber }</h5></Card.Title>
                    <Card.Text>Resolved</Card.Text>
                  </Card.Body>
                  <Card.Img></Card.Img>
              </Card>
              
              <Card className={cards.normalCard}>
                  <Card.Img variant="top" src={waitingIcon} className={cards.img}/>
                  <Card.Body>
                  <Card.Title><h5 style={{textAlign:"center"}}>{pendingNumber }</h5></Card.Title>
                    <Card.Text>Pending</Card.Text>
                  </Card.Body>
                  <Card.Img></Card.Img>
              </Card>
              
                {/*Request Status*/}
              <Card className={cards.largeCard}>
                <h5 className={cards.requestStatus}>Request Status</h5>
                  <div className={cards.pieChartWrapper}>

                  <div className={cards.pieChart}>
                    <PieChart lineWidth={50} data={statusChartData}/>
                  </div>

                  <div className={cards.circles}>
                  <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(226, 70, 83)"}} className={cards.circle}></div> <span>canceled</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "orange"}} className={cards.circle}></div> <span>pending</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(61, 105, 187)"}} className={cards.circle}></div> <span>resolved</span></div>
                <div className={cards.circleHolderDiv} ><div style={{ backgroundColor: "rgb(110, 212, 110)" }} className={cards.circle}></div> <span>approved</span></div>
                </div>
                  
                </div>
                </Card>

                {/* Request Type */}
                <Card className={cards.largeCard}>
                <h5 className={cards.requestStatus}> Request Type</h5>

                  <div className={cards.pieChartWrapper}>
                    
                    <div className={cards.pieChart}>
                    <PieChart lineWidth={50} data={typeChartData}/>
                  </div>

                  <div className={cards.circles}>
                  <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(61, 105, 187)"}} className={cards.circle}></div> <span>loan</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(110, 212, 110)"}} className={cards.circle}></div> <span>refunds</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(226, 70, 83)"}} className={cards.circle}></div> <span>invoice</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "orange"}} className={cards.circle}></div> <span>stipend</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(177, 177, 57)"}} className={cards.circle}></div> <span>upfront</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(51, 102, 109)"}} className={cards.circle}></div> <span>other</span></div>
                </div>
                  
                </div>
                </Card>

                {/* User Category */}
                <Card className={cards.largeCard}>
                <h5 className={cards.requestStatus}> User Category</h5>

                  <div className={cards.pieChartWrapper}>
                    
                    <div className={cards.pieChart}>
                    <PieChart lineWidth={50} data={userCategoryChartData}/>
                    </div>

                <div className={cards.circles}>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(61, 105, 187)"}} className={cards.circle}></div> <span>users</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(177, 177, 57)"}} className={cards.circle}></div> <span>agents</span></div>
                <div className={cards.circleHolderDiv} ><div style={{backgroundColor: "rgb(51, 102, 109)"}} className={cards.circle}></div> <span>admin</span></div>
                </div>
                  
                </div>
                </Card>

              </Container>
              </div>

        </div>
      </div>
    </div>
  )  
}

export default AdminAnalytics;




