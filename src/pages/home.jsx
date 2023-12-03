import { Layout, Menu, Button, Typography, Divider, Popconfirm, Avatar, List, message, Switch } from "antd";
import { useEffect, useState } from "react";
import {
    UserOutlined,
    BookOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    HomeOutlined,
    LineChartOutlined
} from '@ant-design/icons';
import { RightOutlined } from '@ant-design/icons';  
import { MdOutlineWarning } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Devices from "./devices";
import '../css/home.css';
import Warning from "../components/warning";
import { v4 as uuidv4 } from 'uuid';
import { database } from "../service/firebase";
import { child, get, ref, onValue, onChildChanged, set, push } from "firebase/database";

const { Header, Sider, Content, Footer } = Layout;

const menuItems = [
    {
        key: '1',
        icon: <HomeOutlined />,
        label: "Nhà thông minh"
    },
    {
        key: '2',
        icon: <BookOutlined />,
        label: "Nhật ký"
    },
]

const data = [
    {
        title: 'B20DCCN461 - Nguyễn Trác Năng',
    },
    {
        title: 'B20DCCN211 - Đàm Trọng Ngọc Hà',
    },
    {
      title: 'B20DCCN139 - Nguyễn Trọng Dũng',
    },
];

const HomePage = () => {    
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');
    const [isFire, setIsFire] = useState(false);
    const [devices, setDevices] = useState([]);
    const [auto, setAuto] = useState(true);

    const devicesRef = ref(database, 'devices');
    const autoRef = ref(database, 'auto');
    const logRef = ref(database, 'logs');

    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogOut = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    const handleClickMenu = (e) => {
        setSelectedKey(e.key);
        if (e.key === '1') {
            navigate('/');
        } else if (e.key === '2') {
            navigate('logs');
        }
    }

    const getCurrentTime = () => {
        const currentDateTime = new Date();

        const hours = currentDateTime.getHours();
        const minutes = currentDateTime.getMinutes();
        const day = currentDateTime.getDate();
        const month = currentDateTime.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
        const year = currentDateTime.getFullYear();

        // Định dạng lại ngày tháng năm theo định dạng yêu cầu
        const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;
        return formattedDateTime;
    }

    useEffect(() => {
        if (user === null) {
            window.location.href = '/login';
        } else {
            onValue(devicesRef, (snapshot) => {
                const data = snapshot.val();
                setDevices(data);
            })
    
            onValue(autoRef, (snapshot) => {
                const data = snapshot.val();
                setAuto(data);
            })
        }
    }, [])

    onChildChanged(devicesRef, (snapshot) => {
        const newData = snapshot.val();
       
        if (newData === 0 && snapshot.ref._path.pieces_[1] === "fireAlarm") {
            const config = {
                content: "Phát hiện cháy ở phòng bếp",
                icon: <MdOutlineWarning color="red" size="20px"/>,
            }
            setIsFire(true);
            message.warning(config);
            setTimeout(() => {
                setIsFire(false);
            }, 10000)

            const newDataRef = push(logRef);
            const newDataKey = newDataRef.key;

            const newLog = {
                id: uuidv4(),
                title: "Có cháy",
                content: "Phát hiện cháy xảy ra tại phòng bếp",
                time: getCurrentTime()
            }

            set(newDataRef, newLog)
            .then(() => {
              console.log('Data added successfully!');
            })
            .catch((error) => {
              console.error('Error adding data:', error);
            });
        }

        onValue(devicesRef, (snapshot) => {
            const data = snapshot.val();
            setDevices(data);
        })
    })

    onChildChanged(autoRef, (snapshot) => {
        const newData = snapshot.val();
        setAuto(newData);
    })

    return (
        <div>
            <Layout className="min-h-screen relative">
                { isFire && <Warning play={isFire} /> }
                <Sider trigger={null} collapsible collapsed={collapsed} className="rela">
                    <div className="flex justify-start items-center mt-2">
                        <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center ml-4">
                            <UserOutlined />
                        </div>
                        { !collapsed &&
                        <div className="ml-5">
                            <Typography className="text-white">Admin</Typography>
                            <Popconfirm
                                onConfirm={handleLogOut}
                                description="Xác nhận đăng xuất?"
                                okButtonProps={{className: "bg-[#1677ff]"}}
                            >
                                <LogoutOutlined className="text-white mr-2"/>
                                <Typography.Link className="!text-white">Đăng xuất</Typography.Link>
                            </Popconfirm>
                        </div>
                        }
                    </div>
                    <Divider className="bg-white my-4"/>
                    <Menu 
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[selectedKey]} 
                        items={[...menuItems]}
                        onClick={handleClickMenu}
                    />
                </Sider>            
                <Layout>
                    <Header className="bg-white px-2">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-base w-16 h-16"
                        />
                    </Header>
                    <Content>
                        <div className="h-screen w-full flex">
                            {location.pathname === "/" && 
                                <Devices 
                                    devices={devices}  
                                    auto={auto}
                                    setAuto={setAuto}
                                    autoRef={autoRef}
                                />}
                            <Outlet />
                            <div className="w-[25%] h-full m-4 flex">
                                <div className='border border-black' />
                                <div className='mt-2 ml-2 w-full'>
                                    <div className='mb-4'>
                                        <RightOutlined className='cursor-pointer'/>
                                        <Typography.Text className='text-2xl font-semibold ml-2'>Danh sách thành viên</Typography.Text>
                                    </div>
                                    <List 
                                        itemLayout="horizontal"
                                        dataSource={data}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar src={`https://res.cloudinary.com/dmllqeqdn/image/upload/v1700903772/5703dcbc998b5cd5059a.jpg`} />
                                                }
                                                title={item.title}
                                            />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </Content>
                    <Footer>
                        <Typography className="text-center">Created by Mad @2023</Typography>
                    </Footer>
                </Layout>    
            </Layout>
        </div>
    )
}

export default HomePage;