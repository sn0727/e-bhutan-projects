import React from 'react'
import { formStateAtom } from '../../../atom/atom';
import { useRecoilValue } from 'recoil';
import { IoAdd } from "react-icons/io5";

const BaggageList = () => {
  
  const formState = useRecoilValue(formStateAtom);
  return (
    <div>
      <div className='userNmae-list'>
        <div className='listName-rr mb-3'>
          {
            formState?.map((useNaem, index) => (
              <div className='userName-dd new-userName-dd'>
                <span><b>Mr {useNaem?.fistname} {useNaem?.lastname} </b></span>
                <span>Add Meal</span>
              </div>
            ))
          }
        </div>
        <div className="mealListData">
          {
            [1, 2, 3, 4].map(() => (
              <div className="col-sd mealListData-rs">
                <div className="dsfbsdb-dsfsdbjfb">
                  <div className='heekj-sdfsdkdsk'>
                    <p><span class="IGAQK">Excess Baggage 3 Kg  at  ₹1,350</span></p>
                  </div>

                  <div>
                    <div className='card'>
                      <div style={{ display: 'flex', alignItems: 'center' }} >
                        <button onClick={() => alert('click')} style={{ padding: '5px 10px', display: 'flex', alignItems: 'center' }}><IoAdd /> Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BaggageList