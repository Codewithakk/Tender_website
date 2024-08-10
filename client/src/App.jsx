import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Tender_create from './components/tender_create'
import TenderList from './components/TenderList';
import TenderDetail from './components/TenderDetail';
import BidManagement from './components/BidManagement';
import NavBar from './components/NavBar';
import UserPanel from './components/userview';
import BidList from './components/BidList'
import BidDetail from './components/bid_details';
import BidForm from './components/BidForm';
import Tender from './components/tender';
import HomePage from './components/Home';
import Tenderview from './components/tendersview';
import QuotationList from './components/User_quots';
import Bidstatus from './components/Bidstatus'

function App() {
  return (
    <Router>
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />
      
      {/* Admin Panel routes */}
      <Route path="/admin" element={<AdminPanel />}/>
        <Route path="/admin/tender-management" element={<Tender />}>
        </Route>
          <Route path="/admin/tender-management/view" element={<TenderList />} />
         <Route path="/admin/tender-management/create" element={<Tender_create />} />
        
        <Route path="/admin/bid-management" element={<BidList />}>
        </Route>
          <Route path="/admin/bid-management/create" element={<BidManagement />} />
          <Route path="/admin/bid-management/view" element={<BidForm/>} />
         <Route path="/admin/bid-management/status" element={<BidDetail />} />
       
      {/* User Panel routes */}
      <Route path="/user" element={<UserPanel />}>
        {/* Define nested routes for the user panel if needed */}
      </Route>

      {/* Public routes */}
      <Route path="user/tenders" element={<Tenderview />} />
      <Route path="user/quotations" element={<QuotationList />} />
      <Route path="user/bids" element={<BidManagement />} />
    </Routes>
  </Router>
);
}
export default App;
