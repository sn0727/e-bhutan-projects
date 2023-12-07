import React from 'react'
import { FaAngleRight } from 'react-icons/fa6';
import { IoFastFoodOutline } from "react-icons/io5";
import { formStateAtom } from '../../../atom/atom';
import { useRecoilValue } from 'recoil';

const MealList = () => {
  const formState = useRecoilValue(formStateAtom);
  return (
    <div>
      <div className='userNmae-list'>
        <div className='listName-rr'>
          {
            formState?.map((useNaem, index) => (
              <div className='userName-dd new-userName-dd'>
                <span><b>Mr {useNaem?.fistname} {useNaem?.lastname} </b></span>
                <span>Add Meal</span>
              </div>
            ))
          }

          {/* <div className='userName-dd new-userName-dd'>
            <span><b>Mr Mohd Alam</b></span>
            <span>Add Meal</span>
          </div> */}
        </div>
      </div>
      <div className="mealListData">
        {
          [1, 2, 3, 4].map(() => (
            <div className="col-sd mealListData-rs">
              <div className="dsfbsdb-dsfsdbjfb">
                <IoFastFoodOutline className='food-icon' />
                <div className='heekj-sdfsdkdsk'>
                  <p>SEA FOOD MEAL</p>
                  <p>&#8377; 230</p>
                </div>

                <div>
                  <div className='card'>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      <button onClick={() => alert('click')} style={{ padding: '5px 10px' }}>-</button>
                      <input
                        type="number"
                        value={1}
                        min="1"
                        max="9"
                        style={{ width: '40px', textAlign: 'center', margin: '0 10px' }}
                        readOnly
                      />
                      <button onClick={() => alert('click')} style={{ padding: '5px 10px' }}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MealList