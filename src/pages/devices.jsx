import { RightOutlined } from '@ant-design/icons';
import { Typography, Switch } from 'antd';
import { TbBulb } from "react-icons/tb";
import { BsDoorClosed } from "react-icons/bs";
import { FaPeopleRoof } from "react-icons/fa6";
import OnOffBtn from '../components/onOffBtn';
import { useEffect, useState } from 'react';
import { set } from 'firebase/database';

const Devices = ({ devices, auto, setAuto, autoRef, devicesRef }) => {
    const iconConfig = {
        fontSize: "30px",
        className: "my-2 icon"
    }

    const [ledList, setLedList] = useState([]);

    useEffect(() => {
        if (devices.led !== undefined) {
            setLedList([
                {
                    id: "frontYard",
                    state: devices.led.frontYard === 0 ? "OFF" : "ON",
                    icon: <TbBulb {...iconConfig} id='frontYard'/>
                },
                {
                    id: "room",
                    state: devices.led.room === 0 ? "OFF" : "ON",
                    icon: <TbBulb {...iconConfig} id='room'/>
                },
            ])
        }
    }, [devices, auto]);

    const handleSwitch = () => {
        setAuto(!auto);
        set(autoRef, !auto);
    }

    return (
        <div className="relative w-[75%] h-full m-4">
            <div className='mb-4 absolute right-0 top-0'>
                <Typography.Text className='font-semibold text-2xl'>Tính năng tự động</Typography.Text>
                <Switch
                    onClick={handleSwitch}
                    className=' bg-gray-600 ml-4'
                    size='small'
                    checked={auto}
                />
            </div>

            {/* LED */}
            <div className='mb-4'>
                <RightOutlined className='cursor-pointer'/>
                <Typography.Text className='text-2xl font-semibold ml-2'>Hệ thống đèn LED</Typography.Text>
            </div>
            <div className='ml-2 flex justify-start items-center gap-5'>
                {ledList.map(led => {
                    return (
                        <OnOffBtn 
                            state={led.state} 
                            room={led.id} 
                            icon={led.icon} 
                            key={led.id}
                            auto={auto}
                        />
                    )
                })}
            </div>

            {/* Cửa chính */}
            <div className='mb-4'>
                <RightOutlined className='cursor-pointer'/>
                <Typography.Text className='text-2xl font-semibold ml-2'>Cửa chính</Typography.Text>
            </div>
            <OnOffBtn 
                state={devices.door !== undefined ? devices.door === 0 ? "CLOSE" : "OPEN" : 'CLOSE'} 
                room="door"
                icon={<BsDoorClosed {...iconConfig} id='door'/>}   
                auto={auto} 
            />

            {/* Mái che */}
            <div className='mb-4'>
                <RightOutlined className='cursor-pointer'/>
                <Typography.Text className='text-2xl font-semibold ml-2'>Mái che</Typography.Text>
            </div>
            <OnOffBtn 
                state={devices.canopy !== undefined ? devices.canopy === 0 ? "ON" : "OFF" : 'OFF'} 
                room="canopy"
                icon={<FaPeopleRoof {...iconConfig} id='canopy'/>}
                auto={auto}
             />
        </div>
    ) 
}

export default Devices;