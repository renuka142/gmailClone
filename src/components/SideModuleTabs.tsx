import { IconType } from 'react-icons';
import { useHistory } from 'react-router';
import './SideModuleTabs.css';

const SideModuleTabs: React.FC<{ Icon : IconType ;title : string ; count: number ; isActive : boolean   }> = (props) => { 

    const {Icon, title, count, isActive} = props;

    const history = useHistory();

    const sidebarClickHandler = () => {
        if(title === 'Inbox'){ 
             history.push('/');

       }

        if(title === 'Sent'){
            
         history.push('/sent');
        }

        if(title === 'Trash'){
          history.push('/trash');
        }
    
    }

    // ${isActive && `sidebarTab-Active`}`

        return (
            <div onClick={sidebarClickHandler} className='sidebarTabs'>
                 <Icon />
                 <h4>{title}</h4>
                 <p>{count}</p>
            </div>
        )
}

export default SideModuleTabs;