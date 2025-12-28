import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import DS from './dashboard/dashboard';
import DashboardContent from './dashboard/pages/DashboardContent';
import InsertUser from './dashboard/pages/inseruser';
import { User } from './dashboard/pages/Displayuser';
import Analysis from './dashboard/pages/Analysis';
import { DisplayAnalysis } from './dashboard/pages/Displayanalysis';
import { DisplayModel } from './dashboard/pages/DisplayModel';


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<DS/>}>
      <Route path="/dashboard/dashboardContent" element={<DashboardContent/>}/>
      <Route path="/dashboard/insertuser" element={<InsertUser/>}/>
      <Route path="/dashboard/displayuser" element={<User/>}/>
      <Route path="/dashboard/analysis" element={<Analysis/>}/>
      <Route path="/dashboard/displayanalysis" element={<DisplayAnalysis/>}/>
      <Route path="/dashboard/displaymodel" element={<DisplayModel/>}/>
      
      
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
