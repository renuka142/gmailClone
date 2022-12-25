import React from "react";
import './MailList.css';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaEnvelopeOpen } from 'react-icons/fa';
import mailData from '../mock.json';
import { useEffect } from 'react';
import { useState } from 'react';


const InboxMail: React.FC<{ count : number }> = (props) => { 

    const [emails, setEmails] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[mailsPerPage, setMailsPerPage] = useState(50);
    const [nextEnable, setNextEnable] = useState(false);
    const [prevEnable, setPrevEnable] = useState(false);

    const remainingInboxMails = mailData.emails.filter((mail)=> {
      return (
        mail.isDeleted === false && mail.type === "Inbox" 
      )
})

    const totalPages = Math.ceil(remainingInboxMails.length / mailsPerPage);


    const buttonDisableHandler = (currentPage : number) => {
      if (currentPage === 1) {
        setPrevEnable(true);
        setNextEnable(false);
      } else if (currentPage === totalPages) {
        setNextEnable(true);
      } else {
        setNextEnable(false);
        setPrevEnable(false);
      }
    };
  
    useEffect(() => {
      buttonDisableHandler(currentPage);
    }, [currentPage]);


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

    // useEffect(()=> {
    //     console.log(props.newMail);
    //     mailData=props.data;
    // },[mailData,props.data])
    
    

    function deleteEmail(id : number,to : string ,from : string ,isMailedRead : boolean ,isDeleted : boolean ,subject : string ,type : string,description : string) {
        isDeleted = !isDeleted;
        let item = {id,to,from,description,isMailedRead,isDeleted,subject,type}
        fetch(`http://localhost:3000/emails/${id}`, {
          method: "PUT",
          headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
          },
          body:JSON.stringify(item)
        })
        .then((result) => {
          result.json()
          .then((response) => {
            console.warn(response);
            getEmails();
          });
        });
      }
     


    function markAsReadEmail(id : number,to : string ,from : string ,isMailedRead : boolean ,isDeleted : boolean ,subject : string ,type : string,description : string) {
        isMailedRead = !isMailedRead;
        let item = {id,to,from,description,isMailedRead,isDeleted,subject,type}
        fetch(`http://localhost:3000/emails/${id}`, {
          method: "PUT",
          headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
          },
          body:JSON.stringify(item)
        })
        .then((result) => {
          result.json()
          .then((response) => {
            console.warn(response);
            getEmails();
          });
        });
      }


      //Total Inbox Mail Count
      const inboxMailCount = mailData.emails.filter((mail)=>{
    return(
        mail.type === "Inbox" && mail.isDeleted === false
    )
})


    //Pagination             
    const lastMailIndex = currentPage * mailsPerPage;  //3 x 50 = 150
    const firstMailIndex = lastMailIndex - mailsPerPage;   //150 - 50 = 100
   
    const currentVisibleMails =  remainingInboxMails.slice(firstMailIndex, lastMailIndex) ;

    const prevPageHandler = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        setCurrentPage(1);
      }
    }

    const nextPageHandler = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        setPrevEnable(false);
      } else {
        setCurrentPage(totalPages);
      }
    }

    const goToFirstPage = () => {
      setCurrentPage(1);
      setPrevEnable(true);
    }

    const goToLastPage = () => {
      setCurrentPage(totalPages);
      setNextEnable(true);
    }

        return (
            <div className="mailList">
         
                <div className='pages'>

                     <p>{firstMailIndex + 1} - {firstMailIndex + currentVisibleMails.length} of {inboxMailCount.length}</p>
                     <button className='firstPageBtn' onClick={goToFirstPage} disabled={prevEnable}>First</button>
                    <FaAngleLeft onClick={prevPageHandler}  />
                    <FaAngleRight onClick={nextPageHandler}  />
                    <button className='lastPageBtn' onClick={goToLastPage} disabled={nextEnable}>Last</button>
                
                </div>

                <h3>Inbox</h3>
            <div className='all-mails'>
                <div className="mail-left">
                 
                 { currentVisibleMails.map((mail)=> {
                    return (
                        <div >
                        
                    {   mail.isDeleted === false && mail.type === "Inbox" ?
                      <div className = {`mail-box ${mail.isMailedRead && `mail-read`}`} >

                        <div className='from'>
                          <h4>{mail.from}</h4>
                          </div> 
                       
                       <div className='description'>
                         <p>{mail.description}</p>
                        </div>

                        <div className='icons'>

                        <FaTrash onClick={() => deleteEmail(mail.id,mail.to,mail.from,mail.isMailedRead,mail.isDeleted,mail.subject!,mail.type,mail.description)} />
                        <div className='hide'>Delete</div>

                        <FaEnvelopeOpen onClick={() => markAsReadEmail(mail.id,mail.to,mail.from,mail.isMailedRead,mail.isDeleted,mail.subject!,mail.type,mail.description)} />
                       {
                        mail.isMailedRead ?
                          <div className='hide'>Mark Unread</div>  :
                          <div className='hide'>Mark as Read</div> 
                       }
                      </div>
                       
                        </div> : "" 
                        
                        }
                    </div>
                    )
                    })}
                 </div> 
                {/* <div className="mail-mid">
                {mailData.map((mail)=> {

                    return (
                    <>
                        <p>{mail.description}</p>
                        <br />
                        </>
                    )
                    })}
                 </div>  */}
                {/* <div className="mail-right">
                    
                    
                  
                 </div>  */}

                 </div>

            </div>
        )
};

export default InboxMail;