import React,{useState} from 'react'
import DarkMode from './DarkMode'
import Notification from './Notification'
import SearchBar from './SearchBar'
import Message from './Messag'
import Language from './Language'
import Users from './User'
import { UL } from '../../../AbstractElements'
import Maximizes from './Maximize'
import Bookmark from "./Bookmark/index"
const RightHeader = () => {
  const [active, setActive] = useState()
  return (
    <div className="simple-list nav-right col-1 pull-right right-header p-0">
    <UL attrUL={{className:"  nav-menus"}} >
      {/* <SearchBar />
      <Bookmark/>
      <Notification active={active} setActive={setActive}/>
      <Message active={active} setActive={setActive}/>
      <Language/> */}
      <DarkMode/>
      <Maximizes/>
    <Users/>
    </UL>
  </div>
  )
}

export default RightHeader