import mailData from '../../src/MOCK_DATA.json';
import './MailList.css';
const SentMail = () => {
    return (
        <div>
            <h3 className='sent-title'>Sent</h3>
            <div className="sent-mail-left ">
                 {mailData.map((mail)=> {

                    return (
                        <div>
                    {mail.isDeleted === false && mail.type === "Sent" ? 
                    <div  className='sent-mail-box'>
                        <div className='to'>
                        <h4>To: {mail.to}</h4> 
                        </div>

                        <div className='description'>
                        <p>{mail.description}</p>
                        </div>

                         </div> : "" 
                         }
                    
                    </div>
                    )
                    })}
                 </div> 
        </div>
    )
};

export default SentMail;