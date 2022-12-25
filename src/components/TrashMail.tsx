import { useEffect, useState } from 'react';
import mailData from '../../src/mock.json';
import './MailList.css';
const TrashMail = () => {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        getEmails();
      }, []);
    
      function getEmails() {
        fetch("http://localhost:3000/emails").then((result) => {
          result.json().then((response) => {
            setEmails(response);
          });
        });
      }
    

    return (
        <div>
          <h3 className='trash-title'>Trash</h3>
            <div className="trash-mail-left">
                 {mailData.emails.map((mail)=> {

                    return (
                        <>
                    {  
                        mail.isDeleted === true ? 
                      <div className={`trash-mail-box ${mail.isMailedRead && `mail-read`}`}>
                      <div className='from'> 
                         <h4>{mail.from}</h4> 
                         </div>

                         <div className='description'>
                        <p>{mail.description}</p> 
                        </div>
                        
                    </div> : ""
                        
                  }
                    </>
                    )
                    })}
                 </div> 
        </div>
    )
};

export default TrashMail;