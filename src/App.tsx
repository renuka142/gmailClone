import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css';
import MailboxHeader from './components/MailboxHeader';
import SentMail from './components/SentMail';
import SideModule from './components/SideModule';
import TrashMail from './components/TrashMail';
import mailData from '../src/mock.json';
import InboxMail from './components/InboxMail';

function App() {

  const unreadCount = mailData.emails.filter((mail)=> {
    return (
        mail.isMailedRead === false && mail.type === "Inbox" && mail.isDeleted === false
    )
})

const sentCount = mailData.emails.filter((mail)=> {
  return (
    mail.type === "Sent" && mail.isDeleted === false
  )
})


const trashCount = mailData.emails.filter((mail)=> {
  return (
   mail.isDeleted === true
  )
})


  return (
    <div className="App">
      <MailboxHeader />


      {/* below div of app-content is constructed to make sidebar have only 200px grid space, its css written in App.css */}
      <div className='app-content'>
      
      <SideModule unreadCount={unreadCount.length} sentCount={sentCount.length} trashCount={trashCount.length} /> 
      
      <Switch>
      
      <Route exact path='/' >
      <InboxMail count={unreadCount.length} /> 
      </Route>

      <Route exact path='/sent'>
          <SentMail />
      </Route>

      <Route path='/trash' exact>
        <TrashMail />
      </Route>
      
      </Switch>
      
      </div>
  
    </div>
  );
}

export default App;
