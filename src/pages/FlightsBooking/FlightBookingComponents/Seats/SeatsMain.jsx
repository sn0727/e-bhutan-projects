import React, { useEffect, useState } from 'react';
import SeatsList from './SeatsComponents/SeatsList';
import MealList from './SeatsComponents/MealList';
import BaggageList from './SeatsComponents/BaggageList';
import { apiData, formStateAtom, ipAddressSave } from '../../atom/atom';
import { useRecoilValue } from 'recoil';
import TicketButton from '../../../../components/Button/TicketButton';
import { useSelector } from 'react-redux';
import { APIRequest, ApiUrl } from '../../../../utils/api';

const TabBar = ({ tabs, initialTab, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <div className="tab-bar">
            {tabs.map((tab) => (
                <div
                    key={tab}
                    className={`tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};


const SeatsMain = ({ setIdComponent }) => {
    const [selectedTab, setSelectedTab] = useState('Seat');
    const ResultIndex = useSelector(state => state.flights.ResultIndex);
    const ipAddress = useRecoilValue(ipAddressSave)
    const saveResponseData = useRecoilValue(apiData)
    const [isLoading, setisLoading] = useState(false)


    // const [selectedUserDetail, setSelectedUserDetail] = useRecoilValue(saveUserDetails)

    const handleTabChange = (tab) => {
        setSelectedTab(tab)
    };


    const SendRequest = (type) => {
        setisLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.bookingGetSSR,
            body: {
                "EndUserIp": ipAddress,
                "TraceId": saveResponseData?.Response?.TraceId,
                "ResultIndex": ResultIndex[type]
            }
        }
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res seats')
                setisLoading(false)
            },
            err => {
                console.log(err, '====================== err seats')
                setisLoading(false)
            }
        )
    }

    useEffect(() => {
        if (ResultIndex?.departure) {
            SendRequest('departure')
        }
        if (ResultIndex?.return) {
            SendRequest('return')
        }
    }, [])

    return (
        <>
            <div>
                <h3 className='add-travel-detail-title'>Flight booking details</h3>
                <div>
                    <TicketButton
                        lable='Skip to payment'
                        isActive={true}
                        onClick={() => setIdComponent(6)}
                    />
                </div>
                <div className='my-4 mian-box-clas'>
                    <div className='tabButton'>
                        <TabBar
                            tabs={['Seat', 'Meal', 'Baggage']}
                            initialTab={selectedTab}
                            onTabChange={handleTabChange}
                        />
                    </div>
                    {/* Your content for each tab goes here */}
                    {/* {selectedTab === 'Seat' && <SeatsList />}
                    {selectedTab === 'Meal' && <MealList />}
                    {selectedTab === 'Baggage' && <BaggageList />} */}
                </div>
            </div>
        </>
    )
}

export default SeatsMain