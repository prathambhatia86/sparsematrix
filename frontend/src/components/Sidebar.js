import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from "wouter";
import { MdPersonSearch } from "react-icons/md";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { IoReturnUpBackSharp } from "react-icons/io5";

const Sidebars = ({ setCurrent }) => {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '15%' }}>
            <div id="header" className='m-0 p-0' style={{
                height: '100vh', width: '100%', backgroundColor: 'rgb(199,229,249)', transition: 'width 0.3s ease', float: 'left'
            }}>
                <Sidebar collapsedWidth='100%' width='100%'>
                    <div style={{ marginTop: '15px', height: '100vh' }}>
                        <Menu iconShape="square">
                            <MenuItem icon={<IoReturnUpBackSharp />} component={<Link href='../'></Link>}>Go back</MenuItem>
                            <MenuItem active={true} icon={<MdPersonSearch />} onClick={() => setCurrent(0)} >
                                Find Merchants
                            </MenuItem>
                            <MenuItem icon={<FaMagnifyingGlassLocation />} onClick={() => setCurrent(1)}>Check</MenuItem>

                        </Menu>
                    </div>
                </Sidebar >
            </div >
        </div >
    );
};
export default Sidebars;
