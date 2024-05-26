import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import './Todo.css';

export default function Todo() {
    return (
        <div className='authenticated-container'>
            <Nav />
            <ProfileCard />
            <Outlet />
        </div>
    );
}
