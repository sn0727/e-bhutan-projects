export const InputFeild = (props) => {

    const {
        InputFeildValue = '',
        PlaceHolderTitle = '',
        setInputFeildValue,
        type = '',
        disc = ''
    } = props

    return (
        <>
            <div className='enter-mobilenum select-plan mt-2 mb-2'>
                <div className='enter-mobilenum'>
                    <div className='set-p-relative'>
                        <input
                            type={type ? type : ''}
                            placeholder={PlaceHolderTitle ? PlaceHolderTitle : ''}
                            value={InputFeildValue ? InputFeildValue : ''}
                            onChange={(e) => setInputFeildValue(e.target.value)}
                            className='enter-mobile-num bg-white border-cs InputTextColor'
                        />
                        <span className='mt-1'>{disc ? disc : ''}</span>
                    </div>
                </div>
            </div>
        </>
    )

}