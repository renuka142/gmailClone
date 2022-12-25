import './MailboxHeaderStyle.css';

const MailboxHeader = () => {

    var id=Math.random();
    let to=Math.random().toString(36).substring(2,7);;
    let from=Math.random().toString(36).substring(2,9);;
    let isMailedRead=false;
    let isDeleted=false;
    let subject=Math.random().toString(36).substring(2,20);;
    let type="Inbox";
    let description=Math.random().toString(36).substring(2,30);;

    // const mailObject = {
    //     "id":Math.random(),
    //     "to":"Me",
    //     "from":"Tejasvi",
    //     "isMailedRead":false,
    //     "isDeleted":false,
    //     "type":"Inbox",
    //     "description":"Inspection of Right Sternoclavicular Joint, Percutaneous Endoscopic Approach",
    //     "subject":"Laceration of heart with hemopericardium"
    //  }

    function newMailhandler() {
    
        let item = {id,to,from,description,isMailedRead,isDeleted,subject,type}
        fetch('http://localhost:3000/emails', {
          method: "POST",
          headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
          },
          body:JSON.stringify(item)
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
          });
        });
      }


    return (
        <div className="header">
            <div className="header-left">
                <img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" alt="Mail Logo" />
                <h2 className='heading'>My Mailbox</h2>
            </div>

            <div className='header-middle'>
                <button id='newMail' onClick={newMailhandler} className='btn btn-primary'>Receive New Mail</button>
            </div>
            
        </div> 
    )
}

export default MailboxHeader;