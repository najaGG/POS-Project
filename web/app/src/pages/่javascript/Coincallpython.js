import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CheckCoin = ({ coins }) => {
    const [count, setCount] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [coin, setCoin] = useState(coins); // ตั้งค่าเริ่มต้นเป็น coins

    useEffect(() => {
        setCoin(coins); // อัปเดตค่า coin หาก props coins เปลี่ยน
    }, [coins]);

    useEffect(() => {
        let intervalId;

        if (isChecking) {
            const fetchStatus = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/status');
                    const { status } = response.data;

                    if (status === 1) {
                        setCount((prevCount) => {
                            const newCount = prevCount + 10;
                            if (newCount >= coin) {
                                setIsChecking(false);
                                console.log(`Count has reached or exceeded ${coin}. Stopping.`);
                                return newCount;
                            }
                            return newCount;
                        });
                    }
                } catch (e) {
                    console.error('Error fetching status:', e);
                }
            };

            intervalId = setInterval(fetchStatus, 500);
        }

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [isChecking, coin]); // เรียกใช้ useEffect เมื่อ isChecking หรือ coin เปลี่ยน

    useEffect(() => {
        // เรียกใช้ startChecking ทันทีเมื่อคอมโพเนนต์ถูกโหลด
        const startChecking = () => {
            setCount(0); // รีเซ็ตค่า count
            setIsChecking(true);
        };

        startChecking();
    }, []);

    return (
        <div>
            <p>Current Count: {count}</p>
        </div>
    );
};
