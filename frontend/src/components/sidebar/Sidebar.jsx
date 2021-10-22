import "./sidebar.css";
import {
  RssFeed,
  Chat,
  School,
   PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
//     <span id="grid" onClick={() => this.handleViewBtnClick('first-id')}> 
//     <i className="fa fa-th" ></i>
// </span> 
// <span id="list" onClick={() => this.handleViewBtnClick('second-id')}> 
//     <i className="fa fa-align-justify" ></i>
// </span>
/* <button onClick={()=>{props.history.push('/link')}} >Press</button> */
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" type="button"
    onClick={(e) => { e.preventDefault(); window.location.href='http://google.com'; }} />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='http://localhost:3000/messenger';
      }}>
            <Chat className="sidebarIcon"  />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='https://www.youtube.com/';
      }}>
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='http://google.com';
      }}>
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='http://google.com';
      }}/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='http://google.com';
      }}/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='http://google.com';
      }}/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='https://www.facebook.com/careers/jobs/';
      }}/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='https://git.generalassemb.ly/SG-SEI-31';
      }}/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
