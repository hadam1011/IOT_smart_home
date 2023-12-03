import { Alert, Table } from "antd";
import { useEffect, useState } from 'react';
import { database } from "../service/firebase";
import { child, get, ref } from "firebase/database";

const Log = () => {
    const [data, setData] = useState();
    const databaseRef = ref(database);

    useEffect(() => {
        get(child(databaseRef, 'logs')).then(snapshot => {
            if (snapshot.exists()) {
                const newArr = Object.keys(snapshot.val()).map((key) => {
                    return {
                      id: key,
                      ...snapshot.val()[key],
                    };
                });
                setData(newArr);
            }
        }).catch(e => {
            console.error(e);
        })
    }, [])

    const columns = [
        {
            title: 'Thông báo',
            dataIndex: 'notification',
            render:(_, record) => {
                return (
                    <Alert 
                        message={record.title}
                        description={record.content}
                        type={record.title === "Có cháy" ? "error" : "info"}
                    />
                )
            }
        },
        {
            title: "Thời gian",
            dataIndex: 'time',
            key: 'time'
        }
    ]
    
    return (
        <div className="w-[75%] h-full m-4">
            <Table
                rowKey={record => record.time}
                dataSource={data}
                columns={columns}
            />
        </div>
    )
}

export default Log;
