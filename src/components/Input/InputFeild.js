export const InputFeild = (props) => {

    const {
        InputFeildValue = '',
        PlaceHolderTitle = '',
        setInputFeildValue,
        type = '',
        disc = '',
        uppercase = ''
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
                            style={{ textTransform: uppercase === 'uppercase' ? 'uppercase' : '' }}
                        />
                        <span className='mt-1'>{disc ? disc : ''}</span>
                    </div>
                </div>
            </div>
        </>
    )

}


// this component use only in the Financial Services.
export const InputCustome = (props) => {
    const {
        placeholderTitle,
        onChange,
        value,
        name,
        required,
        type
    } = props;

    return (
        <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {placeholderTitle}
            </label>
            <input
                type={type ? type : ''}
                onChange={onChange}
                placeholder={placeholderTitle ? placeholderTitle : ''}
                value={value ? value : ''}
                name={name ? name : ''}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={required ? required : ''}
            />
        </>
    );
};

