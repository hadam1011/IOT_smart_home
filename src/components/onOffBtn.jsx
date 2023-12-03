import { Switch, Typography, message } from 'antd';
import { useState, useEffect } from 'react';
import { set, ref, get, child, push } from 'firebase/database';
import { database } from '../service/firebase';
import { v4 as uuidv4 } from 'uuid';

const OnOffBtn = (props) => {
    const [on ,setOn] = useState();
    const databaseRef = ref(database);

    const logRef = ref(database, 'logs');
    
    const dict = {
        'frontYard': "Sân trước",
        "room": "Phòng khách",
        "canopy": "Mái che",
        "door": "Cửa chính",
        "ON": "tắt",
        "OFF": "bật",
        "OPEN": "đóng",
        "CLOSE": "mở"
    }

    useEffect(() => {
        const icon  = document.getElementById(`${props.room}`);
        if (props.state === "CLOSE" || props.state === "OFF") {
            icon.classList.remove('text-purple-500');
        } else {    
            icon.classList.add('text-purple-500');
        }
    }, [])

    useEffect(() => {
        setOn(props.state);
        const icon  = document.getElementById(`${props.room}`);
        if (props.state === "CLOSE" || props.state === "OFF") {
            icon.classList.remove('text-purple-500');
        } else {    
            icon.classList.add('text-purple-500');
        }
    }, [props])

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

    const handleClickBtn = () => {
        if (!props.auto) {
            setOn(!on);
            const icon  = document.getElementById(`${props.room}`);

            if (props.room === "door") {
                if (on === "CLOSE") setOn("OPEN");
                if (on === "OPEN") setOn("CLOSE");
                message.info(`Cửa chính đã được ${dict[on]}`);

                const newDataRef = push(logRef);
                const newDataKey = newDataRef.key;

                const newLog = {
                    id: uuidv4(),
                    title: on === "CLOSE" ? "Mở cửa" : "Đóng cửa",
                    content: on === "CLOSE" ? "Cửa đã được mở" : "Cửa đã được đóng",
                    time: getCurrentTime()
                }
    
                set(newDataRef, newLog)
                .then(() => {
                  console.log('Data added successfully!');
                })
                .catch((error) => {
                  console.error('Error adding data:', error);
                });
            } else {
                if (on === "ON") setOn("OFF");
                if (on === "OFF") setOn("ON");
                if (props.room === "canopy"){
                    message.info(`Mái che đã được ${dict[on]}`);
                    const newDataRef = push(logRef);
                    const newDataKey = newDataRef.key;

                    const newLog = {
                        id: uuidv4(),
                        title: on === "OFF" ? "Mở mái che" : "Đóng mái che",
                        content: on === "OFF" ? "Mái che đã được mở" : "Mái che đã được đóng",
                        time: getCurrentTime()
                    }
        
                    set(newDataRef, newLog)
                    .then(() => {
                      console.log('Data added successfully!');
                    })
                    .catch((error) => {
                      console.error('Error adding data:', error);
                    });
                } else{
                    message.info(`Đèn đã được ${dict[on]} tại ${dict[props.room]}`);
                    const newDataRef = push(logRef);
                    const newDataKey = newDataRef.key;

                    const newLog = {
                        id: uuidv4(),
                        title: on === "OFF" ? "Bật đèn" : "Tắt đèn",
                        content: on === "OFF" ? `Đèn đã được ${dict[on]} tại ${dict[props.room]}` : `Đèn đã được ${dict[on]} tại ${dict[props.room]}`,
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
            }

            if (on === "CLOSE" || on === "OFF") {
                icon.classList.add('text-purple-500');
            } else {    
                icon.classList.remove('text-purple-500');
            }
        
            if (props.room === "room"){
                get(child(databaseRef, 'devices/led/room')).then(snapshot => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const dataRef = ref(database, 'devices/led/room');
                        set(dataRef, data === 0 ? 1 : 0);
                    }
                }).catch(e => {
                    console.error(e);
                })
            } else if (props.room === "frontYard") {
                get(child(databaseRef, 'devices/led/frontYard')).then(snapshot => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const dataRef = ref(database, 'devices/led/frontYard');
                        set(dataRef, data === 0 ? 1 : 0);
                    }
                }).catch(e => {
                    console.error(e);
                })
            } else {
                get(child(databaseRef, `devices/${props.room}`)).then(snapshot => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const dataRef = ref(database, `devices/${props.room}`);
                        set(dataRef, data === 0 ? 1 : 0);
                    }
                }).catch(e => {
                    console.error(e);
                })
            }
        }
    }

    return (
        <div className='max-w-fit rounded-xl shadow-lg bg-white mb-6'>
            <div className='p-2 relative w-36'>
                <Typography.Text className='font-semibold'>{on}</Typography.Text>
                {props.icon}
                {<Typography.Text>{dict[props.room]}</Typography.Text>}
                <Switch 
                    onClick={handleClickBtn}
                    className='absolute top-3 right-2 bg-gray-600'
                    size='small'
                    checked={on === "ON" || on === "OPEN" ? true : false}
                />
            </div>
        </div>
    )
}
 
export default OnOffBtn;