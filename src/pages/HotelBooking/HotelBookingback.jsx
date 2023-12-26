<div className='flight-ticket-outer mb-5 mt-0'>
                <div className='card-box'>
                    <div className='flight-ticket-inner py-3'>
                        <div className='ticket-button-group'>
                            <TicketButton lable={'One Way'} isActive={Tab === 1 ? true : false} onClick={() => setTab(1)} />
                            <TicketButton lable={'Round Trip'} isActive={Tab === 2 ? true : false} onClick={() => setTab(2)} />
                        </div>
                        <div>
                            <div className='flight-input-from-to my-4'>
                                <div className='w-100' style={{ width: '100%' }}>
                                    <p className='ticket-gray-text text-left'>Where are you going?</p>
                                    <p className='ticket-gray-bold-text'>{fromValue?.title}</p>
                                    {/* <input type='text' name='from' value={'Delhi'} className='ticket-gray-text' /> */}
                                    <Autocomplete
                                        {...defaultProps}
                                        id="disable-close-on-select"
                                        clearOnEscape
                                        value={fromValue}
                                        onChange={(event, newValue) => {
                                            setFromValue(newValue); // Update the selected option when an option is selected
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Where are you going?" variant="standard" />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='flight-input-from-to my-4 gap-10'>
                                <div className='flex-fill'>
                                    <p className='ticket-gray-text text-left'>Departure Date</p>
                                    <div className='date-picker-parent border-underline pt-1'>
                                        <DatePickerCustom setStartDate={setStartDate} startDate={startDate} />
                                    </div>
                                </div>

                                <div className='flex-fill'>
                                    <p className='ticket-gray-text text-right'>Return Date</p>
                                    <div className='date-picker-parent right border-underline pt-1'>
                                        <DatePickerCustom2 setReturntDate={setReturntDate} returnDate={returnDate} disabled={Tab === 1 ? 'disabled' : null} className={Tab === 1 ? 'disabled-flight' : null} />
                                    </div>
                                </div>
                            </div>
                            <div className='flight-input-from-to my-2'>
                                <HotelBookingCustomeModal />
                            </div>
                            <div className='ticket-savebill my-4'>
                                <p className='ticket-gray-text save-bill-title pb-2'>Special Fares (optional)</p>
                                <div className='buttonBtn'>
                                    {SaveBillOption.map((item, i) =>
                                        <button key={`savebillbutton${i}`}
                                            onClick={() => setsaveBill(item)}
                                            className={saveBill === item ? 'active-btn' : 'btn-sucess'}
                                        >{item}</button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <FormControlLabel control={<Checkbox onChange={(e) => setisNonStop(e.target.checked)} />} label="Show non stop flights only" />
                            </div>
                            <TicketButton lable={'Search Flights'} isActive={true} onClick={bookingHandlerFun} isCircular={true} />
                        </div>
                    </div>
                </div>
            </div>