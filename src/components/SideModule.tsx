import './SideModule.css';
import { FaInbox } from "react-icons/fa";
import { FaPaperPlane } from 'react-icons/fa';
import {FaTrash} from 'react-icons/fa';
import SideModuleTabs from './SideModuleTabs';


const SideModule: React.FC<{ unreadCount : number; sentCount : number ;trashCount : number }> = (props) => { 

    // const unreadCount = mailData.filter((mail)=> {
    //     return (
    //         mail.isMailedRead === false && mail.type === "Inbox" && mail.isDeleted === false
    //     )
    // })

        // console.log(unreadCount);

        return (
            <div className="sidebar">
          
                 <SideModuleTabs Icon={FaInbox} title="Inbox" count={props.unreadCount} isActive ={false} /> 
                 <SideModuleTabs Icon={FaPaperPlane} title="Sent" count={props.sentCount} isActive={false} /> 
                 <SideModuleTabs Icon={FaTrash} title="Trash" count={props.trashCount} isActive={false} /> 
                
            </div>
        )
}

export default SideModule;